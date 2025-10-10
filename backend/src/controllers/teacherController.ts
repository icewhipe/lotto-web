import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const teacher = await prisma.teacher.findFirst({
      where: { userId },
    });

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    // Get teacher's groups
    const schedules = await prisma.schedule.findMany({
      where: { teacherId: teacher.id },
      include: {
        group: true,
        subject: true,
      },
      distinct: ['groupId'],
    });

    const groups = schedules.map(s => ({
      id: s.group.id,
      name: s.group.name,
      subject: s.subject.name,
    }));

    // Get today's lessons
    const today = new Date().getDay();
    const todayLessons = await prisma.schedule.findMany({
      where: {
        teacherId: teacher.id,
        dayOfWeek: today,
      },
      include: {
        group: true,
        subject: true,
      },
      orderBy: { startTime: 'asc' },
    });

    res.json({
      success: true,
      data: {
        teacher: {
          name: teacher.user.name,
          subject: teacher.subject,
        },
        stats: {
          groups: groups.length,
          students: 0, // TODO: count students
          lessonsPerWeek: 0, // TODO: count lessons
        },
        todayLessons: todayLessons.map(l => ({
          time: `${l.startTime}-${l.endTime}`,
          group: l.group.name,
          subject: l.subject.name,
          room: l.room,
        })),
        myGroups: groups,
      },
    });
  } catch (error) {
    console.error('GetTeacherDashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getGroups = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const teacher = await prisma.teacher.findFirst({
      where: { userId },
    });

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    const schedules = await prisma.schedule.findMany({
      where: { teacherId: teacher.id },
      include: {
        group: {
          include: {
            students: true,
          },
        },
        subject: true,
      },
      distinct: ['groupId'],
    });

    const groups = schedules.map(s => ({
      id: s.group.id,
      name: s.group.name,
      subject: s.subject.name,
      studentsCount: s.group.students.length,
    }));

    res.json({
      success: true,
      data: groups,
    });
  } catch (error) {
    console.error('GetGroups error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const setGrade = async (req: AuthRequest, res: Response) => {
  try {
    const { studentId, subjectId, value, type, comment } = req.body;
    const userId = req.user!.id;

    const teacher = await prisma.teacher.findFirst({
      where: { userId },
    });

    if (!teacher) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const grade = await prisma.grade.create({
      data: {
        studentId,
        subjectId,
        teacherId: teacher.id,
        value,
        type,
        comment,
        date: new Date(),
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

    res.status(201).json({
      success: true,
      data: {
        id: grade.id,
        student: grade.student.user.name,
        subject: grade.subject.name,
        value: grade.value,
        type: grade.type,
        date: grade.date,
      },
    });
  } catch (error) {
    console.error('SetGrade error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
