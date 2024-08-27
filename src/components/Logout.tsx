// src/components/Logout.tsx

'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function Logout() {
    const router = useRouter()
    const { logout } = useAuth()

    const handleLogout = async () => {
        try {
            await logout()
            router.push('/login')
        } catch (error) {
            console.error('Logout failed', error)
        }
    }

    return (
        <button
            onClick={handleLogout}
            className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors"
        >
            Logout
        </button>
    )
}