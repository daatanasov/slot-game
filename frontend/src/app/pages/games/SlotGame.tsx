'use client'
import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useSocket } from '../../custom-hooks/useSocket'
import SlotIcon from '@/app/components/SlotIcon'
import WinOverlay from '@/app/components/WinOverlay'
import ReelsRenderer from '@/app/components/ReelsRenderer'

const SlotGame = () => {
    const userId = 'user_123'
    const { gameState, spinResult, isConnected, spin } = useSocket(userId)
    const [grid, setGrid] = useState<string[][]>([
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
    ])
    const [spinning, setSpinning] = useState<boolean>(false)
    const [balance, setBalance] = useState<number>(1000)
    const [betAmount, setBetAmount] = useState<number>(10)
    const [lastWinnings, setLastWinnings] = useState<number>(0)
    const [winning, setWinning] = useState<number>(0)
    const [winningRows, setWinningRows] = useState<number[]>([])
    const [showWinOverlay, setShowWinOverlay] = useState<boolean>(false)
    const [spinCount, setSpinCount] = useState(0)

    useEffect(() => {
        if (spinResult && spinResult.grid != grid) {
            setGrid(spinResult.grid)
            setWinning(spinResult.winnings)
            setWinningRows(spinResult.winningRows)
            setBalance(spinResult.balance)
            setLastWinnings(spinResult.winnings)
            if (spinResult.winnings > 0) {
                setShowWinOverlay(true)
            }
        }
    }, [spinResult])

    const handleSpin = () => {
        setSpinCount((prevCount) => prevCount + 1) // Increment the counter
        if (isConnected && gameState) {
            // Validate bet amount
            if (betAmount < gameState.minBet || betAmount > gameState.maxBet) {
                alert(
                    `Bet must be between ${gameState.minBet} and ${gameState.maxBet}`
                )
                return
            }
            setSpinning(true)
            setTimeout(() => {
                setSpinning(false)
                spin(betAmount, balance, spinCount)
            }, 2000)
        }
    }

    return (
        <>
            <WinOverlay
                isVisible={showWinOverlay}
                winAmount={lastWinnings}
                onClose={() => setShowWinOverlay(false)}
            />

            <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center p-4">
                <Card
                    className="w-full max-w-4xl bg-[#0f3460] border-4 border-[#e94560] shadow-2xl background-wrapper bg-top bg-cover bg-no-repeat rounded-lg"
                    style={{
                        backgroundImage: "url('/images/background.jpg')",
                    }}
                >
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-full max-w-4xl">
                            <img
                                src="/images/header.jpg"
                                alt="Horizontal Banner"
                                className="w-full h-auto object-cover rounded-t-lg top-picture"
                            />
                        </div>
                    </div>
                    <CardContent className="p-4 sm:p-6">
                        <div className="grid grid-cols-5 gap-1 sm:gap-1 mb-4 sm:mb-6">
                            <ReelsRenderer grid={grid} />
                            {/* {grid.map((row, rowIndex) =>
                                row.map((cell, colIndex) => (
                                    <div
                                        key={`${rowIndex}-${colIndex}`}
                                        className="aspect-square flex items-center justify-center"
                                    >
                                        <SlotIcon
                                            key={`${rowIndex}-${colIndex}`}
                                            icon={cell}
                                            winningRows={winningRows}
                                            rowIndex={rowIndex}
                                        />
                                    </div>
                                ))
                            )} */}
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-center w-full sm:w-auto">
                                <Button
                                    variant="destructive"
                                    className="bg-[#e94560] hover:bg-[#ff6b81] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg w-full sm:w-auto"
                                    onClick={handleSpin}
                                    disabled={spinning}
                                >
                                    SPIN
                                </Button>
                                <div className="flex items-center space-x-2">
                                    <span className="text-white">Bet:</span>
                                    <input
                                        type="number"
                                        value={betAmount === 0 ? '' : betAmount}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            if (value === '') {
                                                setBetAmount(0)
                                            } else {
                                                setBetAmount(Number(value))
                                            }
                                        }}
                                        min="1"
                                        max={balance}
                                        className="w-20 p-2 rounded bg-[#1a1a2e] text-white"
                                    />
                                </div>
                            </div>
                            <div className="text-white text-sm sm:text-xl flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                                <div className="flex space-x-2">
                                    <span>Balance:</span>
                                    <span className="font-bold text-[#e94560]">
                                        ${balance.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex space-x-2">
                                    <span>Last Winnings:</span>
                                    <span className="font-bold text-green-500">
                                        ${lastWinnings.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default SlotGame
