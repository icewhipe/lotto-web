"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// @route   POST /api/auth/register
router.post('/register', auth_controller_1.register);
// @route   POST /api/auth/login
router.post('/login', auth_controller_1.login);
// @route   GET /api/auth/me
router.get('/me', authMiddleware_1.authenticate, auth_controller_1.getMe);
// @route   PUT /api/auth/profile
router.put('/profile', authMiddleware_1.authenticate, auth_controller_1.updateProfile);
// @route   POST /api/auth/change-password
router.post('/change-password', authMiddleware_1.authenticate, auth_controller_1.changePassword);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map