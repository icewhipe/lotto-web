"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parent_controller_1 = require("../controllers/parent.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Все routes требуют аутентификации как Parent
router.use(authMiddleware_1.authenticate);
router.use((0, authMiddleware_1.authorize)('PARENT'));
// @route   GET /api/parent/children
router.get('/children', parent_controller_1.getChildren);
// @route   GET /api/parent/child/:childId/grades
router.get('/child/:childId/grades', parent_controller_1.getChildGrades);
// @route   GET /api/parent/child/:childId/attendance
router.get('/child/:childId/attendance', parent_controller_1.getChildAttendance);
// @route   GET /api/parent/child/:childId/schedule
router.get('/child/:childId/schedule', parent_controller_1.getChildSchedule);
exports.default = router;
//# sourceMappingURL=parent.routes.js.map