'use client'
import Link from 'next/link'
import { useAuth } from './context/AuthContext'
import LoginDialog from './components/LoginDialog'
import RegisterDialog from './components/RegisterDialog'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

function Navigation() {
    const { user, logout } = useAuth()
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="relative bg-[#1a1a2e] text-white">
            <div className="flex justify-between items-center p-4 sm:p-6">
                {/* Logo */}
                <div className="text-xl sm:text-2xl font-bold">
                    <Link href="/" className="hover:text-[#e94560]">
                        Casidincho
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="sm:hidden z-50"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                {/* Desktop Menu */}
                <div className="hidden sm:flex space-x-4 items-center">
                    {user ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="hover:text-[#e94560]"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/slot-game"
                                className="hover:text-[#e94560]"
                            >
                                Slots
                            </Link>
                            <Link
                                href="/blackjack"
                                className="hover:text-[#e94560]"
                            >
                                Blackjack
                            </Link>
                            <button
                                onClick={logout}
                                className="py-2 px-4 bg-red-500 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className="space-x-4">
                            <LoginDialog />
                            <RegisterDialog />
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-[#1a1a2e] z-40 sm:hidden"
                    onClick={() => setMenuOpen(false)}
                >
                    <div className="flex flex-col items-center justify-center h-full space-y-6 text-xl">
                        {user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="hover:text-[#e94560]"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/slot-game"
                                    className="hover:text-[#e94560]"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Slots
                                </Link>
                                <Link
                                    href="/blackjack"
                                    className="hover:text-[#e94560]"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Blackjack
                                </Link>
                                <button
                                    onClick={() => {
                                        logout()
                                        setMenuOpen(false)
                                    }}
                                    className="py-2 px-4 bg-red-500 rounded hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col space-y-4 items-center">
                                <LoginDialog />
                                <RegisterDialog />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navigation
