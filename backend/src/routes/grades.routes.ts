import { Router } from 'express';
import {
  createGrade,
  getStudentGrades,
  getGradeById,
  updateGrade,
  deleteGrade,
} from '../controllers/grades.controller';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

// @route   POST /api/grades
router.post('/', authenticate, authorize('TEACHER', 'ADMIN'), createGrade);

// @route   GET /api/grades/student/:studentId
router.get('/student/:studentId', authenticate, getStudentGrades);

// @route   GET /api/grades/:id
router.get('/:id', authenticate, getGradeById);

// @route   PUT /api/grades/:id
router.put('/:id', authenticate, authorize('TEACHER', 'ADMIN'), updateGrade);

// @route   DELETE /api/grades/:id
router.delete('/:id', authenticate, authorize('ADMIN'), deleteGrade);

export default router;
