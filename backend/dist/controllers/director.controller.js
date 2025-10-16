"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroupsOverview = exports.getAttendanceReport = exports.getPerformanceReport = exports.getAnalytics = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * @route   GET /api/director/analytics
 * @desc    Получить общую аналитику колледжа
 * @access  Director
 */
const getAnalytics = async (req, res) => {
    try {
        const [totalStudents, totalTeachers, totalGroups, totalSubjects, recentGrades, recentAttendance,] = await Promise.all([
            prisma.student.count(),
            prisma.teacher.count(),
            prisma.group.count(),
            prisma.subject.count(),
            prisma.grade.findMany({
                take: 100,
                orderBy: { date: 'desc' },
            }),
            prisma.attendance.findMany({
                take: 100,
                orderBy: { date: 'desc' },
            }),
        ]);
        // Средний балл по колледжу
        const averageGrade = recentGrades.length > 0
            ? recentGrades.reduce((sum, g) => sum + g.value, 0) / recentGrades.length
            : 0;
        // Процент посещаемости
        const attendanceStats = {
            total: recentAttendance.length,
            present: recentAttendance.filter(a => a.status === 'PRESENT').length,
        };
        const attendancePercentage = attendanceStats.total > 0
            ? (attendanceStats.present / attendanceStats.total) * 100
            : 0;
        res.json({
            success: true,
            data: {
                overview: {
                    totalStudents,
                    totalTeachers,
                    totalGroups,
                    totalSubjects,
                },
                performance: {
                    averageGrade: Math.round(averageGrade * 100) / 100,
                    attendancePercentage: Math.round(attendancePercentage * 10) / 10,
                },
            },
        });
    }
    catch (error) {
        console.error('GetAnalytics error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getAnalytics = getAnalytics;
/**
 * @route   GET /api/director/performance-report
 * @desc    Получить отчёт по успеваемости
 * @access  Director
 */
const getPerformanceReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const where = {};
        if (startDate || endDate) {
            where.date = {};
            if (startDate)
                where.date.gte = new Date(startDate);
            if (endDate)
                where.date.lte = new Date(endDate);
        }
        const grades = await prisma.grade.findMany({
            where,
            include: {
                student: {
                    include: {
                        user: {
                            select: {
                                name: true,
                            },
                        },
                        group: true,
                    },
                },
                subject: true,
            },
        });
        // Группировка по группам
        const byGroup = {};
        grades.forEach(grade => {
            const groupName = grade.student.group.name;
            if (!byGroup[groupName]) {
                byGroup[groupName] = {
                    groupName,
                    totalGrades: 0,
                    totalValue: 0,
                    grades: [],
                };
            }
            byGroup[groupName].totalGrades++;
            byGroup[groupName].totalValue += grade.value;
            byGroup[groupName].grades.push(grade);
        });
        // Вычислить средние баллы
        const report = Object.values(byGroup).map((group) => ({
            groupName: group.groupName,
            totalGrades: group.totalGrades,
            averageGrade: Math.round((group.totalValue / group.totalGrades) * 100) / 100,
        }));
        res.json({
            success: true,
            data: {
                report,
                totalGrades: grades.length,
            },
        });
    }
    catch (error) {
        console.error('GetPerformanceReport error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getPerformanceReport = getPerformanceReport;
/**
 * @route   GET /api/director/attendance-report
 * @desc    Получить отчёт по посещаемости
 * @access  Director
 */
const getAttendanceReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const where = {};
        if (startDate || endDate) {
            where.date = {};
            if (startDate)
                where.date.gte = new Date(startDate);
            if (endDate)
                where.date.lte = new Date(endDate);
        }
        const attendance = await prisma.attendance.findMany({
            where,
            include: {
                student: {
                    include: {
                        user: {
                            select: {
                                name: true,
                            },
                        },
                        group: true,
                    },
                },
            },
        });
        // Группировка по группам
        const byGroup = {};
        attendance.forEach(record => {
            const groupName = record.student.group.name;
            if (!byGroup[groupName]) {
                byGroup[groupName] = {
                    groupName,
                    total: 0,
                    present: 0,
                    absent: 0,
                    late: 0,
                    excused: 0,
                };
            }
            byGroup[groupName].total++;
            byGroup[groupName][record.status.toLowerCase()]++;
        });
        // Вычислить проценты
        const report = Object.values(byGroup).map((group) => ({
            groupName: group.groupName,
            total: group.total,
            present: group.present,
            absent: group.absent,
            late: group.late,
            excused: group.excused,
            percentage: Math.round((group.present / group.total) * 100 * 10) / 10,
        }));
        res.json({
            success: true,
            data: {
                report,
                totalRecords: attendance.length,
            },
        });
    }
    catch (error) {
        console.error('GetAttendanceReport error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getAttendanceReport = getAttendanceReport;
/**
 * @route   GET /api/director/groups-overview
 * @desc    Получить обзор по всем группам
 * @access  Director
 */
const getGroupsOverview = async (req, res) => {
    try {
        const groups = await prisma.group.findMany({
            include: {
                specialty: true,
                students: {
                    include: {
                        grades: {
                            take: 10,
                            orderBy: { date: 'desc' },
                        },
                        attendance: {
                            take: 10,
                            orderBy: { date: 'desc' },
                        },
                    },
                },
                _count: {
                    select: {
                        students: true,
                    },
                },
            },
        });
        const overview = groups.map(group => {
            const allGrades = group.students.flatMap(s => s.grades);
            const allAttendance = group.students.flatMap(s => s.attendance);
            const avgGrade = allGrades.length > 0
                ? allGrades.reduce((sum, g) => sum + g.value, 0) / allGrades.length
                : 0;
            const presentCount = allAttendance.filter(a => a.status === 'PRESENT').length;
            const attendancePercent = allAttendance.length > 0
                ? (presentCount / allAttendance.length) * 100
                : 0;
            return {
                id: group.id,
                name: group.name,
                year: group.year,
                specialty: group.specialty.name,
                studentsCount: group._count.students,
                averageGrade: Math.round(avgGrade * 100) / 100,
                attendancePercentage: Math.round(attendancePercent * 10) / 10,
            };
        });
        res.json({
            success: true,
            data: overview,
        });
    }
    catch (error) {
        console.error('GetGroupsOverview error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getGroupsOverview = getGroupsOverview;
//# sourceMappingURL=director.controller.js.map