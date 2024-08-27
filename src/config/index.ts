// src/config/index.ts

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export const ENDPOINTS = {
    API_BASE: API_URL,
    LOGIN: '/api/login/',
    LOGOUT: '/api/logout/',
    REGISTER: '/api/register/',
    USER: '/api/user/',
    STORIES: '/api/stories/',
    GET_CSRF_TOKEN: '/api/get-csrf-token/',
};

