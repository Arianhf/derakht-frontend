// src/app/page.tsx

import Link from 'next/link'

export default function Home() {
  return (
      <div className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Derakht</h1>
          <p className="text-xl">Inspiring young storytellers to create, imagine, and grow</p>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-12">
          <FeatureCard
              title="Write Your Story"
              description="Create your own unique stories with our interactive tools"
              link="/story-making"
          />
          <FeatureCard
              title="Draw Your Tale"
              description="Bring your stories to life with colorful illustrations"
              link="/story-making"
          />
          <FeatureCard
              title="Complete the Adventure"
              description="Finish exciting story prompts and see where your imagination takes you"
              link="/story-making"
          />
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Start Your Creative Journey Today!</h2>
          <Link href="/register" className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors">
            Sign Up Now
          </Link>
        </section>
      </div>
  )
}

function FeatureCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
      <div className="border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="mb-4">{description}</p>
        <Link href={link} className="text-green-600 hover:underline">
          Get Started
        </Link>
      </div>
  )
}