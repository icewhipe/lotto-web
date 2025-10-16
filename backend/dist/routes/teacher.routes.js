"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacher_controller_1 = require("../controllers/teacher.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Все routes требуют аутентификации как Teacher
router.use(authMiddleware_1.authenticate);
router.use((0, authMiddleware_1.authorize)('TEACHER'));
// @route   GET /api/teacher/schedule
router.get('/schedule', teacher_controller_1.getTeacherSchedule);
// @route   GET /api/teacher/students
router.get('/students', teacher_controller_1.getTeacherStudents);
// @route   GET /api/teacher/groups
router.get('/groups', teacher_controller_1.getTeacherGroups);
// @route   POST /api/teacher/grade
router.post('/grade', teacher_controller_1.createGradeByTeacher);
// @route   POST /api/teacher/attendance
router.post('/attendance', teacher_controller_1.markAttendance);
exports.default = router;
//# sourceMappingURL=teacher.routes.js.map