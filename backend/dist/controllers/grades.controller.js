"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGrade = exports.updateGrade = exports.getGradeById = exports.getStudentGrades = exports.createGrade = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * @route   POST /api/grades
 * @desc    Создать оценку
 * @access  Teacher, Admin
 */
const createGrade = async (req, res) => {
    try {
        const { studentId, subjectId, teacherId, value, type, comment } = req.body;
        const grade = await prisma.grade.create({
            data: {
                studentId,
                subjectId,
                teacherId,
                value,
                type,
                comment,
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
                subject: true,
                teacher: {
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
            message: 'Grade created successfully',
            data: grade,
        });
    }
    catch (error) {
        console.error('CreateGrade error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.createGrade = createGrade;
/**
 * @route   GET /api/grades/student/:studentId
 * @desc    Получить оценки студента
 * @access  Student, Teacher, Admin
 */
const getStudentGrades = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { subjectId, type, startDate, endDate } = req.query;
        const where = { studentId };
        if (subjectId)
            where.subjectId = subjectId;
        if (type)
            where.type = type;
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
        // Подсчёт среднего
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
        console.error('GetStudentGrades error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getStudentGrades = getStudentGrades;
/**
 * @route   GET /api/grades/:id
 * @desc    Получить оценку по ID
 * @access  Authenticated
 */
const getGradeById = async (req, res) => {
    try {
        const { id } = req.params;
        const grade = await prisma.grade.findUnique({
            where: { id },
            include: {
                student: {
                    include: {
                        user: true,
                        group: true,
                    },
                },
                subject: true,
                teacher: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        if (!grade) {
            return res.status(404).json({
                success: false,
                message: 'Grade not found',
            });
        }
        res.json({
            success: true,
            data: grade,
        });
    }
    catch (error) {
        console.error('GetGradeById error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getGradeById = getGradeById;
/**
 * @route   PUT /api/grades/:id
 * @desc    Обновить оценку
 * @access  Teacher, Admin
 */
const updateGrade = async (req, res) => {
    try {
        const { id } = req.params;
        const { value, type, comment } = req.body;
        const grade = await prisma.grade.update({
            where: { id },
            data: {
                value,
                type,
                comment,
            },
            include: {
                student: {
                    include: {
                        user: true,
                    },
                },
                subject: true,
            },
        });
        res.json({
            success: true,
            message: 'Grade updated successfully',
            data: grade,
        });
    }
    catch (error) {
        console.error('UpdateGrade error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.updateGrade = updateGrade;
/**
 * @route   DELETE /api/grades/:id
 * @desc    Удалить оценку
 * @access  Admin
 */
const deleteGrade = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.grade.delete({
            where: { id },
        });
        res.json({
            success: true,
            message: 'Grade deleted successfully',
        });
    }
    catch (error) {
        console.error('DeleteGrade error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.deleteGrade = deleteGrade;
//# sourceMappingURL=grades.controller.js.map