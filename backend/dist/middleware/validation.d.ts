import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
export declare const validate: (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const schemas: {
    login: Joi.ObjectSchema<any>;
    register: Joi.ObjectSchema<any>;
    grade: Joi.ObjectSchema<any>;
    schedule: Joi.ObjectSchema<any>;
};
//# sourceMappingURL=validation.d.ts.map