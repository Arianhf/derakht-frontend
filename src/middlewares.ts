import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ENDPOINTS } from '@/config'

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('access_token')?.value
    const refreshToken = request.cookies.get('refresh_token')?.value

    // If there's no access token, redirect to login
    if (!accessToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Attempt to use the access token
    const res = await fetch(`${ENDPOINTS.API_BASE}/user`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

    // If the access token is valid, continue
    if (res.ok) {
        return NextResponse.next()
    }

    // If the access token is invalid but we have a refresh token, try to refresh
    if (refreshToken) {
        const refreshRes = await fetch(`${ENDPOINTS.API_BASE}/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: refreshToken })
        })

        if (refreshRes.ok) {
            const { access } = await refreshRes.json()
            const response = NextResponse.next()
            response.cookies.set('access_token', access, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: 15 * 60, // 15 minutes
                path: '/'
            })
            return response
        }
    }

    // If we couldn't refresh the token, redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
    matcher: ['/dashboard/:path*', '/story-making/:path*'],
}