import { Router } from 'express';
import {
  createTurnstile,
  getTurnstiles,
  getTurnstileById,
  updateTurnstile,
  deleteTurnstile,
  getTurnstileLogs,
  getTurnstileStats,
} from '../controllers/turnstile.controller';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

// @route   POST /api/turnstiles
router.post('/', authenticate, authorize('ADMIN'), createTurnstile);

// @route   GET /api/turnstiles
router.get('/', authenticate, authorize('ADMIN'), getTurnstiles);

// @route   GET /api/turnstiles/:id
router.get('/:id', authenticate, authorize('ADMIN'), getTurnstileById);

// @route   PUT /api/turnstiles/:id
router.put('/:id', authenticate, authorize('ADMIN'), updateTurnstile);

// @route   DELETE /api/turnstiles/:id
router.delete('/:id', authenticate, authorize('ADMIN'), deleteTurnstile);

// @route   GET /api/turnstiles/:id/logs
router.get('/:id/logs', authenticate, authorize('ADMIN'), getTurnstileLogs);

// @route   GET /api/turnstiles/:id/stats
router.get('/:id/stats', authenticate, authorize('ADMIN'), getTurnstileStats);

export default router;
