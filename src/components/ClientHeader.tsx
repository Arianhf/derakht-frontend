// src/components/ClientHeader.tsx

'use client'

import { useAuth } from '@/contexts/AuthContext'
import Header from './Header'

export default function ClientHeader() {
    const { isAuthenticated, logout } = useAuth()

    return <Header isAuthenticated={isAuthenticated} logout={logout} />
}