// src/components/StoryForm.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { apiRequest } from '@/lib/api'
import { ENDPOINTS } from '@/config'

interface StoryData {
    id?: number;
    title: string;
    content: string;
    is_draft: boolean;
}

interface StoryFormProps {
    initialStory?: StoryData;
    isNew: boolean;
}

export default function StoryForm({ initialStory, isNew }: StoryFormProps) {
    const [story, setStory] = useState<StoryData>(initialStory || { title: '', content: '', is_draft: true })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const saveStory = async (isDraft: boolean) => {
        setLoading(true)
        setError(null)
        const storyData = { ...story, is_draft: isDraft }

        try {
            if (isNew) {
                const savedStory = await apiRequest(ENDPOINTS.STORIES, 'POST', storyData)
                router.push(`/story-making/${savedStory.id}`)
            } else {
                await apiRequest(`${ENDPOINTS.STORIES}${story.id}/`, 'PUT', storyData)
            }
            if (!isDraft) {
                router.push('/dashboard')
            }
        } catch (err) {
            setError('Failed to save story')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        saveStory(false)  // Publish the story
    }

    const handleSaveDraft = () => {
        saveStory(true)  // Save as draft
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={story.title}
                    onChange={(e) => setStory({ ...story, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                />
            </div>
            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Content
                </label>
                <textarea
                    id="content"
                    value={story.content}
                    onChange={(e) => setStory({ ...story, content: e.target.value })}
                    rows={10}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                ></textarea>
            </div>
            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Save Draft
                </button>
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    {story.is_draft ? 'Publish Story' : 'Update Story'}
                </button>
            </div>
        </form>
    )
}