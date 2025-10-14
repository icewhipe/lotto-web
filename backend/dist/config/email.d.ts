/**
 * Отправить email
 */
export declare const sendEmail: (options: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}) => Promise<{
    success: boolean;
    messageId: any;
    error?: undefined;
} | {
    success: boolean;
    error: unknown;
    messageId?: undefined;
}>;
/**
 * Отправить приветственное письмо
 */
export declare const sendWelcomeEmail: (email: string, name: string) => Promise<{
    success: boolean;
    messageId: any;
    error?: undefined;
} | {
    success: boolean;
    error: unknown;
    messageId?: undefined;
}>;
/**
 * Отправить уведомление о новой оценке
 */
export declare const sendGradeNotification: (email: string, studentName: string, subject: string, grade: number) => Promise<{
    success: boolean;
    messageId: any;
    error?: undefined;
} | {
    success: boolean;
    error: unknown;
    messageId?: undefined;
}>;
/**
 * Отправить напоминание о расписании
 */
export declare const sendScheduleReminder: (email: string, studentName: string, schedule: any[]) => Promise<{
    success: boolean;
    messageId: any;
    error?: undefined;
} | {
    success: boolean;
    error: unknown;
    messageId?: undefined;
}>;
/**
 * Отправить уведомление администратору
 */
export declare const sendAdminNotification: (subject: string, message: string) => Promise<{
    success: boolean;
    messageId: any;
    error?: undefined;
} | {
    success: boolean;
    error: unknown;
    messageId?: undefined;
}>;
//# sourceMappingURL=email.d.ts.map