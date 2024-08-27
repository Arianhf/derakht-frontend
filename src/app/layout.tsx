// src/app/layout.tsx

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/contexts/AuthContext'
import ClientHeader from "@/components/ClientHeader";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Derakht - Inspiring Young Storytellers',
  description: 'An online platform for children to engage in creative writing and drawing activities.',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <AuthProvider>
            <ClientHeader />
            {children}
            <Footer />
        </AuthProvider>
        </body>
        </html>
    )
}
