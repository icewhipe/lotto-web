import { Router } from 'express';
import {
  getAnalytics,
  getPerformanceReport,
  getAttendanceReport,
  getGroupsOverview,
} from '../controllers/director.controller';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// Все routes требуют аутентификации
router.use(authenticate);

// @route   GET /api/director/analytics
router.get('/analytics', getAnalytics);

// @route   GET /api/director/performance-report
router.get('/performance-report', getPerformanceReport);

// @route   GET /api/director/attendance-report
router.get('/attendance-report', getAttendanceReport);

// @route   GET /api/director/groups-overview
router.get('/groups-overview', getGroupsOverview);

export default router;
