"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controllers/studentController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// All routes require authentication as student
router.use(auth_1.authenticate);
router.use((0, auth_1.authorize)('student'));
router.get('/dashboard', studentController_1.getDashboard);
router.get('/grades', studentController_1.getGrades);
router.get('/schedule', studentController_1.getSchedule);
router.get('/attendance', studentController_1.getAttendance);
exports.default = router;
//# sourceMappingURL=studentRoutes.js.map