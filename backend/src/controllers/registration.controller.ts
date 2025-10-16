import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import prisma from '../config/database';
import bcrypt from 'bcryptjs';
import { sendEmail, sendWelcomeEmail } from '../config/email';

// ============= ПРОВЕРКА КОДА ПРИГЛАШЕНИЯ =============
export const checkInviteCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        error: 'Код приглашения обязателен',
      });
    }

    const invite = await prisma.inviteCode.findUnique({
      where: { code },
      include: {
        group: {
          include: {
            specialty: true,
          },
        },
      },
    });

    if (!invite) {
      return res.status(404).json({
        success: false,
        error: 'Код приглашения не найден',
      });
    }

    if (!invite.isActive) {
      return res.status(400).json({
        success: false,
        error: 'Код приглашения деактивирован',
      });
    }

    if (new Date() > invite.expiresAt) {
      return res.status(400).json({
        success: false,
        error: 'Срок действия кода истёк',
      });
    }

    if (invite.currentUses >= invite.maxUses) {
      return res.status(400).json({
        success: false,
        error: 'Код приглашения уже использован',
      });
    }

    res.json({
      success: true,
      data: {
        groupId: invite.group.id,
        groupName: invite.group.name,
        specialtyName: invite.group.specialty.name,
        specialtyCode: invite.group.specialty.code,
      },
    });
  } catch (error: any) {
    console.error('Check invite code error:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка проверки кода',
    });
  }
};

// ============= РЕГИСТРАЦИЯ С КОДОМ ПРИГЛАШЕНИЯ =============
export const registerWithInvite = async (req: Request, res: Response) => {
  try {
    const { code, name, email, password, phone, birthDate } = req.body;

    // Валидация
    if (!code || !name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Все поля обязательны',
      });
    }

    // Проверяем код приглашения
    const invite = await prisma.inviteCode.findUnique({
      where: { code },
      include: { group: true },
    });

    if (!invite || !invite.isActive || new Date() > invite.expiresAt) {
      return res.status(400).json({
        success: false,
        error: 'Неверный код приглашения',
      });
    }

    // Проверяем, не использован ли код
    if (invite.currentUses >= invite.maxUses) {
      return res.status(400).json({
        success: false,
        error: 'Код уже использован',
      });
    }

    // Проверяем, не существует ли уже пользователь
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Email уже зарегистрирован',
      });
    }

    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаём пользователя и студента в транзакции
    const result = await prisma.$transaction(async (tx) => {
      // Создаём пользователя
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: 'STUDENT',
          isActive: true,
        },
      });

      // Генерируем студенческий номер
      const studentCount = await tx.student.count({
        where: { groupId: invite.groupId },
      });
      const studentNumber = `${invite.group.name}-${String(studentCount + 1).padStart(3, '0')}`;

      // Создаём профиль студента
      const student = await tx.student.create({
        data: {
          userId: user.id,
          groupId: invite.groupId,
          studentNumber,
          enrollmentDate: new Date(),
        },
      });

      // Обновляем код приглашения
      await tx.inviteCode.update({
        where: { id: invite.id },
        data: {
          usedBy: user.id,
          usedAt: new Date(),
          currentUses: invite.currentUses + 1,
          isActive: invite.currentUses + 1 >= invite.maxUses ? false : true,
        },
      });

      return { user, student };
    });

    // Отправляем welcome email
    await sendWelcomeEmail(result.user.email, result.user.name);

    res.json({
      success: true,
      message: 'Регистрация успешна! Проверьте email.',
      data: {
        userId: result.user.id,
        studentNumber: result.student.studentNumber,
      },
    });
  } catch (error: any) {
    console.error('Register with invite error:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка регистрации',
    });
  }
};

