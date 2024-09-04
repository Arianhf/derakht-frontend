import { ENDPOINTS } from '@/config'
import { getCSRFToken } from './csrf'
import { getAccessToken } from './secureCookies'

export async function apiRequest(endpoint: string, method: string = 'GET', data: any = null) {
    const url = `${ENDPOINTS.API_BASE}${endpoint}`
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    }

    // Add Authorization header with Bearer token
    const accessToken = getAccessToken();
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
        throw new Error('No access token available')
    }

    // Add CSRF token for non-GET requests
    if (method !== 'GET') {
        const csrfToken = await getCSRFToken();
        headers['X-CSRFToken'] = csrfToken;
    }

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