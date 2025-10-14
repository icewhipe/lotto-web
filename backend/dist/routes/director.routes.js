"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const director_controller_1 = require("../controllers/director.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Все routes требуют аутентификации
router.use(authMiddleware_1.authenticate);
// @route   GET /api/director/analytics
router.get('/analytics', director_controller_1.getAnalytics);
// @route   GET /api/director/performance-report
router.get('/performance-report', director_controller_1.getPerformanceReport);
// @route   GET /api/director/attendance-report
router.get('/attendance-report', director_controller_1.getAttendanceReport);
// @route   GET /api/director/groups-overview
router.get('/groups-overview', director_controller_1.getGroupsOverview);
exports.default = router;
//# sourceMappingURL=director.routes.js.map