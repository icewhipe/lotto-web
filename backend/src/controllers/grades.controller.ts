import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';
import { GradeDTO } from '../types';

const prisma = new PrismaClient();

/**
 * @route   POST /api/grades
 * @desc    Создать оценку
 * @access  Teacher, Admin
 */
export const createGrade = async (req: AuthRequest, res: Response) => {
  try {
    const { studentId, subjectId, teacherId, value, type, comment }: GradeDTO = req.body;

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
  } catch (error) {
    console.error('CreateGrade error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   GET /api/grades/student/:studentId
 * @desc    Получить оценки студента
 * @access  Student, Teacher, Admin
 */
export const getStudentGrades = async (req: AuthRequest, res: Response) => {
  try {
    const { studentId } = req.params;
    const { subjectId, type, startDate, endDate } = req.query;

    const where: any = { studentId };

    if (subjectId) where.subjectId = subjectId as string;
    if (type) where.type = type;
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate as string);
      if (endDate) where.date.lte = new Date(endDate as string);
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
  } catch (error) {
    console.error('GetStudentGrades error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   GET /api/grades/:id
 * @desc    Получить оценку по ID
 * @access  Authenticated
 */
export const getGradeById = async (req: AuthRequest, res: Response) => {
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
  } catch (error) {
    console.error('GetGradeById error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   PUT /api/grades/:id
 * @desc    Обновить оценку
 * @access  Teacher, Admin
 */
export const updateGrade = async (req: AuthRequest, res: Response) => {
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
  } catch (error) {
    console.error('UpdateGrade error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   DELETE /api/grades/:id
 * @desc    Удалить оценку
 * @access  Admin
 */
export const deleteGrade = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.grade.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Grade deleted successfully',
    });
  } catch (error) {
    console.error('DeleteGrade error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
