"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChildSchedule = exports.getChildAttendance = exports.getChildGrades = exports.getChildren = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * @route   GET /api/parent/children
 * @desc    Получить список детей родителя
 * @access  Parent
 */
const getChildren = async (req, res) => {
    try {
        const userId = req.user.userId;
        const parent = await prisma.parent.findUnique({
            where: { userId },
        });
        if (!parent) {
            return res.status(404).json({
                success: false,
                message: 'Parent not found',
            });
        }
        // Получить всех детей
        const children = await prisma.student.findMany({
            where: {
                id: {
                    in: parent.childrenIds,
                },
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                group: {
                    include: {
                        specialty: true,
                    },
                },
            },
        });
        res.json({
            success: true,
            data: children,
        });
    }
    catch (error) {
        console.error('GetChildren error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getChildren = getChildren;
/**
 * @route   GET /api/parent/child/:childId/grades
 * @desc    Получить оценки ребёнка
 * @access  Parent
 */
const getChildGrades = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { childId } = req.params;
        // Проверка что это действительно ребёнок родителя
        const parent = await prisma.parent.findUnique({
            where: { userId },
        });
        if (!parent || !parent.childrenIds.includes(childId)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied',
            });
        }
        const grades = await prisma.grade.findMany({
            where: { studentId: childId },
            include: {
                subject: true,
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
            orderBy: { date: 'desc' },
        });
        // Статистика
        const average = grades.length > 0
            ? grades.reduce((sum, g) => sum + g.value, 0) / grades.length
            : 0;
        res.json({
            success: true,
            data: {
                grades,
                stats: {
                    total: grades.length,
                    average: Math.round(average * 100) / 100,
                },
            },
        });
    }
    catch (error) {
        console.error('GetChildGrades error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getChildGrades = getChildGrades;
/**
 * @route   GET /api/parent/child/:childId/attendance
 * @desc    Получить посещаемость ребёнка
 * @access  Parent
 */
const getChildAttendance = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { childId } = req.params;
        // Проверка что это действительно ребёнок родителя
        const parent = await prisma.parent.findUnique({
            where: { userId },
        });
        if (!parent || !parent.childrenIds.includes(childId)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied',
            });
        }
        const attendance = await prisma.attendance.findMany({
            where: { studentId: childId },
            orderBy: { date: 'desc' },
        });
        // Статистика
        const stats = {
            total: attendance.length,
            present: attendance.filter(a => a.status === 'PRESENT').length,
            absent: attendance.filter(a => a.status === 'ABSENT').length,
            late: attendance.filter(a => a.status === 'LATE').length,
            excused: attendance.filter(a => a.status === 'EXCUSED').length,
        };
        const percentage = stats.total > 0
            ? Math.round((stats.present / stats.total) * 100 * 10) / 10
            : 0;
        res.json({
            success: true,
            data: {
                attendance,
                stats: {
                    ...stats,
                    percentage,
                },
            },
        });
    }
    catch (error) {
        console.error('GetChildAttendance error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getChildAttendance = getChildAttendance;
/**
 * @route   GET /api/parent/child/:childId/schedule
 * @desc    Получить расписание ребёнка
 * @access  Parent
 */
const getChildSchedule = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { childId } = req.params;
        // Проверка что это действительно ребёнок родителя
        const parent = await prisma.parent.findUnique({
            where: { userId },
        });
        if (!parent || !parent.childrenIds.includes(childId)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied',
            });
        }
        const student = await prisma.student.findUnique({
            where: { id: childId },
            include: {
                group: {
                    include: {
                        schedules: {
                            include: {
                                subject: true,
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
                            orderBy: [
                                { dayOfWeek: 'asc' },
                                { startTime: 'asc' },
                            ],
                        },
                    },
                },
            },
        });
        res.json({
            success: true,
            data: student?.group.schedules || [],
        });
    }
    catch (error) {
        console.error('GetChildSchedule error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getChildSchedule = getChildSchedule;
//# sourceMappingURL=parent.controller.js.map