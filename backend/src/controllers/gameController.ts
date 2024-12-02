import { Request, Response } from 'express';
import { spinReels } from '../services/gameService';

export const spinGame = (req: Request, res: Response): void => {
  const result = spinReels();
  res.json(result);
};
