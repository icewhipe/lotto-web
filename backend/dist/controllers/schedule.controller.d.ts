import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
/**
 * @route   POST /api/schedule
 * @desc    Создать расписание
 * @access  Admin
 */
export declare const createSchedule: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   GET /api/schedule/group/:groupId
 * @desc    Получить расписание группы
 * @access  Authenticated
 */
export declare const getGroupSchedule: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   GET /api/schedule/teacher/:teacherId
 * @desc    Получить расписание преподавателя
 * @access  Authenticated
 */
export declare const getTeacherSchedule: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   PUT /api/schedule/:id
 * @desc    Обновить расписание
 * @access  Admin
 */
export declare const updateSchedule: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   DELETE /api/schedule/:id
 * @desc    Удалить расписание
 * @access  Admin
 */
export declare const deleteSchedule: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=schedule.controller.d.ts.map