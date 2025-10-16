"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schedule_controller_1 = require("../controllers/schedule.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// @route   POST /api/schedule
router.post('/', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('ADMIN'), schedule_controller_1.createSchedule);
// @route   GET /api/schedule/group/:groupId
router.get('/group/:groupId', authMiddleware_1.authenticate, schedule_controller_1.getGroupSchedule);
// @route   GET /api/schedule/teacher/:teacherId
router.get('/teacher/:teacherId', authMiddleware_1.authenticate, schedule_controller_1.getTeacherSchedule);
// @route   PUT /api/schedule/:id
router.put('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('ADMIN'), schedule_controller_1.updateSchedule);
// @route   DELETE /api/schedule/:id
router.delete('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('ADMIN'), schedule_controller_1.deleteSchedule);
exports.default = router;
//# sourceMappingURL=schedule.routes.js.map