// ============= РЕГИСТРАЦИЯ С МОДЕРАЦИЕЙ =============
export const registerPending = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, birthDate, specialtyId, course } = req.body;

    // Валидация
    if (!name || !email || !password || !specialtyId) {
      return res.status(400).json({
        success: false,
        error: 'Все поля обязательны',
      });
    }

    // Проверяем существующего пользователя
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Email уже зарегистрирован',
      });
    }

    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаём заявку
    const request = await prisma.registrationRequest.create({
      data: {
        name,
        email,
        phone: phone || '',
        birthDate: new Date(birthDate),
        password: hashedPassword,
        specialtyId,
        course: parseInt(course),
        status: 'PENDING',
      },
      include: {
        specialty: true,
      },
    });

    // Уведомляем админов
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@lptt.ru',
      subject: 'Новая заявка на регистрацию',
      html: `
        <h2>Новая заявка на регистрацию</h2>
        <p><strong>ФИО:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Специальность:</strong> ${request.specialty.name}</p>
        <p><strong>Курс:</strong> ${course}</p>
        <p><a href="${process.env.FRONTEND_URL}/admin/registrations">Перейти в админ панель</a></p>
      `,
    });

    res.json({
      success: true,
      message: 'Заявка отправлена на проверку. Ожидайте письмо на email.',
    });
  } catch (error: any) {
    console.error('Register pending error:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка отправки заявки',
    });
  }
};

// ============= ПОЛУЧИТЬ ВСЕ ЗАЯВКИ (admin) =============
export const getRegistrationRequests = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;

    const requests = await prisma.registrationRequest.findMany({
      where: status ? { status: status as any } : {},
      include: {
        specialty: true,
        assignedGroup: true,
        reviewer: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: { requests },
    });
  } catch (error: any) {
    console.error('Get registration requests error:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка загрузки заявок',
    });
  }
};

// ============= УТВЕРДИТЬ ЗАЯВКУ (admin) =============
export const approveRegistration = async (req: AuthRequest, res: Response) => {
  try {
    const { requestId } = req.params;
    const { groupId } = req.body;
    const adminId = (req.user as any)?.id || req.user!.userId;

    if (!groupId) {
      return res.status(400).json({
        success: false,
        error: 'Необходимо указать группу',
      });
    }

    // Находим заявку
    const request = await prisma.registrationRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Заявка не найдена',
      });
    }

    if (request.status !== 'PENDING') {
      return res.status(400).json({
        success: false,
        error: 'Заявка уже обработана',
      });
    }

    // Создаём пользователя и студента в транзакции
    const result = await prisma.$transaction(async (tx) => {
      // Создаём пользователя
      const user = await tx.user.create({
        data: {
          email: request.email,
          password: request.password, // Уже хэширован
          name: request.name,
          role: 'STUDENT',
          isActive: true,
        },
      });

      // Получаем группу для генерации номера
      const group = await tx.group.findUnique({ where: { id: groupId } });
      const studentCount = await tx.student.count({ where: { groupId } });
      const studentNumber = `${group!.name}-${String(studentCount + 1).padStart(3, '0')}`;

      // Создаём профиль студента
      const student = await tx.student.create({
        data: {
          userId: user.id,
          groupId,
          studentNumber,
          enrollmentDate: new Date(),
        },
      });

      // Обновляем заявку
      await tx.registrationRequest.update({
        where: { id: requestId },
        data: {
          status: 'APPROVED',
          reviewedBy: adminId,
          reviewedAt: new Date(),
          assignedGroupId: groupId,
          createdUserId: user.id,
        },
      });

      return { user, student };
    });

    // Отправляем email
    await sendEmail({
      to: result.user.email,
      subject: 'Регистрация одобрена - ЛПТТ',
      html: `
        <h2>Ваша регистрация одобрена!</h2>
        <p>Здравствуйте, ${result.user.name}!</p>
        <p>Ваша заявка на регистрацию в электронном дневнике ЛПТТ одобрена.</p>
        <p><strong>Ваши данные:</strong></p>
        <ul>
          <li>Email: ${result.user.email}</li>
          <li>Студенческий номер: ${result.student.studentNumber}</li>
        </ul>
        <p><a href="${process.env.FRONTEND_URL}/login">Войти в систему</a></p>
        <p>С уважением,<br>Администрация ЛПТТ</p>
      `,
    });

    res.json({
      success: true,
      message: 'Заявка одобрена',
      data: {
        userId: result.user.id,
        studentNumber: result.student.studentNumber,
      },
    });
  } catch (error: any) {
    console.error('Approve registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка одобрения заявки',
    });
  }
};

