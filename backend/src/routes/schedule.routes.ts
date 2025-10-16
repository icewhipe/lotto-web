import { Router } from 'express';
import {
  createSchedule,
  getGroupSchedule,
  getTeacherSchedule,
  updateSchedule,
  deleteSchedule,
} from '../controllers/schedule.controller';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

// @route   POST /api/schedule
router.post('/', authenticate, authorize('ADMIN'), createSchedule);

// @route   GET /api/schedule/group/:groupId
router.get('/group/:groupId', authenticate, getGroupSchedule);

// @route   GET /api/schedule/teacher/:teacherId
router.get('/teacher/:teacherId', authenticate, getTeacherSchedule);

// @route   PUT /api/schedule/:id
router.put('/:id', authenticate, authorize('ADMIN'), updateSchedule);

// @route   DELETE /api/schedule/:id
router.delete('/:id', authenticate, authorize('ADMIN'), deleteSchedule);

export default router;
