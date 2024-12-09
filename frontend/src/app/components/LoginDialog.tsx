'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'

const LoginDialog = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth()
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const success = await login(email, password)
        if (success) {
            router.push('/dashboard')
        } else {
            // Handle login failure
            alert('Login failed')
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">Login</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Login to Casidincho</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={handleLogin} className="w-full">
                        Login
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LoginDialog
