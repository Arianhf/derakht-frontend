// src/lib/csrf.ts

import { ENDPOINTS } from '@/config'

export async function getCSRFToken() {
    console.log(ENDPOINTS.GET_CSRF_TOKEN)
    console.log(ENDPOINTS.API_BASE)
    console.log("in get csrf token")
    const response = await fetch(ENDPOINTS.API_BASE+ENDPOINTS.GET_CSRF_TOKEN, {
        credentials: 'include',
    });
    const data = await response.json();
    return data.csrfToken;
}