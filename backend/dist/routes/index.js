"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const studentRoutes_1 = __importDefault(require("./studentRoutes"));
const teacherRoutes_1 = __importDefault(require("./teacherRoutes"));
const router = express_1.default.Router();
router.use('/auth', authRoutes_1.default);
router.use('/student', studentRoutes_1.default);
router.use('/teacher', teacherRoutes_1.default);
// Health check
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString(),
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map