import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

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

export const useSocketWithRxJS = (userId: string) => {
    const [gameState, setGameState] = useState<GameState | null>(null)
    const [spinResult, setSpinResult] = useState<SpinResult>()
    const [isConnected, setIsConnected] = useState(false)

    const destroy$ = new Subject<void>()
    const socket = io('http://localhost:8080', {
        query: { userId },
    })
    useEffect(() => {
        // Connection and event streams
        const connection$ = new Subject<void>()
        const gameJoined$ = new Subject<GameState>()
        const spinResult$ = new Subject<SpinResult>()

        socket.on('connect', () => {
            setIsConnected(true)
            connection$.next()
        })

        socket.on('disconnect', () => {
            setIsConnected(false)
            destroy$.next()
        })

        socket.on('game-joined', (response) => {
            if (response.success) {
                gameJoined$.next(response.gameState)
            }
        })

        socket.on('spin-result', (result) => {
            spinResult$.next(result)
        })

        // Handle game events
        gameJoined$.pipe(takeUntil(destroy$)).subscribe(setGameState)
        spinResult$.pipe(takeUntil(destroy$)).subscribe(setSpinResult)

        // Cleanup
        return () => {
            destroy$.next()
            destroy$.complete()
            socket.disconnect()
        }
    }, [userId])

    return {
        gameState,
        spinResult,
        isConnected,
        spin: (betAmount: number) => {
            if (isConnected) {
                socket.emit('spin', betAmount)
            }
        },
    }
}
