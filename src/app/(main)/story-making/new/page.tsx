// src/app/(main)/story-making/new/page.tsx

import StoryForm from '@/components/StoryForm'

export default function NewStoryPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Create New Story</h1>
            <StoryForm isNew={true} />
        </div>
    )
}