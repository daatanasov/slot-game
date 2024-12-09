import { Router } from 'express'
import { spinGame } from '../controllers/gameController'

const router = Router()

// Use the spinGame handler
router.post('/spin', spinGame)

export default router
