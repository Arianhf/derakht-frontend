import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { apiRequest } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'
import { ENDPOINTS } from '@/config'

interface ApiRequestState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export function useApiRequest<T>() {
    const [state, setState] = useState<ApiRequestState<T>>({
        data: null,
        loading: false,
        error: null,
    })
    const { logout, checkAuthStatus } = useAuth()
    const router = useRouter()

    const execute = useCallback(async (endpoint: string, method: string = 'GET', body?: any) => {
        setState(prevState => ({ ...prevState, loading: true, error: null }))
        try {
            const data = await apiRequest(endpoint, method, body)
            setState({ data, loading: false, error: null })
            return data
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'Unauthorized' || error.message === 'No access token available') {
                    try {
                        // Try to refresh the token using the middleware
                        await checkAuthStatus()
                        // If successful, retry the original request
                        const data = await apiRequest(endpoint, method, body)
                        setState({ data, loading: false, error: null })
                        return data
                    } catch (refreshError) {
                        // If refresh fails, log out the user
                        await logout()
                        router.push('/login')
                        setState({ data: null, loading: false, error: 'Session expired. Please log in again.' })
                    }
                } else {
                    setState({
                        data: null,
                        loading: false,
                        error: error.message
                    })
                }
            } else {
                setState({
                    data: null,
                    loading: false,
                    error: 'An unknown error occurred'
                })
            }
            throw error
        }
    }, [logout, router, checkAuthStatus])

    return { ...state, execute }
}