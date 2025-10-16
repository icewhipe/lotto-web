"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = exports.createSubject = exports.getAllSubjects = exports.createGroup = exports.getAllGroups = exports.deleteUser = exports.createUser = exports.getAllUsers = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
/**
 * @route   GET /api/admin/users
 * @desc    Получить всех пользователей
 * @access  Admin
 */
const getAllUsers = async (req, res) => {
    try {
        const { role, search } = req.query;
        const where = {};
        if (role)
            where.role = role;
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }
        const users = await prisma.user.findMany({
            where,
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                isActive: true,
                createdAt: true,
                student: {
                    include: {
                        group: true,
                    },
                },
                teacher: true,
                parent: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        res.json({
            success: true,
            data: users,
        });
    }
    catch (error) {
        console.error('GetAllUsers error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getAllUsers = getAllUsers;
/**
 * @route   POST /api/admin/user
 * @desc    Создать пользователя
 * @access  Admin
 */
const createUser = async (req, res) => {
    try {
        const { email, password, name, role, groupId } = req.body;
        // Проверка существования
        const existing = await prisma.user.findUnique({
            where: { email },
        });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role,
            },
        });
        // Создать связанную запись в зависимости от роли
        if (role === 'STUDENT' && groupId) {
            await prisma.student.create({
                data: {
                    userId: user.id,
                    groupId,
                    studentNumber: `ST-${Date.now()}`,
                    enrollmentDate: new Date(),
                },
            });
        }
        else if (role === 'TEACHER') {
            await prisma.teacher.create({
                data: {
                    userId: user.id,
                    position: 'Преподаватель',
                    department: 'Общий',
                },
            });
        }
        else if (role === 'PARENT') {
            await prisma.parent.create({
                data: {
                    userId: user.id,
                    childrenIds: [],
                },
            });
        }
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user,
        });
    }
    catch (error) {
        console.error('CreateUser error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.createUser = createUser;
/**
 * @route   DELETE /api/admin/user/:id
 * @desc    Удалить пользователя
 * @access  Admin
 */
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.user.delete({
            where: { id },
        });
        res.json({
            success: true,
            message: 'User deleted successfully',
        });
    }
    catch (error) {
        console.error('DeleteUser error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.deleteUser = deleteUser;
/**
 * @route   GET /api/admin/groups
 * @desc    Получить все группы
 * @access  Admin
 */
const getAllGroups = async (req, res) => {
    try {
        const groups = await prisma.group.findMany({
            include: {
                specialty: true,
                students: {
                    include: {
                        user: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        students: true,
                    },
                },
            },
            orderBy: { name: 'asc' },
        });
        res.json({
            success: true,
            data: groups,
        });
    }
    catch (error) {
        console.error('GetAllGroups error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getAllGroups = getAllGroups;
/**
 * @route   POST /api/admin/group
 * @desc    Создать группу
 * @access  Admin
 */
const createGroup = async (req, res) => {
    try {
        const { name, year, specialtyId } = req.body;
        const group = await prisma.group.create({
            data: {
                name,
                year,
                specialtyId,
            },
            include: {
                specialty: true,
            },
        });
        res.status(201).json({
            success: true,
            message: 'Group created successfully',
            data: group,
        });
    }
    catch (error) {
        console.error('CreateGroup error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.createGroup = createGroup;
/**
 * @route   GET /api/admin/subjects
 * @desc    Получить все предметы
 * @access  Admin
 */
const getAllSubjects = async (req, res) => {
    try {
        const subjects = await prisma.subject.findMany({
            include: {
                specialty: true,
                teacher: {
                    include: {
                        user: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
            orderBy: { name: 'asc' },
        });
        res.json({
            success: true,
            data: subjects,
        });
    }
    catch (error) {
        console.error('GetAllSubjects error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getAllSubjects = getAllSubjects;
/**
 * @route   POST /api/admin/subject
 * @desc    Создать предмет
 * @access  Admin
 */
const createSubject = async (req, res) => {
    try {
        const { name, code, specialtyId, teacherId } = req.body;
        // Используем connect для связи с specialty
        const subject = await prisma.subject.create({
            data: {
                name,
                code,
                specialty: {
                    connect: { id: specialtyId }
                },
                ...(teacherId && teacherId !== '' && {
                    teacher: {
                        connect: { id: teacherId }
                    }
                }),
            },
            include: {
                specialty: true,
                teacher: {
                    include: {
                        user: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        res.status(201).json({
            success: true,
            message: 'Subject created successfully',
            data: subject,
        });
    }
    catch (error) {
        console.error('CreateSubject error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.createSubject = createSubject;
/**
 * @route   GET /api/admin/stats
 * @desc    Получить общую статистику
 * @access  Admin
 */
const getStats = async (req, res) => {
    try {
        const [totalUsers, totalStudents, totalTeachers, totalGroups, totalSubjects, totalGrades,] = await Promise.all([
            prisma.user.count(),
            prisma.student.count(),
            prisma.teacher.count(),
            prisma.group.count(),
            prisma.subject.count(),
            prisma.grade.count(),
        ]);
        res.json({
            success: true,
            data: {
                totalUsers,
                totalStudents,
                totalTeachers,
                totalGroups,
                totalSubjects,
                totalGrades,
            },
        });
    }
    catch (error) {
        console.error('GetStats error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getStats = getStats;
//# sourceMappingURL=admin.controller.js.map