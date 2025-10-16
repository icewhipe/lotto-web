"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Все routes требуют аутентификации как Admin
router.use(authMiddleware_1.authenticate);
router.use((0, authMiddleware_1.authorize)('ADMIN'));
// Users
router.get('/users', admin_controller_1.getAllUsers);
router.post('/user', admin_controller_1.createUser);
router.delete('/user/:id', admin_controller_1.deleteUser);
// Groups
router.get('/groups', admin_controller_1.getAllGroups);
router.post('/group', admin_controller_1.createGroup);
// Subjects
router.get('/subjects', admin_controller_1.getAllSubjects);
router.post('/subject', admin_controller_1.createSubject);
// Stats
router.get('/stats', admin_controller_1.getStats);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map