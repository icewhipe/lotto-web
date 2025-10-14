"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAdminNotification = exports.sendScheduleReminder = exports.sendGradeNotification = exports.sendWelcomeEmail = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Create transporter (optional - система работает без email)
let transporter = null;
try {
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        // Verify connection
        transporter.verify((error, success) => {
            if (error) {
                console.warn('⚠️  Email configuration error (optional):', error.message);
                transporter = null;
            }
            else {
                console.log('✅ Email server is ready');
            }
        });
    }
    else {
        console.warn('⚠️  Email not configured (optional, система работает без него)');
    }
}
catch (error) {
    console.warn('⚠️  Email module error (optional):', error);
    transporter = null;
}
/**
 * Отправить email
 */
const sendEmail = async (options) => {
    try {
        if (!transporter) {
            console.warn('⚠️  Email transporter not available');
            return { success: false, error: 'Email not configured' };
        }
        const mailOptions = {
            from: `"ЛПТТ Дневник" <${process.env.SMTP_USER}>`,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('📧 Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    }
    catch (error) {
        console.error('❌ Email send error:', error);
        return { success: false, error };
    }
};
exports.sendEmail = sendEmail;
/**
 * Отправить приветственное письмо
 */
const sendWelcomeEmail = async (email, name) => {
    const html = `
    <h1>Добро пожаловать в ЛПТТ Электронный Дневник!</h1>
    <p>Здравствуйте, ${name}!</p>
    <p>Ваш аккаунт успешно создан.</p>
    <p>Теперь вы можете войти в систему и начать пользоваться всеми возможностями платформы.</p>
    <br>
    <p>С уважением,<br>Команда ЛПТТ</p>
  `;
    return (0, exports.sendEmail)({
        to: email,
        subject: 'Добро пожаловать в ЛПТТ!',
        html,
    });
};
exports.sendWelcomeEmail = sendWelcomeEmail;
/**
 * Отправить уведомление о новой оценке
 */
const sendGradeNotification = async (email, studentName, subject, grade) => {
    const html = `
    <h2>Новая оценка</h2>
    <p>Здравствуйте, ${studentName}!</p>
    <p>Вам выставлена оценка:</p>
    <ul>
      <li><strong>Предмет:</strong> ${subject}</li>
      <li><strong>Оценка:</strong> ${grade}</li>
    </ul>
    <p>Вы можете посмотреть подробности в электронном дневнике.</p>
  `;
    return (0, exports.sendEmail)({
        to: email,
        subject: `Новая оценка по предмету ${subject}`,
        html,
    });
};
exports.sendGradeNotification = sendGradeNotification;
/**
 * Отправить напоминание о расписании
 */
const sendScheduleReminder = async (email, studentName, schedule) => {
    const scheduleHTML = schedule
        .map((lesson) => `
    <li>
      <strong>${lesson.startTime}</strong> - ${lesson.subject} (${lesson.room})
    </li>
  `)
        .join('');
    const html = `
    <h2>Расписание на сегодня</h2>
    <p>Здравствуйте, ${studentName}!</p>
    <p>Ваше расписание на сегодня:</p>
    <ul>
      ${scheduleHTML}
    </ul>
    <p>Хорошего дня!</p>
  `;
    return (0, exports.sendEmail)({
        to: email,
        subject: 'Расписание на сегодня',
        html,
    });
};
exports.sendScheduleReminder = sendScheduleReminder;
/**
 * Отправить уведомление администратору
 */
const sendAdminNotification = async (subject, message) => {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
    return (0, exports.sendEmail)({
        to: adminEmail,
        subject: `[ADMIN] ${subject}`,
        html: `
      <h2>${subject}</h2>
      <p>${message}</p>
      <p><em>Это автоматическое уведомление</em></p>
    `,
    });
};
exports.sendAdminNotification = sendAdminNotification;
//# sourceMappingURL=email.js.map