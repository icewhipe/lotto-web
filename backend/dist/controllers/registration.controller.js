"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInviteCodes = exports.generateInviteCodes = exports.rejectRegistration = exports.approveRegistration = exports.getRegistrationRequests = exports.registerPending = exports.registerWithInvite = exports.checkInviteCode = void 0;
const database_1 = __importDefault(require("../config/database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const email_1 = require("../config/email");
// ============= ПРОВЕРКА КОДА ПРИГЛАШЕНИЯ =============
const checkInviteCode = async (req, res) => {
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({
                success: false,
                error: 'Код приглашения обязателен',
            });
        }
        const invite = await database_1.default.inviteCode.findUnique({
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
    }
    catch (error) {
        console.error('Check invite code error:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка проверки кода',
        });
    }
};
exports.checkInviteCode = checkInviteCode;
// ============= РЕГИСТРАЦИЯ С КОДОМ ПРИГЛАШЕНИЯ =============
const registerWithInvite = async (req, res) => {
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
        const invite = await database_1.default.inviteCode.findUnique({
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
        const existingUser = await database_1.default.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: 'Email уже зарегистрирован',
            });
        }
        // Хэшируем пароль
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Создаём пользователя и студента в транзакции
        const result = await database_1.default.$transaction(async (tx) => {
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
        await (0, email_1.sendWelcomeEmail)(result.user.email, result.user.name);
        res.json({
            success: true,
            message: 'Регистрация успешна! Проверьте email.',
            data: {
                userId: result.user.id,
                studentNumber: result.student.studentNumber,
            },
        });
    }
    catch (error) {
        console.error('Register with invite error:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка регистрации',
        });
    }
};
exports.registerWithInvite = registerWithInvite;
// ============= РЕГИСТРАЦИЯ С МОДЕРАЦИЕЙ =============
const registerPending = async (req, res) => {
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
        const existingUser = await database_1.default.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: 'Email уже зарегистрирован',
            });
        }
        // Хэшируем пароль
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Создаём заявку
        const request = await database_1.default.registrationRequest.create({
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
        await (0, email_1.sendEmail)({
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
    }
    catch (error) {
        console.error('Register pending error:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка отправки заявки',
        });
    }
};
exports.registerPending = registerPending;
// ============= ПОЛУЧИТЬ ВСЕ ЗАЯВКИ (admin) =============
const getRegistrationRequests = async (req, res) => {
    try {
        const { status } = req.query;
        const requests = await database_1.default.registrationRequest.findMany({
            where: status ? { status: status } : {},
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
    }
    catch (error) {
        console.error('Get registration requests error:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка загрузки заявок',
        });
    }
};
exports.getRegistrationRequests = getRegistrationRequests;
// ============= УТВЕРДИТЬ ЗАЯВКУ (admin) =============
const approveRegistration = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { groupId } = req.body;
        const adminId = req.user?.id || req.user.userId;
        if (!groupId) {
            return res.status(400).json({
                success: false,
                error: 'Необходимо указать группу',
            });
        }
        // Находим заявку
        const request = await database_1.default.registrationRequest.findUnique({
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
        const result = await database_1.default.$transaction(async (tx) => {
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
            const studentNumber = `${group.name}-${String(studentCount + 1).padStart(3, '0')}`;
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
        await (0, email_1.sendEmail)({
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
    }
    catch (error) {
        console.error('Approve registration error:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка одобрения заявки',
        });
    }
};
exports.approveRegistration = approveRegistration;
// ============= ОТКЛОНИТЬ ЗАЯВКУ (admin) =============
const rejectRegistration = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { reason } = req.body;
        const adminId = req.user?.id || req.user.userId;
        const request = await database_1.default.registrationRequest.findUnique({
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
        await database_1.default.registrationRequest.update({
            where: { id: requestId },
            data: {
                status: 'REJECTED',
                reviewedBy: adminId,
                reviewedAt: new Date(),
                rejectReason: reason || 'Не указано',
            },
        });
        // Отправляем email
        await (0, email_1.sendEmail)({
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
    }
    catch (error) {
        console.error('Reject registration error:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка отклонения заявки',
        });
    }
};
exports.rejectRegistration = rejectRegistration;
// ============= ГЕНЕРАЦИЯ КОДОВ ПРИГЛАШЕНИЯ (admin) =============
const generateInviteCodes = async (req, res) => {
    try {
        const { groupId, count, expiresInDays } = req.body;
        const adminId = req.user?.id || req.user.userId;
        if (!groupId || !count) {
            return res.status(400).json({
                success: false,
                error: 'GroupId и count обязательны',
            });
        }
        const group = await database_1.default.group.findUnique({ where: { id: groupId } });
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
        await database_1.default.inviteCode.createMany({
            data: codes,
        });
        res.json({
            success: true,
            message: `Сгенерировано ${count} кодов`,
            data: { codes: codes.map(c => c.code) },
        });
    }
    catch (error) {
        console.error('Generate invite codes error:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка генерации кодов',
        });
    }
};
exports.generateInviteCodes = generateInviteCodes;
// ============= ПОЛУЧИТЬ ВСЕ КОДЫ ПРИГЛАШЕНИЯ (admin) =============
const getInviteCodes = async (req, res) => {
    try {
        const { groupId, isActive } = req.query;
        const codes = await database_1.default.inviteCode.findMany({
            where: {
                ...(groupId && { groupId: groupId }),
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
    }
    catch (error) {
        console.error('Get invite codes error:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка загрузки кодов',
        });
    }
};
exports.getInviteCodes = getInviteCodes;
//# sourceMappingURL=registration.controller.js.map