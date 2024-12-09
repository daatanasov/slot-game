'use client'
import { useState, useEffect } from 'react'
import io, { Socket } from 'socket.io-client'

interface GameState {
    balance: number
    minBet: number
    maxBet: number
}

interface SpinResult {
    success: boolean
    reels?: string[]
    isWin?: boolean
    winnings: number
    message?: string
    grid: string[][]
    winningRows: number[]
    balance: number
}

export const useSocket = (userId: string) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [gameState, setGameState] = useState<GameState | null>(null)
    const [spinResult, setSpinResult] = useState<SpinResult>()
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        // Create socket connection
        const newSocket = io('http://localhost:8080', {
            query: { userId },
        })

        // Connection event handlers
        newSocket.on('connect', () => {
            setIsConnected(true)
            console.log('Connected to WebSocket server')

            // Join the slot game
            newSocket.emit('join-slot-game', { userId })
        })

        newSocket.on('disconnect', () => {
            setIsConnected(false)
            console.log('Disconnected from WebSocket server')
        })

        // Game-specific event listeners
        newSocket.on('game-joined', (response) => {
            if (response.success) {
                setGameState(response.gameState)
            } else {
                console.error('Failed to join game:', response.message)
            }
        })

        newSocket.on('spin-result', (result) => {
            setSpinResult(result)
        })

        // Set the socket state
        setSocket(newSocket)

        // Cleanup on component unmount
        return () => {
            newSocket.disconnect()
        }
    }, [userId])

    const spin = (betAmount: number, balance: number, spinCount: number) => {
        if (socket && isConnected) {
            socket.emit('spin', betAmount, balance, spinCount)
        }
    }

    return {
        socket,
        gameState,
        spinResult,
        isConnected,
        spin,
    }
}
