import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
/**
 * @route   GET /api/parent/children
 * @desc    Получить список детей родителя
 * @access  Parent
 */
export declare const getChildren: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * @route   GET /api/parent/child/:childId/grades
 * @desc    Получить оценки ребёнка
 * @access  Parent
 */
export declare const getChildGrades: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * @route   GET /api/parent/child/:childId/attendance
 * @desc    Получить посещаемость ребёнка
 * @access  Parent
 */
export declare const getChildAttendance: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * @route   GET /api/parent/child/:childId/schedule
 * @desc    Получить расписание ребёнка
 * @access  Parent
 */
export declare const getChildSchedule: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=parent.controller.d.ts.map