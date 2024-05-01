import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger/logger';

export function apiMethodLoggingMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { method, path, params, query, body } = req;
  const message = `[${method}] ${path} - params: ${JSON.stringify(
    params,
  )}, query: ${JSON.stringify(query)}, body: ${JSON.stringify(body)}`;
  logger.info(message);
  next();
}
