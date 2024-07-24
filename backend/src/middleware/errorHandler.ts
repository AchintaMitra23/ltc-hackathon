import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error caught by middleware:', err);
  res.status(500).json({ error: 'Internal server error' });
};
