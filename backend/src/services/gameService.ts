import { randomInt } from 'crypto'

const symbols = ['🍒', '7️⃣', '🔔', '🍋', '🍉', '⭐', '💎'] // Symbols
const payouts = [2, 10, 5, 3, 4, 15, 20] // Payout multiplier for each symbol
const mapNumberToSymbol = (num: number) => symbols[num % symbols.length]
export const spinReels = (bet: number, balance: number) => {
    const randomBetween1And128 = () => randomInt(1, 129) // The second parameter is exclusive
    const generateReels = (rows: number, reels: number) => {
        const slotReels: number[][] = []

        for (let i = 0; i < reels; i++) {
            const reel = Array.from({ length: rows }, () =>
                randomBetween1And128()
            )
            slotReels.push(reel)
        }

        return slotReels
    }

    const checkWin = (
        slotSymbols: string[][]
    ): { isWin: boolean; winningSymbol: string | null } => {
        const rows = slotSymbols.length
        const cols = slotSymbols[0].length

        // Check horizontal wins
        for (let row = 0; row < rows; row++) {
            if (
                slotSymbols[row].every(
                    (symbol) => symbol === slotSymbols[row][0]
                )
            ) {
                return { isWin: true, winningSymbol: slotSymbols[row][0] }
            }
        }

        // Check vertical wins
        for (let col = 0; col < cols; col++) {
            const columnSymbols = slotSymbols.map((row) => row[col])
            if (columnSymbols.every((symbol) => symbol === columnSymbols[0])) {
                return { isWin: true, winningSymbol: columnSymbols[0] }
            }
        }

        // Check diagonal wins (top-left to bottom-right)
        const diagonal1 = Array.from(
            { length: Math.min(rows, cols) },
            (_, idx) => slotSymbols[idx][idx]
        )
        if (diagonal1.every((symbol) => symbol === diagonal1[0])) {
            return { isWin: true, winningSymbol: diagonal1[0] }
        }

        // Check diagonal wins (top-right to bottom-left)
        const diagonal2 = Array.from(
            { length: Math.min(rows, cols) },
            (_, idx) => slotSymbols[idx][cols - idx - 1]
        )
        if (diagonal2.every((symbol) => symbol === diagonal2[0])) {
            return { isWin: true, winningSymbol: diagonal2[0] }
        }

        // No win
        return { isWin: false, winningSymbol: null }
    }

    const rowsNumber = 5 // Number of rows per reel
    const reelsNumber = 3 // Number of reels
    const slotReels = generateReels(rowsNumber, reelsNumber)
    const slotSymbols = slotReels.map((reel) => reel.map(mapNumberToSymbol))
    const winCheck = checkWin(slotSymbols)

    const firstRowSymbols = slotSymbols.map((reel) => reel[0])
    const isWin = firstRowSymbols.every(
        (symbol) => symbol === firstRowSymbols[0]
    )
    const payoutMultiplier = isWin
        ? payouts[symbols.indexOf(firstRowSymbols[0])]
        : 0
    const payout = payoutMultiplier * 10
    // Update balance
    const newBalance = balance - bet + payout
    return {
        reels: slotSymbols,
        isWin: winCheck.isWin,
        payout,
        newBalance,
    }
}
