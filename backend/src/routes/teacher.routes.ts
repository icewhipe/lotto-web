import { Router } from 'express';
import {
  getTeacherSchedule,
  getTeacherStudents,
  createGradeByTeacher,
  markAttendance,
  getTeacherGroups,
} from '../controllers/teacher.controller';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

// Все routes требуют аутентификации как Teacher
router.use(authenticate);
router.use(authorize('TEACHER'));

// @route   GET /api/teacher/schedule
router.get('/schedule', getTeacherSchedule);

// @route   GET /api/teacher/students
router.get('/students', getTeacherStudents);

// @route   GET /api/teacher/groups
router.get('/groups', getTeacherGroups);

// @route   POST /api/teacher/grade
router.post('/grade', createGradeByTeacher);

// @route   POST /api/teacher/attendance
router.post('/attendance', markAttendance);

export default router;
