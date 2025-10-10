import express from 'express';
import {
  getDashboard,
  getGroups,
  setGrade,
} from '../controllers/teacherController';
import { authenticate, authorize } from '../middleware/auth';
import { validate, schemas } from '../middleware/validation';

const router = express.Router();

// All routes require authentication as teacher
router.use(authenticate);
router.use(authorize('teacher'));

router.get('/dashboard', getDashboard);
router.get('/groups', getGroups);
router.post('/grades', validate(schemas.grade), setGrade);

export default router;
