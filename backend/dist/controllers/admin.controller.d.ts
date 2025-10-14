import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
/**
 * @route   GET /api/admin/users
 * @desc    Получить всех пользователей
 * @access  Admin
 */
export declare const getAllUsers: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   POST /api/admin/user
 * @desc    Создать пользователя
 * @access  Admin
 */
export declare const createUser: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * @route   DELETE /api/admin/user/:id
 * @desc    Удалить пользователя
 * @access  Admin
 */
export declare const deleteUser: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   GET /api/admin/groups
 * @desc    Получить все группы
 * @access  Admin
 */
export declare const getAllGroups: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   POST /api/admin/group
 * @desc    Создать группу
 * @access  Admin
 */
export declare const createGroup: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   GET /api/admin/subjects
 * @desc    Получить все предметы
 * @access  Admin
 */
export declare const getAllSubjects: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   POST /api/admin/subject
 * @desc    Создать предмет
 * @access  Admin
 */
export declare const createSubject: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   GET /api/admin/stats
 * @desc    Получить общую статистику
 * @access  Admin
 */
export declare const getStats: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=admin.controller.d.ts.map