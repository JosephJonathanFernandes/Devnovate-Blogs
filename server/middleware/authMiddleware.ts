import { Response, NextFunction } from 'express';
import { AuthRequest, verifyJwtService, getTokenFromCookies } from '../services/authMiddlewareService';

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Get token from cookie
        const token = getTokenFromCookies(req);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        // Verify token
        const secret = process.env.JWT_SECRET!;
        const decoded = verifyJwtService(token, secret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};
