// src/lib/secureCookies.ts

import { serialize, parse } from 'cookie'
import { NextApiResponse } from 'next'

export const ACCESS_TOKEN_NAME = 'access_token'
export const REFRESH_TOKEN_NAME = 'refresh_token'

type CookieOptions = {
    maxAge: number
    httpOnly: boolean
    secure: boolean
    sameSite: 'strict' | 'lax' | 'none'
    path: string
}

const defaultOptions: CookieOptions = {
    maxAge: 15 * 60, // 15 minutes for access token
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    path: '/'
}

export function setSecureCookie(res: NextApiResponse, name: string, value: string, options: Partial<CookieOptions> = {}) {
    const cookieOptions = { ...defaultOptions, ...options }
    res.setHeader('Set-Cookie', serialize(name, value, cookieOptions))
}

export function removeSecureCookie(res: NextApiResponse, name: string) {
    res.setHeader('Set-Cookie', serialize(name, '', { maxAge: -1, path: '/' }))
}

export function getSecureCookie(req: { headers: { cookie?: string } }, name: string): string | undefined {
    const cookies = parse(req.headers.cookie || '')
    return cookies[name]
}

export function setTokens(res: NextApiResponse, accessToken: string, refreshToken: string) {
    setSecureCookie(res, ACCESS_TOKEN_NAME, accessToken)
    setSecureCookie(res, REFRESH_TOKEN_NAME, refreshToken, { maxAge: 30 * 24 * 60 * 60 }) // 30 days for refresh token
}

export function clearTokens(res: NextApiResponse) {
    removeSecureCookie(res, ACCESS_TOKEN_NAME)
    removeSecureCookie(res, REFRESH_TOKEN_NAME)
}