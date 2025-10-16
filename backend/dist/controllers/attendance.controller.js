"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAttendance = exports.updateAttendance = exports.getGroupAttendance = exports.getStudentAttendance = exports.createAttendance = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * @route   POST /api/attendance
 * @desc    Создать запись посещаемости
 * @access  Teacher, Admin
 */
const createAttendance = async (req, res) => {
    try {
        const { studentId, date, status, reason } = req.body;
        const attendance = await prisma.attendance.create({
            data: {
                studentId,
                date: new Date(date),
                status,
                reason,
            },
            include: {
                student: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        res.status(201).json({
            success: true,
            message: 'Attendance record created successfully',
            data: attendance,
        });
    }
    catch (error) {
        console.error('CreateAttendance error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.createAttendance = createAttendance;
/**
 * @route   GET /api/attendance/student/:studentId
 * @desc    Получить посещаемость студента
 * @access  Student, Teacher, Parent, Admin
 */
const getStudentAttendance = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { startDate, endDate, status } = req.query;
        const where = { studentId };
        if (status) {
            where.status = status;
        }
        if (startDate || endDate) {
            where.date = {};
            if (startDate)
                where.date.gte = new Date(startDate);
            if (endDate)
                where.date.lte = new Date(endDate);
        }
        const attendance = await prisma.attendance.findMany({
            where,
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
        console.error('GetStudentAttendance error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getStudentAttendance = getStudentAttendance;
/**
 * @route   GET /api/attendance/group/:groupId
 * @desc    Получить посещаемость группы
 * @access  Teacher, Admin
 */
const getGroupAttendance = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { date } = req.query;
        // Получаем всех студентов группы
        const students = await prisma.student.findMany({
            where: { groupId },
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
                attendance: date ? {
                    where: {
                        date: new Date(date),
                    },
                } : undefined,
            },
        });
        res.json({
            success: true,
            data: students,
        });
    }
    catch (error) {
        console.error('GetGroupAttendance error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getGroupAttendance = getGroupAttendance;
/**
 * @route   PUT /api/attendance/:id
 * @desc    Обновить запись посещаемости
 * @access  Teacher, Admin
 */
const updateAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, reason } = req.body;
        const attendance = await prisma.attendance.update({
            where: { id },
            data: {
                status,
                reason,
            },
            include: {
                student: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        res.json({
            success: true,
            message: 'Attendance record updated successfully',
            data: attendance,
        });
    }
    catch (error) {
        console.error('UpdateAttendance error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.updateAttendance = updateAttendance;
/**
 * @route   DELETE /api/attendance/:id
 * @desc    Удалить запись посещаемости
 * @access  Admin
 */
const deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.attendance.delete({
            where: { id },
        });
        res.json({
            success: true,
            message: 'Attendance record deleted successfully',
        });
    }
    catch (error) {
        console.error('DeleteAttendance error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.deleteAttendance = deleteAttendance;
//# sourceMappingURL=attendance.controller.js.map