// src/lib/csrf.ts

import { ENDPOINTS } from '@/config'

export async function getCSRFToken() {
    const response = await fetch(ENDPOINTS.GET_CSRF_TOKEN, {
        credentials: 'include',
    });
    const data = await response.json();
    return data.csrfToken;
}