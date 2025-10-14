"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendance_controller_1 = require("../controllers/attendance.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// @route   POST /api/attendance
router.post('/', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('TEACHER', 'ADMIN'), attendance_controller_1.createAttendance);
// @route   GET /api/attendance/student/:studentId
router.get('/student/:studentId', authMiddleware_1.authenticate, attendance_controller_1.getStudentAttendance);
// @route   GET /api/attendance/group/:groupId
router.get('/group/:groupId', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('TEACHER', 'ADMIN'), attendance_controller_1.getGroupAttendance);
// @route   PUT /api/attendance/:id
router.put('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('TEACHER', 'ADMIN'), attendance_controller_1.updateAttendance);
// @route   DELETE /api/attendance/:id
router.delete('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('ADMIN'), attendance_controller_1.deleteAttendance);
exports.default = router;
//# sourceMappingURL=attendance.routes.js.map