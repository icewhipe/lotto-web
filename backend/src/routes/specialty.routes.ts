import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

// @route   GET /api/specialties
router.get('/', async (req, res) => {
  try {
    const specialties = await prisma.specialty.findMany({
      include: {
        _count: {
          select: {
            groups: true,
            subjects: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: specialties,
    });
  } catch (error: any) {
    console.error('Error fetching specialties:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения специальностей',
    });
  }
});

// @route   POST /api/specialties
router.post('/', authenticate, authorize('ADMIN'), async (req, res) => {
  try {
    const { name, code, duration, description } = req.body;

    const specialty = await prisma.specialty.create({
      data: {
        name,
        code,
        duration,
        description,
      },
    });

    res.json({
      success: true,
      data: specialty,
    });
  } catch (error: any) {
    console.error('Error creating specialty:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка создания специальности',
    });
  }
});

export default router;
