import { Router } from 'express';
import {
  createAttendance,
  getStudentAttendance,
  getGroupAttendance,
  updateAttendance,
  deleteAttendance,
} from '../controllers/attendance.controller';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

// @route   POST /api/attendance
router.post('/', authenticate, authorize('TEACHER', 'ADMIN'), createAttendance);

// @route   GET /api/attendance/student/:studentId
router.get('/student/:studentId', authenticate, getStudentAttendance);

// @route   GET /api/attendance/group/:groupId
router.get('/group/:groupId', authenticate, authorize('TEACHER', 'ADMIN'), getGroupAttendance);

// @route   PUT /api/attendance/:id
router.put('/:id', authenticate, authorize('TEACHER', 'ADMIN'), updateAttendance);

// @route   DELETE /api/attendance/:id
router.delete('/:id', authenticate, authorize('ADMIN'), deleteAttendance);

export default router;
