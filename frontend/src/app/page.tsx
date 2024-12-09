'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from './context/AuthContext'
import Dashboard from './dashboard/page'

export default function Home() {
    const { user } = useAuth()
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
            {user ? (
                <>
                    <Dashboard />
                </>
            ) : (
                <>
                    <main className="container mx-auto px-4 py-16">
                        <section className="text-center">
                            <h1 className="text-5xl font-extrabold mb-6">
                                Welcome to Casidincho
                            </h1>
                            <p className="text-xl mb-12">
                                Experience the thrill of online gaming
                            </p>

                            <div className="grid md:grid-cols-3 gap-8">
                                {['Slots', 'Roulette', 'Blackjack'].map(
                                    (game) => (
                                        <Card
                                            key={game}
                                            className="bg-white/10 backdrop-blur-lg"
                                        >
                                            <CardHeader>
                                                <CardTitle>{game}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex justify-center items-center">
                                                <div className="w-64 h-48 bg-gray-700 rounded-lg flex items-center justify-center">
                                                    {game} Preview
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )
                                )}
                            </div>
                        </section>
                    </main>
                </>
            )}
        </div>
    )
}
