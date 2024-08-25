// src/app/(main)/story-making/[id]/page.tsx

'use client'

import { useState, useEffect } from 'react'
import StoryForm from '@/components/StoryForm'
import { apiRequest } from '@/lib/api'
import { ENDPOINTS } from '@/config'

interface StoryData {
    id: number;
    title: string;
    content: string;
    is_draft: boolean;
}

export default function StoryEditorPage({ params }: { params: { id: string } }) {
    const [story, setStory] = useState<StoryData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const data = await apiRequest(`${ENDPOINTS.STORIES}${params.id}/`)
                setStory(data)
            } catch (err) {
                setError('Failed to load story')
            } finally {
                setLoading(false)
            }
        }

        fetchStory()
    }, [params.id])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!story) return <div>Story not found</div>

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Edit Story</h1>
            <StoryForm initialStory={story} isNew={false} />
        </div>
    )
}