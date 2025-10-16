import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        error: 'Validation error',
        details: errors,
      });
    }

    next();
  };
};

// Common validation schemas
export const schemas = {
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).required(),
    role: Joi.string().valid('student', 'teacher', 'parent', 'applicant', 'admin').required(),
  }),

  grade: Joi.object({
    studentId: Joi.string().required(),
    subjectId: Joi.string().required(),
    value: Joi.number().min(1).max(5).required(),
    type: Joi.string().valid('exam', 'test', 'homework', 'classwork').required(),
    comment: Joi.string().optional(),
  }),

  schedule: Joi.object({
    groupId: Joi.string().required(),
    subjectId: Joi.string().required(),
    teacherId: Joi.string().required(),
    dayOfWeek: Joi.number().min(0).max(6).required(),
    startTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    endTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    room: Joi.string().required(),
    type: Joi.string().valid('lecture', 'practice', 'lab', 'seminar').required(),
  }),
};
