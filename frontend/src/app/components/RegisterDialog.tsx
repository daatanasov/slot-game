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

const RegisterDialog = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleRegister = () => {
        // Implement registration logic
        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }
        console.log('Registration attempted', { email, password })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">Register</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Register for Casidincho</DialogTitle>
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
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button onClick={handleRegister} className="w-full">
                        Register
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RegisterDialog
