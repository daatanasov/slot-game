import { useState, useEffect } from 'react'
import io, { Socket } from 'socket.io-client'
import { Subject, BehaviorSubject, from, of } from 'rxjs'
import { switchMap, catchError, takeUntil, tap } from 'rxjs/operators'

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

export const useRxSocket = (userId: string) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const gameState$ = new BehaviorSubject<GameState | null>(null)
    const spinResult$ = new Subject<SpinResult>()
    const destroy$ = new Subject<void>()

    // Error handling stream
    const error$ = new Subject<string>()

    // Create a subject for spin actions
    const spinSubject = new Subject<{
        betAmount: number
        balance: number
        spinCount: number
    }>()

    useEffect(() => {
        const newSocket = io('http://localhost:8080', {
            query: { userId },
        })

        // Similar to previous implementation...

        // Spin action handling
        const spinSubscription = spinSubject
            .pipe(takeUntil(destroy$))
            .subscribe(({ betAmount, balance, spinCount }) => {
                newSocket.emit('spin', betAmount, balance, spinCount)
            })

        setSocket(newSocket)

        // Cleanup
        return () => {
            spinSubscription.unsubscribe()
            destroy$.next()
            destroy$.complete()
            newSocket.disconnect()
        }
    }, [userId])

    // Public spin method
    const spin = (betAmount: number, balance: number, spinCount: number) => {
        spinSubject.next({ betAmount, balance, spinCount })
    }

    return {
        gameState$,
        spinResult$,
        error$,
        spin,
        socket,
    }
}
