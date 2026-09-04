import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app-error';

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  return res.status(500).json({
    error: 'Internal server error',
  });
};
