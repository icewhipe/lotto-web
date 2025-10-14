import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * @route   GET /api/admin/users
 * @desc    Получить всех пользователей
 * @access  Admin
 */
export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const { role, search } = req.query;

    const where: any = {};
    if (role) where.role = role;
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        student: {
          include: {
            group: true,
          },
        },
        teacher: true,
        parent: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error('GetAllUsers error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   POST /api/admin/user
 * @desc    Создать пользователя
 * @access  Admin
 */
export const createUser = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, name, role, groupId } = req.body;

    // Проверка существования
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    });

    // Создать связанную запись в зависимости от роли
    if (role === 'STUDENT' && groupId) {
      await prisma.student.create({
        data: {
          userId: user.id,
          groupId,
          studentNumber: `ST-${Date.now()}`,
          enrollmentDate: new Date(),
        },
      });
    } else if (role === 'TEACHER') {
      await prisma.teacher.create({
        data: {
          userId: user.id,
          position: 'Преподаватель',
          department: 'Общий',
        },
      });
    } else if (role === 'PARENT') {
      await prisma.parent.create({
        data: {
          userId: user.id,
          childrenIds: [],
        },
      });
    }

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    });
  } catch (error) {
    console.error('CreateUser error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   DELETE /api/admin/user/:id
 * @desc    Удалить пользователя
 * @access  Admin
 */
export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('DeleteUser error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   GET /api/admin/groups
 * @desc    Получить все группы
 * @access  Admin
 */
export const getAllGroups = async (req: AuthRequest, res: Response) => {
  try {
    const groups = await prisma.group.findMany({
      include: {
        specialty: true,
        students: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            students: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    res.json({
      success: true,
      data: groups,
    });
  } catch (error) {
    console.error('GetAllGroups error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   POST /api/admin/group
 * @desc    Создать группу
 * @access  Admin
 */
export const createGroup = async (req: AuthRequest, res: Response) => {
  try {
    const { name, year, specialtyId } = req.body;

    const group = await prisma.group.create({
      data: {
        name,
        year,
        specialtyId,
      },
      include: {
        specialty: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Group created successfully',
      data: group,
    });
  } catch (error) {
    console.error('CreateGroup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   GET /api/admin/subjects
 * @desc    Получить все предметы
 * @access  Admin
 */
export const getAllSubjects = async (req: AuthRequest, res: Response) => {
  try {
    const subjects = await prisma.subject.findMany({
      include: {
        specialty: true,
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
      orderBy: { name: 'asc' },
    });

    res.json({
      success: true,
      data: subjects,
    });
  } catch (error) {
    console.error('GetAllSubjects error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   POST /api/admin/subject
 * @desc    Создать предмет
 * @access  Admin
 */
export const createSubject = async (req: AuthRequest, res: Response) => {
  try {
    const { name, code, specialtyId, teacherId } = req.body;

    const subject = await prisma.subject.create({
      data: {
        name,
        code,
        specialtyId,
        teacherId,
      },
      include: {
        specialty: true,
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
      message: 'Subject created successfully',
      data: subject,
    });
  } catch (error) {
    console.error('CreateSubject error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * @route   GET /api/admin/stats
 * @desc    Получить общую статистику
 * @access  Admin
 */
export const getStats = async (req: AuthRequest, res: Response) => {
  try {
    const [
      totalUsers,
      totalStudents,
      totalTeachers,
      totalGroups,
      totalSubjects,
      totalGrades,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.student.count(),
      prisma.teacher.count(),
      prisma.group.count(),
      prisma.subject.count(),
      prisma.grade.count(),
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalStudents,
        totalTeachers,
        totalGroups,
        totalSubjects,
        totalGrades,
      },
    });
  } catch (error) {
    console.error('GetStats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
