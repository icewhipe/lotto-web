import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';
import { RFIDCardDTO } from '../types';

const prisma = new PrismaClient();

/**
 * @route   POST /api/rfid/cards
 * @desc    Создать RFID карту
 * @access  Admin
 */
export const createRFIDCard = async (req: AuthRequest, res: Response) => {
  try {
    const { cardNumber, userId, isActive, expiryDate }: RFIDCardDTO = req.body;

    // Проверка существующей карты
    const existingCard = await prisma.rFIDCard.findUnique({
      where: { cardNumber },
    });

    if (existingCard) {
      return res.status(400).json({
        success: false,
        message: 'Card with this number already exists',
      });
    }

    // Проверка пользователя
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Создание карты
    const card = await prisma.rFIDCard.create({
      data: {
        cardNumber,
        userId,
        isActive: isActive ?? true,
        expiryDate,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: 'RFID card created successfully',
      data: card,
    });
  } catch (error) {
    console.error('CreateRFIDCard error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   GET /api/rfid/cards
 * @desc    Получить все RFID карты
 * @access  Admin
 */
export const getRFIDCards = async (req: AuthRequest, res: Response) => {
  try {
    const { page = 1, limit = 20, isActive } = req.query;

    const where: any = {};
    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    const cards = await prisma.rFIDCard.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.rFIDCard.count({ where });

    res.json({
      success: true,
      data: {
        cards,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    console.error('GetRFIDCards error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   GET /api/rfid/cards/:id
 * @desc    Получить RFID карту по ID
 * @access  Admin
 */
export const getRFIDCardById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const card = await prisma.rFIDCard.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        accessLogs: {
          take: 10,
          orderBy: { timestamp: 'desc' },
          include: {
            turnstile: true,
          },
        },
      },
    });

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'RFID card not found',
      });
    }

    res.json({
      success: true,
      data: card,
    });
  } catch (error) {
    console.error('GetRFIDCardById error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   PUT /api/rfid/cards/:id
 * @desc    Обновить RFID карту
 * @access  Admin
 */
export const updateRFIDCard = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { isActive, expiryDate } = req.body;

    const card = await prisma.rFIDCard.update({
      where: { id },
      data: {
        isActive,
        expiryDate,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    res.json({
      success: true,
      message: 'RFID card updated successfully',
      data: card,
    });
  } catch (error) {
    console.error('UpdateRFIDCard error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   DELETE /api/rfid/cards/:id
 * @desc    Удалить RFID карту
 * @access  Admin
 */
export const deleteRFIDCard = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.rFIDCard.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'RFID card deleted successfully',
    });
  } catch (error) {
    console.error('DeleteRFIDCard error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   POST /api/rfid/scan
 * @desc    Обработать сканирование RFID карты
 * @access  System (Turnstile)
 */
export const processScan = async (req: AuthRequest, res: Response) => {
  try {
    const { cardNumber, turnstileId, direction } = req.body;

    // Поиск карты
    const card = await prisma.rFIDCard.findUnique({
      where: { cardNumber },
      include: {
        user: {
          include: {
            student: true,
          },
        },
      },
    });

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'RFID card not found',
        status: 'DENIED',
      });
    }

    // Проверка активности карты
    if (!card.isActive) {
      await prisma.accessLog.create({
        data: {
          rfidCardId: card.id,
          turnstileId,
          direction,
          status: 'DENIED',
          reason: 'Card is inactive',
        },
      });

      return res.status(403).json({
        success: false,
        message: 'Card is inactive',
        status: 'DENIED',
      });
    }

    // Проверка срока действия
    if (card.expiryDate && new Date() > card.expiryDate) {
      await prisma.accessLog.create({
        data: {
          rfidCardId: card.id,
          turnstileId,
          direction,
          status: 'DENIED',
          reason: 'Card expired',
        },
      });

      return res.status(403).json({
        success: false,
        message: 'Card has expired',
        status: 'DENIED',
      });
    }

    // Создание лога доступа
    const accessLog = await prisma.accessLog.create({
      data: {
        rfidCardId: card.id,
        turnstileId,
        direction,
        status: 'GRANTED',
      },
    });

    // Если это студент и вход, создать запись посещаемости
    if (card.user.student && direction === 'IN') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const existingAttendance = await prisma.attendance.findFirst({
        where: {
          studentId: card.user.student.id,
          date: {
            gte: today,
          },
        },
      });

      if (!existingAttendance) {
        await prisma.attendance.create({
          data: {
            studentId: card.user.student.id,
            date: new Date(),
            status: 'PRESENT',
          },
        });
      }
    }

    res.json({
      success: true,
      message: 'Access granted',
      status: 'GRANTED',
      data: {
        user: {
          id: card.user.id,
          name: card.user.name,
          role: card.user.role,
        },
        accessLog,
      },
    });
  } catch (error) {
    console.error('ProcessScan error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      status: 'ERROR',
    });
  }
};
