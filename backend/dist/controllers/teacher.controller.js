"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeacherGroups = exports.markAttendance = exports.createGradeByTeacher = exports.getTeacherStudents = exports.getTeacherSchedule = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * @route   GET /api/teacher/schedule
 * @desc    Получить расписание преподавателя
 * @access  Teacher
 */
const getTeacherSchedule = async (req, res) => {
    try {
        const userId = req.user.userId;
        // Найти преподавателя
        const teacher = await prisma.teacher.findUnique({
            where: { userId },
            include: {
                schedules: {
                    include: {
                        subject: true,
                        group: true,
                    },
                    orderBy: [
                        { dayOfWeek: 'asc' },
                        { startTime: 'asc' },
                    ],
                },
            },
        });
        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found',
            });
        }
        res.json({
            success: true,
            data: teacher.schedules,
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
 * @route   GET /api/teacher/students
 * @desc    Получить список студентов преподавателя
 * @access  Teacher
 */
const getTeacherStudents = async (req, res) => {
    try {
        const userId = req.user.userId;
        const teacher = await prisma.teacher.findUnique({
            where: { userId },
            include: {
                subjects: {
                    include: {
                        specialty: {
                            include: {
                                groups: {
                                    include: {
                                        students: {
                                            include: {
                                                user: {
                                                    select: {
                                                        name: true,
                                                        email: true,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found',
            });
        }
        // Собрать всех уникальных студентов
        const studentsSet = new Set();
        const students = [];
        teacher.subjects.forEach(subject => {
            subject.specialty.groups.forEach(group => {
                group.students.forEach(student => {
                    if (!studentsSet.has(student.id)) {
                        studentsSet.add(student.id);
                        students.push({
                            ...student,
                            group: {
                                id: group.id,
                                name: group.name,
                            },
                        });
                    }
                });
            });
        });
        res.json({
            success: true,
            data: students,
        });
    }
    catch (error) {
        console.error('GetTeacherStudents error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getTeacherStudents = getTeacherStudents;
/**
 * @route   POST /api/teacher/grade
 * @desc    Выставить оценку студенту
 * @access  Teacher
 */
const createGradeByTeacher = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { studentId, subjectId, value, type, comment } = req.body;
        // Проверка что преподаватель ведёт этот предмет
        const teacher = await prisma.teacher.findUnique({
            where: { userId },
            include: {
                subjects: true,
            },
        });
        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found',
            });
        }
        const teachesSubject = teacher.subjects.some(s => s.id === subjectId);
        if (!teachesSubject) {
            return res.status(403).json({
                success: false,
                message: 'You do not teach this subject',
            });
        }
        const grade = await prisma.grade.create({
            data: {
                studentId,
                subjectId,
                teacherId: teacher.id,
                value,
                type,
                comment,
            },
            include: {
                student: {
                    include: {
                        user: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
                subject: true,
            },
        });
        res.status(201).json({
            success: true,
            message: 'Grade created successfully',
            data: grade,
        });
    }
    catch (error) {
        console.error('CreateGradeByTeacher error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.createGradeByTeacher = createGradeByTeacher;
/**
 * @route   POST /api/teacher/attendance
 * @desc    Отметить посещаемость студента
 * @access  Teacher
 */
const markAttendance = async (req, res) => {
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
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        res.status(201).json({
            success: true,
            message: 'Attendance marked successfully',
            data: attendance,
        });
    }
    catch (error) {
        console.error('MarkAttendance error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.markAttendance = markAttendance;
/**
 * @route   GET /api/teacher/groups
 * @desc    Получить группы преподавателя
 * @access  Teacher
 */
const getTeacherGroups = async (req, res) => {
    try {
        const userId = req.user.userId;
        const teacher = await prisma.teacher.findUnique({
            where: { userId },
            include: {
                schedules: {
                    include: {
                        group: {
                            include: {
                                specialty: true,
                            },
                        },
                    },
                },
            },
        });
        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found',
            });
        }
        // Уникальные группы
        const groupsMap = new Map();
        teacher.schedules.forEach(schedule => {
            if (!groupsMap.has(schedule.group.id)) {
                groupsMap.set(schedule.group.id, schedule.group);
            }
        });
        const groups = Array.from(groupsMap.values());
        res.json({
            success: true,
            data: groups,
        });
    }
    catch (error) {
        console.error('GetTeacherGroups error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getTeacherGroups = getTeacherGroups;
//# sourceMappingURL=teacher.controller.js.map