import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

// Create transporter (optional - система работает без email)
let transporter: Transporter | null = null;

try {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransporter({
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
      } else {
        console.log('✅ Email server is ready');
      }
    });
  } else {
    console.warn('⚠️  Email not configured (optional, система работает без него)');
  }
} catch (error) {
  console.warn('⚠️  Email module error (optional):', error);
  transporter = null;
}

/**
 * Отправить email
 */
export const sendEmail = async (options: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) => {
  try {
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
  } catch (error) {
    console.error('❌ Email send error:', error);
    return { success: false, error };
  }
};

/**
 * Отправить приветственное письмо
 */
export const sendWelcomeEmail = async (email: string, name: string) => {
  const html = `
    <h1>Добро пожаловать в ЛПТТ Электронный Дневник!</h1>
    <p>Здравствуйте, ${name}!</p>
    <p>Ваш аккаунт успешно создан.</p>
    <p>Теперь вы можете войти в систему и начать пользоваться всеми возможностями платформы.</p>
    <br>
    <p>С уважением,<br>Команда ЛПТТ</p>
  `;

  return sendEmail({
    to: email,
    subject: 'Добро пожаловать в ЛПТТ!',
    html,
  });
};

/**
 * Отправить уведомление о новой оценке
 */
export const sendGradeNotification = async (
  email: string,
  studentName: string,
  subject: string,
  grade: number
) => {
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

  return sendEmail({
    to: email,
    subject: `Новая оценка по предмету ${subject}`,
    html,
  });
};

/**
 * Отправить напоминание о расписании
 */
export const sendScheduleReminder = async (
  email: string,
  studentName: string,
  schedule: any[]
) => {
  const scheduleHTML = schedule
    .map(
      (lesson) => `
    <li>
      <strong>${lesson.startTime}</strong> - ${lesson.subject} (${lesson.room})
    </li>
  `
    )
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

  return sendEmail({
    to: email,
    subject: 'Расписание на сегодня',
    html,
  });
};

/**
 * Отправить уведомление администратору
 */
export const sendAdminNotification = async (
  subject: string,
  message: string
) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

  return sendEmail({
    to: adminEmail!,
    subject: `[ADMIN] ${subject}`,
    html: `
      <h2>${subject}</h2>
      <p>${message}</p>
      <p><em>Это автоматическое уведомление</em></p>
    `,
  });
};
