"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const grades_controller_1 = require("../controllers/grades.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// @route   POST /api/grades
router.post('/', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('TEACHER', 'ADMIN'), grades_controller_1.createGrade);
// @route   GET /api/grades/student/:studentId
router.get('/student/:studentId', authMiddleware_1.authenticate, grades_controller_1.getStudentGrades);
// @route   GET /api/grades/:id
router.get('/:id', authMiddleware_1.authenticate, grades_controller_1.getGradeById);
// @route   PUT /api/grades/:id
router.put('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('TEACHER', 'ADMIN'), grades_controller_1.updateGrade);
// @route   DELETE /api/grades/:id
router.delete('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('ADMIN'), grades_controller_1.deleteGrade);
exports.default = router;
//# sourceMappingURL=grades.routes.js.map