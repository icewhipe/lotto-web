import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

interface AttendanceDTO {
  studentId: string;
  date: Date;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  reason?: string;
}

/**
 * @route   POST /api/attendance
 * @desc    Создать запись посещаемости
 * @access  Teacher, Admin
 */
export const createAttendance = async (req: AuthRequest, res: Response) => {
  try {
    const { studentId, date, status, reason }: AttendanceDTO = req.body;

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
  } catch (error) {
    console.error('CreateAttendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   GET /api/attendance/student/:studentId
 * @desc    Получить посещаемость студента
 * @access  Student, Teacher, Parent, Admin
 */
export const getStudentAttendance = async (req: AuthRequest, res: Response) => {
  try {
    const { studentId } = req.params;
    const { startDate, endDate, status } = req.query;

    const where: any = { studentId };

    if (status) {
      where.status = status;
    }

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate as string);
      if (endDate) where.date.lte = new Date(endDate as string);
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
  } catch (error) {
    console.error('GetStudentAttendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   GET /api/attendance/group/:groupId
 * @desc    Получить посещаемость группы
 * @access  Teacher, Admin
 */
export const getGroupAttendance = async (req: AuthRequest, res: Response) => {
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
            date: new Date(date as string),
          },
        } : undefined,
      },
    });

    res.json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.error('GetGroupAttendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   PUT /api/attendance/:id
 * @desc    Обновить запись посещаемости
 * @access  Teacher, Admin
 */
export const updateAttendance = async (req: AuthRequest, res: Response) => {
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
  } catch (error) {
    console.error('UpdateAttendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   DELETE /api/attendance/:id
 * @desc    Удалить запись посещаемости
 * @access  Admin
 */
export const deleteAttendance = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.attendance.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Attendance record deleted successfully',
    });
  } catch (error) {
    console.error('DeleteAttendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
