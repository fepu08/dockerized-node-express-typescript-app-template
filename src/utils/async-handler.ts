import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from '../types/request-handler-type';

export const asyncHandler =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
