// src/hooks/useApiRequest.ts

import { useState, useCallback } from 'react'
import { apiRequest } from '@/lib/api'

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

    const execute = useCallback(async (endpoint: string, method: string = 'GET', body?: any) => {
        setState(prevState => ({ ...prevState, loading: true, error: null }))
        try {
            const data = await apiRequest(endpoint, method, body)
            setState({ data, loading: false, error: null })
            return data
        } catch (error) {
            setState({ data: null, loading: false, error: error instanceof Error ? error.message : 'An unknown error occurred' })
            throw error
        }
    }, [])

    return { ...state, execute }
}