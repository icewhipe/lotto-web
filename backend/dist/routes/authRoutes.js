"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.post('/register', (0, validation_1.validate)(validation_1.schemas.register), authController_1.register);
router.post('/login', (0, validation_1.validate)(validation_1.schemas.login), authController_1.login);
router.get('/me', auth_1.authenticate, authController_1.getMe);
router.post('/logout', auth_1.authenticate, authController_1.logout);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map