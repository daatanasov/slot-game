'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

// Authentication interface
interface User {
    id: string
    email: string
}

interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<boolean>
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => false,
    logout: () => {},
    isAuthenticated: false,
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()
    // Check authentication on initial load
    useEffect(() => {
        const token = Cookies.get('token')
        const storedUser = localStorage.getItem('user')
        if (token && storedUser) {
            // Here you would typically validate the token with your backend

            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = async (email: string, password: string) => {
        try {
            // Replace with actual backend authentication
            // const response = await fetch('/api/login', {
            //     method: 'POST',
            //     body: JSON.stringify({ email, password }),
            //     headers: { 'Content-Type': 'application/json' },
            // })

            // if (response.ok) {
            // const data = await response.json()
            const userData = {
                id: 'user123',
                email: 'test@test.bg',
            }

            Cookies.set('token', 'some-token', {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            })

            // Store token and user data
            localStorage.setItem('token', 'some-token')
            localStorage.setItem('user', JSON.stringify(userData))

            setUser(userData)
            router.push('/dashboard')
            return true
        } catch (error) {
            console.error('Login failed', error)
            return false
        }
    }

    const logout = () => {
        // localStorage.removeItem('token')
        Cookies.remove('token')
        localStorage.removeItem('user')
        setUser(null)
        router.push('/')
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook for authentication
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
