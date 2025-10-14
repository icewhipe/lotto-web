"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teacherController_1 = require("../controllers/teacherController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
// All routes require authentication as teacher
router.use(auth_1.authenticate);
router.use((0, auth_1.authorize)('teacher'));
router.get('/dashboard', teacherController_1.getDashboard);
router.get('/groups', teacherController_1.getGroups);
router.post('/grades', (0, validation_1.validate)(validation_1.schemas.grade), teacherController_1.setGrade);
exports.default = router;
//# sourceMappingURL=teacherRoutes.js.map