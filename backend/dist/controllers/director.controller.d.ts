import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
/**
 * @route   GET /api/director/analytics
 * @desc    Получить общую аналитику колледжа
 * @access  Director
 */
export declare const getAnalytics: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   GET /api/director/performance-report
 * @desc    Получить отчёт по успеваемости
 * @access  Director
 */
export declare const getPerformanceReport: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   GET /api/director/attendance-report
 * @desc    Получить отчёт по посещаемости
 * @access  Director
 */
export declare const getAttendanceReport: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   GET /api/director/groups-overview
 * @desc    Получить обзор по всем группам
 * @access  Director
 */
export declare const getGroupsOverview: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=director.controller.d.ts.map