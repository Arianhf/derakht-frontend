// src/components/Header.tsx

import Link from 'next/link'
import Logout from './Logout'

const Header = () => {
    return (
        <header className="bg-green-600 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                    Derakht
                </Link>
                <ul className="flex space-x-4 items-center">
                    <li><Link href="/story-making">Story Making</Link></li>
                    <li><Link href="/dashboard">Dashboard</Link></li>
                    <li><Logout /></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header