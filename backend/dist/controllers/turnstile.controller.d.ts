import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
/**
 * @route   POST /api/turnstiles
 * @desc    Создать турникет
 * @access  Admin
 */
export declare const createTurnstile: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * @route   GET /api/turnstiles
 * @desc    Получить все турникеты
 * @access  Admin
 */
export declare const getTurnstiles: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   GET /api/turnstiles/:id
 * @desc    Получить турникет по ID
 * @access  Admin
 */
export declare const getTurnstileById: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * @route   PUT /api/turnstiles/:id
 * @desc    Обновить турникет
 * @access  Admin
 */
export declare const updateTurnstile: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   DELETE /api/turnstiles/:id
 * @desc    Удалить турникет
 * @access  Admin
 */
export declare const deleteTurnstile: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   GET /api/turnstiles/:id/logs
 * @desc    Получить логи турникета
 * @access  Admin
 */
export declare const getTurnstileLogs: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   GET /api/turnstiles/:id/stats
 * @desc    Получить статистику турникета
 * @access  Admin
 */
export declare const getTurnstileStats: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=turnstile.controller.d.ts.map