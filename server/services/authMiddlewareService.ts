import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
}

// Service to verify JWT and extract userId
export const verifyJwtService = (token: string, secret: string): { userId: string } => {
  return jwt.verify(token, secret) as { userId: string };
};

// Service to get token from cookies
export const getTokenFromCookies = (req: Request): string | undefined => {
  return req.cookies?.token;
};