// ============= ОТКЛОНИТЬ ЗАЯВКУ (admin) =============
export const rejectRegistration = async (req: AuthRequest, res: Response) => {
  try {
    const { requestId } = req.params;
    const { reason } = req.body;
    const adminId = (req.user as any)?.id || req.user!.userId;

    const request = await prisma.registrationRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Заявка не найдена',
      });
    }

    if (request.status !== 'PENDING') {
      return res.status(400).json({
        success: false,
        error: 'Заявка уже обработана',
      });
    }

    // Обновляем заявку
    await prisma.registrationRequest.update({
      where: { id: requestId },
      data: {
        status: 'REJECTED',
        reviewedBy: adminId,
        reviewedAt: new Date(),
        rejectReason: reason || 'Не указано',
      },
    });

    // Отправляем email
    await sendEmail({
      to: request.email,
      subject: 'Заявка на регистрацию отклонена - ЛПТТ',
      html: `
        <h2>Ваша заявка отклонена</h2>
        <p>Здравствуйте, ${request.name}!</p>
        <p>К сожалению, ваша заявка на регистрацию была отклонена.</p>
        ${reason ? `<p><strong>Причина:</strong> ${reason}</p>` : ''}
        <p>Для уточнения деталей свяжитесь с администрацией: support@lptt.ru</p>
        <p>С уважением,<br>Администрация ЛПТТ</p>
      `,
    });

    res.json({
      success: true,
      message: 'Заявка отклонена',
    });
  } catch (error: any) {
    console.error('Reject registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка отклонения заявки',
    });
  }
};

// ============= ГЕНЕРАЦИЯ КОДОВ ПРИГЛАШЕНИЯ (admin) =============
export const generateInviteCodes = async (req: AuthRequest, res: Response) => {
  try {
    const { groupId, count, expiresInDays } = req.body;
    const adminId = (req.user as any)?.id || req.user!.userId;

    if (!groupId || !count) {
      return res.status(400).json({
        success: false,
        error: 'GroupId и count обязательны',
      });
    }

    const group = await prisma.group.findUnique({ where: { id: groupId } });
    if (!group) {
      return res.status(404).json({
        success: false,
        error: 'Группа не найдена',
      });
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (expiresInDays || 30));

    const codes = [];
    for (let i = 0; i < count; i++) {
      const code = `LPTT-${group.name}-${new Date().getFullYear()}-${String(i + 1).padStart(3, '0')}`;
      
      codes.push({
        code,
        groupId,
        createdBy: adminId,
        expiresAt,
      });
    }

    // Создаём коды
    await prisma.inviteCode.createMany({
      data: codes,
    });

    res.json({
      success: true,
      message: `Сгенерировано ${count} кодов`,
      data: { codes: codes.map(c => c.code) },
    });
  } catch (error: any) {
    console.error('Generate invite codes error:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка генерации кодов',
    });
  }
};

// ============= ПОЛУЧИТЬ ВСЕ КОДЫ ПРИГЛАШЕНИЯ (admin) =============
export const getInviteCodes = async (req: Request, res: Response) => {
  try {
    const { groupId, isActive } = req.query;

    const codes = await prisma.inviteCode.findMany({
      where: {
        ...(groupId && { groupId: groupId as string }),
        ...(isActive !== undefined && { isActive: isActive === 'true' }),
      },
      include: {
        group: {
          include: {
            specialty: true,
          },
        },
        usedByUser: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: { codes },
    });
  } catch (error: any) {
    console.error('Get invite codes error:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка загрузки кодов',
    });
  }
};
