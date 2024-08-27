// src/components/Header.tsx

import Link from 'next/link'

interface HeaderProps {
    isAuthenticated: boolean;
    logout: () => Promise<void>;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, logout }) => {
    return (
        <header className="bg-green-600 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                    Derakht
                </Link>
                <ul className="flex space-x-4 items-center">
                    {isAuthenticated ? (
                        <>
                            <li><Link href="/story-making/new">New Story</Link></li>
                            <li><Link href="/dashboard">Dashboard</Link></li>
                            <li>
                                <button
                                    onClick={logout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link href="/login">Login</Link></li>
                            <li><Link href="/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header