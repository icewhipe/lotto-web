import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
/**
 * @route   POST /api/rfid/cards
 * @desc    Создать RFID карту
 * @access  Admin
 */
export declare const createRFIDCard: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * @route   GET /api/rfid/cards
 * @desc    Получить все RFID карты
 * @access  Admin
 */
export declare const getRFIDCards: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   GET /api/rfid/cards/:id
 * @desc    Получить RFID карту по ID
 * @access  Admin
 */
export declare const getRFIDCardById: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * @route   PUT /api/rfid/cards/:id
 * @desc    Обновить RFID карту
 * @access  Admin
 */
export declare const updateRFIDCard: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   DELETE /api/rfid/cards/:id
 * @desc    Удалить RFID карту
 * @access  Admin
 */
export declare const deleteRFIDCard: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   POST /api/rfid/scan
 * @desc    Обработать сканирование RFID карты
 * @access  System (Turnstile)
 */
export declare const processScan: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=rfid.controller.d.ts.map