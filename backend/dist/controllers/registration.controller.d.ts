import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
export declare const checkInviteCode: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const registerWithInvite: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const registerPending: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getRegistrationRequests: (req: Request, res: Response) => Promise<void>;
export declare const approveRegistration: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const rejectRegistration: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const generateInviteCodes: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getInviteCodes: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=registration.controller.d.ts.map