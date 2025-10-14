"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemas = exports.validate = void 0;
const joi_1 = __importDefault(require("joi"));
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((detail) => ({
                field: detail.path.join('.'),
                message: detail.message,
            }));
            return res.status(400).json({
                error: 'Validation error',
                details: errors,
            });
        }
        next();
    };
};
exports.validate = validate;
// Common validation schemas
exports.schemas = {
    login: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
    }),
    register: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
        name: joi_1.default.string().min(2).required(),
        role: joi_1.default.string().valid('student', 'teacher', 'parent', 'applicant', 'admin').required(),
    }),
    grade: joi_1.default.object({
        studentId: joi_1.default.string().required(),
        subjectId: joi_1.default.string().required(),
        value: joi_1.default.number().min(1).max(5).required(),
        type: joi_1.default.string().valid('exam', 'test', 'homework', 'classwork').required(),
        comment: joi_1.default.string().optional(),
    }),
    schedule: joi_1.default.object({
        groupId: joi_1.default.string().required(),
        subjectId: joi_1.default.string().required(),
        teacherId: joi_1.default.string().required(),
        dayOfWeek: joi_1.default.number().min(0).max(6).required(),
        startTime: joi_1.default.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
        endTime: joi_1.default.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
        room: joi_1.default.string().required(),
        type: joi_1.default.string().valid('lecture', 'practice', 'lab', 'seminar').required(),
    }),
};
//# sourceMappingURL=validation.js.map