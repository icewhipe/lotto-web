import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    // Get student info
    const student = await prisma.student.findFirst({
      where: { userId },
      include: {
        group: {
          include: {
            specialty: true,
          },
        },
      },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Get grades
    const grades = await prisma.grade.findMany({
      where: { studentId: student.id },
      include: {
        subject: true,
      },
      orderBy: { date: 'desc' },
      take: 10,
    });

    // Calculate average grade
    const avgGrade = grades.length > 0
      ? grades.reduce((sum, g) => sum + g.value, 0) / grades.length
      : 0;

    // Get attendance
    const attendance = await prisma.attendance.findMany({
      where: { studentId: student.id },
    });

    const attendanceRate = attendance.length > 0
      ? (attendance.filter(a => a.status === 'present').length / attendance.length) * 100
      : 0;

    // Get today's schedule
    const today = new Date().getDay();
    const schedule = await prisma.schedule.findMany({
      where: {
        groupId: student.groupId,
        dayOfWeek: today,
      },
      include: {
        subject: true,
        teacher: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { startTime: 'asc' },
    });

    res.json({
      success: true,
      data: {
        student: {
          name: student.user.name,
          group: student.group.name,
          specialty: student.group.specialty.name,
        },
        stats: {
          avgGrade: Math.round(avgGrade * 10) / 10,
          attendance: Math.round(attendanceRate),
          assignmentsActive: 3, // TODO: implement assignments
        },
        recentGrades: grades.slice(0, 3).map(g => ({
          subject: g.subject.name,
          value: g.value,
          date: g.date,
          type: g.type,
        })),
        todaySchedule: schedule.map(s => ({
          time: s.startTime,
          subject: s.subject.name,
          teacher: s.teacher.user.name,
          room: s.room,
          type: s.type,
        })),
      },
    });
  } catch (error) {
    console.error('GetDashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getGrades = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const student = await prisma.student.findFirst({
      where: { userId },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const grades = await prisma.grade.findMany({
      where: { studentId: student.id },
      include: {
        subject: true,
        teacher: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });

    // Group by subject
    const gradesBySubject = grades.reduce((acc: any, grade) => {
      const subjectId = grade.subjectId;
      if (!acc[subjectId]) {
        acc[subjectId] = {
          subject: grade.subject.name,
          teacher: grade.teacher.user.name,
          grades: [],
          average: 0,
        };
      }
      acc[subjectId].grades.push({
        value: grade.value,
        type: grade.type,
        date: grade.date,
        comment: grade.comment,
      });
      return acc;
    }, {});

    // Calculate averages
    Object.keys(gradesBySubject).forEach(subjectId => {
      const subject = gradesBySubject[subjectId];
      const sum = subject.grades.reduce((s: number, g: any) => s + g.value, 0);
      subject.average = Math.round((sum / subject.grades.length) * 10) / 10;
    });

    res.json({
      success: true,
      data: {
        subjects: Object.values(gradesBySubject),
        totalAverage: grades.length > 0
          ? Math.round((grades.reduce((s, g) => s + g.value, 0) / grades.length) * 10) / 10
          : 0,
      },
    });
  } catch (error) {
    console.error('GetGrades error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSchedule = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const student = await prisma.student.findFirst({
      where: { userId },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const schedule = await prisma.schedule.findMany({
      where: { groupId: student.groupId },
      include: {
        subject: true,
        teacher: {
          include: {
            user: true,
          },
        },
      },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });

    // Group by day
    const scheduleByDay = schedule.reduce((acc: any, lesson) => {
      const day = lesson.dayOfWeek;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push({
        time: `${lesson.startTime}-${lesson.endTime}`,
        subject: lesson.subject.name,
        teacher: lesson.teacher.user.name,
        room: lesson.room,
        type: lesson.type,
      });
      return acc;
    }, {});

    res.json({
      success: true,
      data: scheduleByDay,
    });
  } catch (error) {
    console.error('GetSchedule error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAttendance = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const student = await prisma.student.findFirst({
      where: { userId },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const attendance = await prisma.attendance.findMany({
      where: { studentId: student.id },
      include: {
        schedule: {
          include: {
            subject: true,
          },
        },
      },
      orderBy: { date: 'desc' },
      take: 30,
    });

    const stats = {
      total: attendance.length,
      present: attendance.filter(a => a.status === 'present').length,
      absent: attendance.filter(a => a.status === 'absent').length,
      late: attendance.filter(a => a.status === 'late').length,
      excused: attendance.filter(a => a.status === 'excused').length,
    };

    res.json({
      success: true,
      data: {
        stats,
        percentage: stats.total > 0 
          ? Math.round((stats.present / stats.total) * 100)
          : 0,
        records: attendance.map(a => ({
          date: a.date,
          subject: a.schedule.subject.name,
          status: a.status,
          reason: a.reason,
        })),
      },
    });
  } catch (error) {
    console.error('GetAttendance error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
