"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const turnstile_controller_1 = require("../controllers/turnstile.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// @route   POST /api/turnstiles
router.post('/', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('ADMIN'), turnstile_controller_1.createTurnstile);
// @route   GET /api/turnstiles
router.get('/', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('ADMIN'), turnstile_controller_1.getTurnstiles);
// @route   GET /api/turnstiles/:id
router.get('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('ADMIN'), turnstile_controller_1.getTurnstileById);
// @route   PUT /api/turnstiles/:id
router.put('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('ADMIN'), turnstile_controller_1.updateTurnstile);
// @route   DELETE /api/turnstiles/:id
router.delete('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('ADMIN'), turnstile_controller_1.deleteTurnstile);
// @route   GET /api/turnstiles/:id/logs
router.get('/:id/logs', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('ADMIN'), turnstile_controller_1.getTurnstileLogs);
// @route   GET /api/turnstiles/:id/stats
router.get('/:id/stats', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('ADMIN'), turnstile_controller_1.getTurnstileStats);
exports.default = router;
//# sourceMappingURL=turnstile.routes.js.map