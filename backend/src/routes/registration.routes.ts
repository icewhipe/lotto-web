import { Router } from 'express';
import * as registrationController from '../controllers/registration.controller';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

// ============= PUBLIC ROUTES =============

// Проверить код приглашения
router.post('/check-invite-code', registrationController.checkInviteCode);

// Регистрация с кодом приглашения
router.post('/register-with-invite', registrationController.registerWithInvite);

// Регистрация с модерацией
router.post('/register-pending', registrationController.registerPending);

// ============= ADMIN ROUTES =============

// Получить все заявки на регистрацию
router.get(
  '/requests',
  authenticate,
  authorize('ADMIN', 'DIRECTOR'),
  registrationController.getRegistrationRequests
);

// Утвердить заявку
router.post(
  '/requests/:requestId/approve',
  authenticate,
  authorize('ADMIN'),
  registrationController.approveRegistration
);

// Отклонить заявку
router.post(
  '/requests/:requestId/reject',
  authenticate,
  authorize('ADMIN'),
  registrationController.rejectRegistration
);

// Сгенерировать коды приглашения
router.post(
  '/invite-codes/generate',
  authenticate,
  authorize('ADMIN'),
  registrationController.generateInviteCodes
);

// Получить все коды приглашения
router.get(
  '/invite-codes',
  authenticate,
  authorize('ADMIN'),
  registrationController.getInviteCodes
);

export default router;
