import express from 'express';
import { getCurrentUser } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Protected routes
router.get('/me', authMiddleware, getCurrentUser);

export default router;
