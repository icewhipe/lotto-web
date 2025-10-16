import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
/**
 * @route   POST /api/attendance
 * @desc    Создать запись посещаемости
 * @access  Teacher, Admin
 */
export declare const createAttendance: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   GET /api/attendance/student/:studentId
 * @desc    Получить посещаемость студента
 * @access  Student, Teacher, Parent, Admin
 */
export declare const getStudentAttendance: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   GET /api/attendance/group/:groupId
 * @desc    Получить посещаемость группы
 * @access  Teacher, Admin
 */
export declare const getGroupAttendance: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   PUT /api/attendance/:id
 * @desc    Обновить запись посещаемости
 * @access  Teacher, Admin
 */
export declare const updateAttendance: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   DELETE /api/attendance/:id
 * @desc    Удалить запись посещаемости
 * @access  Admin
 */
export declare const deleteAttendance: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=attendance.controller.d.ts.map