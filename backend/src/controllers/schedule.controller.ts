import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';
import { ScheduleDTO } from '../types';

const prisma = new PrismaClient();

/**
 * @route   POST /api/schedule
 * @desc    Создать расписание
 * @access  Admin
 */
export const createSchedule = async (req: AuthRequest, res: Response) => {
  try {
    const {
      groupId,
      subjectId,
      teacherId,
      dayOfWeek,
      startTime,
      endTime,
      room,
      type,
    }: ScheduleDTO = req.body;

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
  } catch (error) {
    console.error('CreateSchedule error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   GET /api/schedule/group/:groupId
 * @desc    Получить расписание группы
 * @access  Authenticated
 */
export const getGroupSchedule = async (req: AuthRequest, res: Response) => {
  try {
    const { groupId } = req.params;
    const { dayOfWeek } = req.query;

    const where: any = { groupId };
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
    const scheduleByDay = schedule.reduce((acc: any, item) => {
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
  } catch (error) {
    console.error('GetGroupSchedule error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   GET /api/schedule/teacher/:teacherId
 * @desc    Получить расписание преподавателя
 * @access  Authenticated
 */
export const getTeacherSchedule = async (req: AuthRequest, res: Response) => {
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
  } catch (error) {
    console.error('GetTeacherSchedule error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   PUT /api/schedule/:id
 * @desc    Обновить расписание
 * @access  Admin
 */
export const updateSchedule = async (req: AuthRequest, res: Response) => {
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
  } catch (error) {
    console.error('UpdateSchedule error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   DELETE /api/schedule/:id
 * @desc    Удалить расписание
 * @access  Admin
 */
export const deleteSchedule = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.schedule.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Schedule deleted successfully',
    });
  } catch (error) {
    console.error('DeleteSchedule error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
