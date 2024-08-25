// src/components/Logout.tsx

'use client'

import { useRouter } from 'next/navigation'
import { apiRequest, clearAuthToken } from '@/lib/api'
import { ENDPOINTS } from '@/config'

export default function Logout() {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await apiRequest(ENDPOINTS.LOGOUT, 'POST')
        } catch (error) {
            console.error('Logout failed', error)
        } finally {
            clearAuthToken()
            router.push('/login')
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