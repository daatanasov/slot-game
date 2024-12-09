import { RequestHandler } from 'express'
import { spinReels } from '../services/gameService'

export const spinGame: RequestHandler = (req, res, next) => {
    try {
        const { bet, balance } = req.body

        // Validate bet
        if (typeof bet !== 'number' || typeof balance !== 'number') {
            res.status(400).json({ error: 'Invalid input data' })
            return // Ensure no further code runs
        }

        if (bet > balance) {
            res.status(400).json({ error: 'Insufficient balance' })
            return // Ensure no further code runs
        }

        const result = spinReels(bet, balance)

        res.json(result) // Send the result as a response
    } catch (error) {
        next(error) // Pass errors to the Express error handler
    }
}
