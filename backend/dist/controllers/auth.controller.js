"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.updateProfile = exports.getMe = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const jwt_1 = require("../config/jwt");
const prisma = new client_1.PrismaClient();
/**
 * Регистрация нового пользователя
 */
const register = async (req, res) => {
    try {
        const { email, password, name, role } = req.body;
        // Проверка существующего пользователя
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists',
            });
        }
        // Хеширование пароля
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Создание пользователя
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: role,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });
        // Генерация токена
        const token = (0, jwt_1.generateToken)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user,
                token,
            },
        });
    }
    catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.register = register;
/**
 * Вход пользователя
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Поиск пользователя
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                error: 'Неверный email или пароль',
            });
        }
        // Проверка пароля
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                error: 'Неверный email или пароль',
            });
        }
        // Проверка активности аккаунта
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: 'Account is inactive',
            });
        }
        // Генерация токена
        const token = (0, jwt_1.generateToken)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        // Получение дополнительных данных в зависимости от роли
        let profile = null;
        if (user.role === 'STUDENT') {
            profile = await prisma.student.findUnique({
                where: { userId: user.id },
                include: {
                    group: {
                        include: {
                            specialty: true,
                        },
                    },
                },
            });
        }
        else if (user.role === 'TEACHER') {
            profile = await prisma.teacher.findUnique({
                where: { userId: user.id },
            });
        }
        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
                profile,
                token,
            },
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.login = login;
/**
 * Получение текущего пользователя
 */
const getMe = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        // Получение профиля
        let profile = null;
        if (user.role === 'STUDENT') {
            profile = await prisma.student.findUnique({
                where: { userId: user.id },
                include: {
                    group: {
                        include: {
                            specialty: true,
                        },
                    },
                },
            });
        }
        else if (user.role === 'TEACHER') {
            profile = await prisma.teacher.findUnique({
                where: { userId: user.id },
            });
        }
        res.json({
            success: true,
            data: {
                user,
                profile,
            },
        });
    }
    catch (error) {
        console.error('GetMe error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getMe = getMe;
/**
 * Обновление профиля
 */
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name } = req.body;
        const user = await prisma.user.update({
            where: { id: userId },
            data: { name },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                updatedAt: true,
            },
        });
        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: { user },
        });
    }
    catch (error) {
        console.error('UpdateProfile error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.updateProfile = updateProfile;
/**
 * Изменение пароля
 */
const changePassword = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { currentPassword, newPassword } = req.body;
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        // Проверка текущего пароля
        const isPasswordValid = await bcryptjs_1.default.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect',
            });
        }
        // Хеширование нового пароля
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        // Обновление пароля
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
        res.json({
            success: true,
            message: 'Password changed successfully',
        });
    }
    catch (error) {
        console.error('ChangePassword error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.changePassword = changePassword;
//# sourceMappingURL=auth.controller.js.map