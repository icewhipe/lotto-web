import { Router } from 'express';
import {
  createRFIDCard,
  getRFIDCards,
  getRFIDCardById,
  updateRFIDCard,
  deleteRFIDCard,
  processScan,
} from '../controllers/rfid.controller';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

// @route   POST /api/rfid/cards
router.post('/cards', authenticate, authorize('ADMIN'), createRFIDCard);

// @route   GET /api/rfid/cards
router.get('/cards', authenticate, authorize('ADMIN'), getRFIDCards);

// @route   GET /api/rfid/cards/:id
router.get('/cards/:id', authenticate, authorize('ADMIN'), getRFIDCardById);

// @route   PUT /api/rfid/cards/:id
router.put('/cards/:id', authenticate, authorize('ADMIN'), updateRFIDCard);

// @route   DELETE /api/rfid/cards/:id
router.delete('/cards/:id', authenticate, authorize('ADMIN'), deleteRFIDCard);

// @route   POST /api/rfid/scan
router.post('/scan', processScan); // System access (no auth for turnstile)

export default router;
