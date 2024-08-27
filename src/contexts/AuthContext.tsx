// src/contexts/AuthContext.tsx

'use client'

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { apiRequest, login as apiLogin, logout as apiLogout } from '@/lib/api'
import { ENDPOINTS } from '@/config'

type User = {
    username: string;
}

type AuthContextType = {
    isAuthenticated: boolean
    user: User | null
    login: (username: string, password: string) => Promise<void>
    logout: () => Promise<void>
    checkAuthStatus: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

    const checkAuthStatus = async () => {
        try {
            const userData = await apiRequest(ENDPOINTS.USER)
            setUser(userData)
            setIsAuthenticated(true)
        } catch (error) {
            setUser(null)
            setIsAuthenticated(false)
        }
    }

    useEffect(() => {
        checkAuthStatus()
    }, [])

    const login = async (username: string, password: string) => {
        try {
            console.log("username: ", username, "password", password)
            const userData = await apiLogin(username, password)
            setUser(userData)
            setIsAuthenticated(true)
            router.push('/dashboard')
        } catch (error) {
            throw new Error('Login failed')
        }
    }

    const logout = async () => {
        try {
            await apiLogout()
        } catch (error) {
            console.error('Logout failed', error)
        } finally {
            setUser(null)
            setIsAuthenticated(false)
            router.push('/login')
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, checkAuthStatus }}>
    {children}
    </AuthContext.Provider>
)
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}