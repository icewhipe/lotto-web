"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSchedule = exports.updateSchedule = exports.getTeacherSchedule = exports.getGroupSchedule = exports.createSchedule = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * @route   POST /api/schedule
 * @desc    Создать расписание
 * @access  Admin
 */
const createSchedule = async (req, res) => {
    try {
        const { groupId, subjectId, teacherId, dayOfWeek, startTime, endTime, room, type, } = req.body;
        const schedule = await prisma.schedule.create({
            data: {
                groupId,
                subjectId,
                teacherId,
                dayOfWeek,
                startTime,
                endTime,
                room,
                type,
            },
            include: {
                group: true,
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
        });
        res.status(201).json({
            success: true,
            message: 'Schedule created successfully',
            data: schedule,
        });
    }
    catch (error) {
        console.error('CreateSchedule error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.createSchedule = createSchedule;
/**
 * @route   GET /api/schedule/group/:groupId
 * @desc    Получить расписание группы
 * @access  Authenticated
 */
const getGroupSchedule = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { dayOfWeek } = req.query;
        const where = { groupId };
        if (dayOfWeek) {
            where.dayOfWeek = Number(dayOfWeek);
        }
        const schedule = await prisma.schedule.findMany({
            where,
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
        });
        // Группировка по дням недели
        const scheduleByDay = schedule.reduce((acc, item) => {
            if (!acc[item.dayOfWeek]) {
                acc[item.dayOfWeek] = [];
            }
            acc[item.dayOfWeek].push(item);
            return acc;
        }, {});
        res.json({
            success: true,
            data: {
                schedule,
                byDay: scheduleByDay,
            },
        });
    }
    catch (error) {
        console.error('GetGroupSchedule error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getGroupSchedule = getGroupSchedule;
/**
 * @route   GET /api/schedule/teacher/:teacherId
 * @desc    Получить расписание преподавателя
 * @access  Authenticated
 */
const getTeacherSchedule = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const schedule = await prisma.schedule.findMany({
            where: { teacherId },
            include: {
                group: true,
                subject: true,
            },
            orderBy: [
                { dayOfWeek: 'asc' },
                { startTime: 'asc' },
            ],
        });
        res.json({
            success: true,
            data: schedule,
        });
    }
    catch (error) {
        console.error('GetTeacherSchedule error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getTeacherSchedule = getTeacherSchedule;
/**
 * @route   PUT /api/schedule/:id
 * @desc    Обновить расписание
 * @access  Admin
 */
const updateSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const { dayOfWeek, startTime, endTime, room, type } = req.body;
        const schedule = await prisma.schedule.update({
            where: { id },
            data: {
                dayOfWeek,
                startTime,
                endTime,
                room,
                type,
            },
            include: {
                group: true,
                subject: true,
                teacher: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        res.json({
            success: true,
            message: 'Schedule updated successfully',
            data: schedule,
        });
    }
    catch (error) {
        console.error('UpdateSchedule error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.updateSchedule = updateSchedule;
/**
 * @route   DELETE /api/schedule/:id
 * @desc    Удалить расписание
 * @access  Admin
 */
const deleteSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.schedule.delete({
            where: { id },
        });
        res.json({
            success: true,
            message: 'Schedule deleted successfully',
        });
    }
    catch (error) {
        console.error('DeleteSchedule error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.deleteSchedule = deleteSchedule;
//# sourceMappingURL=schedule.controller.js.map