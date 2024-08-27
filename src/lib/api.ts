// src/lib/api.ts

import { ENDPOINTS } from '@/config'
import { getCSRFToken } from './csrf'
import { ACCESS_TOKEN_NAME } from './secureCookies'

function getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
        return document.cookie.split('; ').find(row => row.startsWith(ACCESS_TOKEN_NAME))?.split('=')[1] || null;
    }
    return null;
}

export async function apiRequest(endpoint: string, method: string = 'GET', data: any = null) {
    const url = `${ENDPOINTS.API_BASE}${endpoint}`
    console.log(url)
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    }

    // Add Authorization header with Bearer token
    const accessToken = getAccessToken();
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
        console.log(`Bearer ${accessToken}`)
    }

    // Add CSRF token for non-GET requests
    if (method !== 'GET') {
        console.log(method)
        const csrfToken = await getCSRFToken();
        headers['X-CSRFToken'] = csrfToken;
    }
    console.log("here")

    const options: RequestInit = {
        method,
        headers,
        credentials: 'include', // This is crucial for including cookies in the request
    }

    if (data) {
        options.body = JSON.stringify(data)
    }

    const response = await fetch(url, options)

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized')
        }
        throw new Error('API request failed')
    }

    return response.json()
}

export async function login(username: string, password: string) {
    return apiRequest(ENDPOINTS.LOGIN, 'POST', { username, password })
}

export async function logout() {
    return apiRequest(ENDPOINTS.LOGOUT, 'POST')
}