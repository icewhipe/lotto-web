import { Router } from 'express';
import {
  getAllUsers,
  createUser,
  deleteUser,
  getAllGroups,
  createGroup,
  getAllSubjects,
  createSubject,
  getStats,
} from '../controllers/admin.controller';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

// Все routes требуют аутентификации как Admin
router.use(authenticate);
router.use(authorize('ADMIN'));

// Users
router.get('/users', getAllUsers);
router.post('/user', createUser);
router.delete('/user/:id', deleteUser);

// Groups
router.get('/groups', getAllGroups);
router.post('/group', createGroup);

// Subjects
router.get('/subjects', getAllSubjects);
router.post('/subject', createSubject);

// Stats
router.get('/stats', getStats);

export default router;
