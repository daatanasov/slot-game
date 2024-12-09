export class BlackJackGameService {
    getInitialGameState() {
        return {
            balance: 1000, // Example initial balance
            minBet: 1,
            maxBet: 100,
        }
    }

    processSpin(betAmount: number, balance: number, spinCount: number) {
        let grid
        if (spinCount % 3 === 0) {
            grid = this.generateWinningGrid()
        } else {
            grid = this.generateGrid()
        }
        const winnings = this.calculateWinnings(grid, betAmount)
        const calculatedBalance = this.caluclateBalance(
            betAmount,
            winnings.totalWinnings,
            balance
        )
        return {
            success: true,
            grid,
            winnings: winnings.totalWinnings,
            winningRows: winnings.winningRows,
            balance: calculatedBalance,
        }
    }

    private caluclateBalance(
        betAmount: number,
        totalWinnings: number,
        balance: number
    ): number {
        return balance - betAmount + totalWinnings
    }

    private generateGrid(): string[][] {
        const symbols = ['j', 'a', 'd', 'k', 'w', 'q']
        return Array.from({ length: 3 }, () =>
            Array.from(
                { length: 5 },
                () => symbols[Math.floor(Math.random() * symbols.length)]
            )
        )
    }
    private generateWinningGrid(): string[][] {
        return [
            ['d', 'd', 'd', 'd', 'd'],
            ['k', 'w', 'k', 'q', 'd'],
            ['a', 'a', 'a', 'a', 'a'],
        ]
    }

    private calculateWinnings(
        grid: string[][],
        betAmount: number
    ): { totalWinnings: number; winningRows: number[] } {
        let totalWinnings = 0
        const winningRows: number[] = [] // To store indices of winning rows

        const winningPatterns = [
            [0, 1, 2, 3, 4], // Row 1
            [5, 6, 7, 8, 9], // Row 2
            [10, 11, 12, 13, 14], // Row 3
        ]

        winningPatterns.forEach((pattern, rowIndex) => {
            const firstSymbol = grid[Math.floor(pattern[0] / 5)][pattern[0] % 5]
            const isWinningLine = pattern.every(
                (idx) => grid[Math.floor(idx / 5)][idx % 5] === firstSymbol
            )

            if (isWinningLine) {
                totalWinnings += betAmount * 2
                winningRows.push(rowIndex) // Store row number (1-based index)
            }
        })

        return { totalWinnings, winningRows }
    }
}
