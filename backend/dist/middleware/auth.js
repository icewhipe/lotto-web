"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../config/database"));
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Verify user exists
        const user = await database_1.default.user.findUnique({
            where: { id: decoded.userId },
        });
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        req.user = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth.js.map