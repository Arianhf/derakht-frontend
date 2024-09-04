// src/app/(main)/dashboard/page.tsx

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useApiRequest } from '@/hooks/useApiRequest'
import { ENDPOINTS } from '@/config'
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

interface Story {
    id: number;
    title: string;
    created_at: string;
}

interface UserData {
    username: string;
}

interface StoriesData {
    results: Story[];
    count: number;
    next: string | null;
    previous: string | null;
}

const ITEMS_PER_PAGE = 10

export default function DashboardPage() {
    const { data: userData, loading: userLoading, error: userError, execute: fetchUser } = useApiRequest<UserData>()
    const { data: storiesData, loading: storiesLoading, error: storiesError, execute: fetchStories } = useApiRequest<StoriesData>()
    const [currentPage, setCurrentPage] = useState(1)
    const url = `${ENDPOINTS.STORIES}?${new URLSearchParams({
        page: currentPage.toString(),
        page_size: ITEMS_PER_PAGE.toString(),
    })}`

    useEffect(() => {
        fetchUser(ENDPOINTS.USER)
        fetchStories(url)
    }, [currentPage])

    console.log(userError, storiesError)
    console.log(userData, storiesData)
    if (userLoading || storiesLoading) return <div>Loading...</div>
    if (userError || storiesError) return <div>Error: {userError || storiesError}</div>
    if (!userData || !storiesData) return <div>No data available</div>

    const totalPages = Math.ceil(storiesData.count / ITEMS_PER_PAGE)

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Welcome, {userData.username}!</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Your Stories</h2>
                {storiesData.results.length > 0 ? (
                    <>
                        <ul className="space-y-2 mb-4">
                            {storiesData.results.map((story) => (
                                <li key={story.id} className="bg-white shadow rounded-lg p-4">
                                    <h3 className="font-semibold">{story.title}</h3>
                                    <p className="text-sm text-gray-500">Created on: {new Date(story.created_at).toLocaleDateString()}</p>
                                    <Link href={`/story-making/${story.id}`} className="text-green-600 hover:underline">
                                        Edit Story
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={!storiesData.previous}
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
                            >
                                Previous
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                disabled={!storiesData.next}
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <p>You haven&apos;t created any stories yet.</p>
                )}
            </section>

            <section>
                <Link
                    href="/story-making/new"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                    Create New Story
                </Link>
            </section>
        </div>
    )
}