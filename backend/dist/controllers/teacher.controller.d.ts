import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
/**
 * @route   GET /api/teacher/schedule
 * @desc    Получить расписание преподавателя
 * @access  Teacher
 */
export declare const getTeacherSchedule: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * @route   GET /api/teacher/students
 * @desc    Получить список студентов преподавателя
 * @access  Teacher
 */
export declare const getTeacherStudents: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * @route   POST /api/teacher/grade
 * @desc    Выставить оценку студенту
 * @access  Teacher
 */
export declare const createGradeByTeacher: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * @route   POST /api/teacher/attendance
 * @desc    Отметить посещаемость студента
 * @access  Teacher
 */
export declare const markAttendance: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @route   GET /api/teacher/groups
 * @desc    Получить группы преподавателя
 * @access  Teacher
 */
export declare const getTeacherGroups: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=teacher.controller.d.ts.map