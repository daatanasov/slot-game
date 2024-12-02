import { Router } from 'express';
import { spinGame } from '../controllers/gameController';

const router = Router();

// Define routes
router.get('/spin', spinGame);

export default router;
