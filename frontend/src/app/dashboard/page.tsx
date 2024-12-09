'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Coins, Calendar, Trophy, Gift, PieChart } from 'lucide-react' // Correct imports
import Link from 'next/link'

const Dashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
            <div className="container mx-auto py-8 px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#e94560]">
                        Casidincho Dashboard
                    </h1>
                    <p className="text-lg mt-2 text-gray-300">
                        Welcome to the ultimate casino experience! Spin slots,
                        win big, and stay tuned for more exciting games.
                    </p>
                </div>
                <Card className="bg-[#0f3460] border-2 border-[#e94560] shadow-lg mb-8">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <Coins className="w-12 h-12 text-[#ffd700]" />
                            <div>
                                <h2 className="text-2xl font-semibold text-white">
                                    Slot Game
                                </h2>
                                <p className="text-gray-300">
                                    Spin the reels and win exciting prizes! The
                                    slot game is live now with dynamic payouts
                                    and thrilling gameplay.
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="destructive"
                            className="bg-[#e94560] hover:bg-[#ff6b81] text-white mt-4"
                        >
                            <Link href="/slot-game">Play Now</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-[#0f3460] border-2 border-[#1a1a2e] shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <Calendar className="w-12 h-12 text-[#4caf50]" />
                            <div>
                                <h2 className="text-2xl font-semibold text-white">
                                    Coming Soon
                                </h2>
                                <p className="text-gray-300">
                                    Stay tuned for the launch of more casino
                                    games, including blackjack, poker, and
                                    roulette. Bigger thrills await!
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            className="mt-4 text-white border border-[#4caf50] hover:bg-[#4caf50] hover:text-black"
                        >
                            Learn More
                        </Button>
                    </CardContent>
                </Card>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-[#0f3460] border-2 border-[#1a1a2e] shadow-lg">
                        <CardContent className="p-6 text-center">
                            <Trophy className="w-10 h-10 mx-auto text-[#ffd700]" />
                            <h3 className="mt-4 text-lg font-semibold">
                                Top Players
                            </h3>
                            <p className="text-gray-300 mt-2">
                                Check out the leaderboard and see who’s leading
                                the pack.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#0f3460] border-2 border-[#1a1a2e] shadow-lg">
                        <CardContent className="p-6 text-center">
                            <Gift className="w-10 h-10 mx-auto text-[#e94560]" />
                            <h3 className="mt-4 text-lg font-semibold">
                                Daily Rewards
                            </h3>
                            <p className="text-gray-300 mt-2">
                                Log in daily to claim free spins and exclusive
                                bonuses.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#0f3460] border-2 border-[#1a1a2e] shadow-lg">
                        <CardContent className="p-6 text-center">
                            <PieChart className="w-10 h-10 mx-auto text-[#4caf50]" />
                            <h3 className="mt-4 text-lg font-semibold">
                                Game Insights
                            </h3>
                            <p className="text-gray-300 mt-2">
                                Analyze your performance and improve your
                                strategy.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
