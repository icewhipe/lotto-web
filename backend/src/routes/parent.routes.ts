import { Router } from 'express';
import {
  getChildren,
  getChildGrades,
  getChildAttendance,
  getChildSchedule,
} from '../controllers/parent.controller';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

// Все routes требуют аутентификации как Parent
router.use(authenticate);
router.use(authorize('PARENT'));

// @route   GET /api/parent/children
router.get('/children', getChildren);

// @route   GET /api/parent/child/:childId/grades
router.get('/child/:childId/grades', getChildGrades);

// @route   GET /api/parent/child/:childId/attendance
router.get('/child/:childId/attendance', getChildAttendance);

// @route   GET /api/parent/child/:childId/schedule
router.get('/child/:childId/schedule', getChildSchedule);

export default router;
