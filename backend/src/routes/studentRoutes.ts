import express from 'express';
import {
  getDashboard,
  getGrades,
  getSchedule,
  getAttendance,
} from '../controllers/studentController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// All routes require authentication as student
router.use(authenticate);
router.use(authorize('student'));

router.get('/dashboard', getDashboard);
router.get('/grades', getGrades);
router.get('/schedule', getSchedule);
router.get('/attendance', getAttendance);

export default router;
