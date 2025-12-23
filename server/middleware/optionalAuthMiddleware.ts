import { NextFunction, Request, Response } from 'express';
import { verifyJwtService, getTokenFromCookies } from '../services/authMiddlewareService';

// Optional auth middleware - sets userId if token is valid, but doesn't require it
export const optionalAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getTokenFromCookies(req);
    if (token && process.env.JWT_SECRET) {
      const decoded = verifyJwtService(token, process.env.JWT_SECRET);
      (req as any).userId = decoded.userId;
    }
    next();
  } catch (error) {
    // Invalid token, but continue without authentication
    next();
  }
};
