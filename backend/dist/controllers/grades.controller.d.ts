import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
/**
 * @route   POST /api/grades
 * @desc    Создать оценку
 * @access  Teacher, Admin
 */
export declare const createGrade: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   GET /api/grades/student/:studentId
 * @desc    Получить оценки студента
 * @access  Student, Teacher, Admin
 */
export declare const getStudentGrades: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   GET /api/grades/:id
 * @desc    Получить оценку по ID
 * @access  Authenticated
 */
export declare const getGradeById: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * @route   PUT /api/grades/:id
 * @desc    Обновить оценку
 * @access  Teacher, Admin
 */
export declare const updateGrade: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   DELETE /api/grades/:id
 * @desc    Удалить оценку
 * @access  Admin
 */
export declare const deleteGrade: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=grades.controller.d.ts.map