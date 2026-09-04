import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);

    if (typeof payload !== 'object' || payload === null) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (typeof payload.sub !== 'string') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.userId = payload.sub;

    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
