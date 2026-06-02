import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  logger.error('Unhandled error', err);

  if (typeof err === 'object' && err !== null && 'message' in err) {
    return res.status(500).json({ success: false, error: (err as Error).message });
  }

  return res.status(500).json({ success: false, error: 'Internal server error' });
}
