import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';
import { TurnstileDTO } from '../types';

const prisma = new PrismaClient();

/**
 * @route   POST /api/turnstiles
 * @desc    Создать турникет
 * @access  Admin
 */
export const createTurnstile = async (req: AuthRequest, res: Response) => {
  try {
    const { name, location, deviceId, ipAddress, direction }: TurnstileDTO = req.body;

    // Проверка существующего турникета
    const existingTurnstile = await prisma.turnstile.findUnique({
      where: { deviceId },
    });

    if (existingTurnstile) {
      return res.status(400).json({
        success: false,
        message: 'Turnstile with this device ID already exists',
      });
    }

    // Создание турникета
    const turnstile = await prisma.turnstile.create({
      data: {
        name,
        location,
        deviceId,
        ipAddress,
        direction,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Turnstile created successfully',
      data: turnstile,
    });
  } catch (error) {
    console.error('CreateTurnstile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   GET /api/turnstiles
 * @desc    Получить все турникеты
 * @access  Admin
 */
export const getTurnstiles = async (req: AuthRequest, res: Response) => {
  try {
    const { isActive } = req.query;

    const where: any = {};
    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    const turnstiles = await prisma.turnstile.findMany({
      where,
      orderBy: { name: 'asc' },
    });

    // Получить статистику по каждому турникету
    const turnstilesWithStats = await Promise.all(
      turnstiles.map(async (turnstile) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayLogs = await prisma.accessLog.count({
          where: {
            turnstileId: turnstile.id,
            timestamp: {
              gte: today,
            },
          },
        });

        const lastActivity = await prisma.accessLog.findFirst({
          where: { turnstileId: turnstile.id },
          orderBy: { timestamp: 'desc' },
        });

        return {
          ...turnstile,
          stats: {
            todayAccess: todayLogs,
            lastActivity: lastActivity?.timestamp,
          },
        };
      })
    );

    res.json({
      success: true,
      data: turnstilesWithStats,
    });
  } catch (error) {
    console.error('GetTurnstiles error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   GET /api/turnstiles/:id
 * @desc    Получить турникет по ID
 * @access  Admin
 */
export const getTurnstileById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const turnstile = await prisma.turnstile.findUnique({
      where: { id },
    });

    if (!turnstile) {
      return res.status(404).json({
        success: false,
        message: 'Turnstile not found',
      });
    }

    // Статистика за последние 7 дней
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentLogs = await prisma.accessLog.findMany({
      where: {
        turnstileId: id,
        timestamp: {
          gte: sevenDaysAgo,
        },
      },
      include: {
        rfidCard: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                role: true,
              },
            },
          },
        },
      },
      orderBy: { timestamp: 'desc' },
      take: 50,
    });

    res.json({
      success: true,
      data: {
        turnstile,
        recentLogs,
      },
    });
  } catch (error) {
    console.error('GetTurnstileById error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   PUT /api/turnstiles/:id
 * @desc    Обновить турникет
 * @access  Admin
 */
export const updateTurnstile = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, location, ipAddress, isActive, direction } = req.body;

    const turnstile = await prisma.turnstile.update({
      where: { id },
      data: {
        name,
        location,
        ipAddress,
        isActive,
        direction,
      },
    });

    res.json({
      success: true,
      message: 'Turnstile updated successfully',
      data: turnstile,
    });
  } catch (error) {
    console.error('UpdateTurnstile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   DELETE /api/turnstiles/:id
 * @desc    Удалить турникет
 * @access  Admin
 */
export const deleteTurnstile = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.turnstile.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Turnstile deleted successfully',
    });
  } catch (error) {
    console.error('DeleteTurnstile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   GET /api/turnstiles/:id/logs
 * @desc    Получить логи турникета
 * @access  Admin
 */
export const getTurnstileLogs = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 50, startDate, endDate, status } = req.query;

    const where: any = {
      turnstileId: id,
    };

    if (startDate || endDate) {
      where.timestamp = {};
      if (startDate) where.timestamp.gte = new Date(startDate as string);
      if (endDate) where.timestamp.lte = new Date(endDate as string);
    }

    if (status) {
      where.status = status;
    }

    const logs = await prisma.accessLog.findMany({
      where,
      include: {
        rfidCard: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                role: true,
              },
            },
          },
        },
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { timestamp: 'desc' },
    });

    const total = await prisma.accessLog.count({ where });

    res.json({
      success: true,
      data: {
        logs,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    console.error('GetTurnstileLogs error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   GET /api/turnstiles/:id/stats
 * @desc    Получить статистику турникета
 * @access  Admin
 */
export const getTurnstileStats = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { period = '7d' } = req.query;

    let startDate = new Date();
    switch (period) {
      case '1d':
        startDate.setDate(startDate.getDate() - 1);
        break;
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
    }

    const logs = await prisma.accessLog.findMany({
      where: {
        turnstileId: id,
        timestamp: {
          gte: startDate,
        },
      },
    });

    const stats = {
      total: logs.length,
      granted: logs.filter((l) => l.status === 'GRANTED').length,
      denied: logs.filter((l) => l.status === 'DENIED').length,
      error: logs.filter((l) => l.status === 'ERROR').length,
      in: logs.filter((l) => l.direction === 'IN').length,
      out: logs.filter((l) => l.direction === 'OUT').length,
    };

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('GetTurnstileStats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
