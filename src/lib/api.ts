// src/lib/api.ts

import { ENDPOINTS } from '@/config';

let authToken: string | null = null;

export function setAuthToken(token: string) {
    authToken = token;
    localStorage.setItem('authToken', token);
}

export function getAuthToken(): string | null {
    if (!authToken) {
        authToken = localStorage.getItem('authToken');
    }
    return authToken;
}

export function clearAuthToken() {
    authToken = null;
    localStorage.removeItem('authToken');
}

export async function apiRequest(endpoint: string, method: string = 'GET', data: any = null) {
    const url = `${ENDPOINTS.API_BASE}${endpoint}`;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    const token = getAuthToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;  // or 'Bearer ${token}' depending on your backend expectation
    }

    const options: RequestInit = {
        method,
        headers,
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
        if (response.status === 401) {
            clearAuthToken();
            window.location.href = '/login';
            throw new Error('Unauthorized. Redirecting to login.');
        }
        throw new Error('API request failed');
    }

    return response.json();
}