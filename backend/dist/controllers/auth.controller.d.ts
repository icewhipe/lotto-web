import { Request, Response } from 'express';
/**
 * Регистрация нового пользователя
 */
export declare const register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Вход пользователя
 */
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Получение текущего пользователя
 */
export declare const getMe: (req: any, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Обновление профиля
 */
export declare const updateProfile: (req: any, res: Response) => Promise<void>;
/**
 * Изменение пароля
 */
export declare const changePassword: (req: any, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=auth.controller.d.ts.map