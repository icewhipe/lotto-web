import { Router } from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
} from '../controllers/auth.controller';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// @route   POST /api/auth/register
router.post('/register', register);

// @route   POST /api/auth/login
router.post('/login', login);

// @route   GET /api/auth/me
router.get('/me', authenticate, getMe);

// @route   PUT /api/auth/profile
router.put('/profile', authenticate, updateProfile);

// @route   POST /api/auth/change-password
router.post('/change-password', authenticate, changePassword);

export default router;
