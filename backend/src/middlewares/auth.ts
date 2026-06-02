import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { fail } from '../utils/apiResponse';

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  if (!authorization?.startsWith('Bearer ')) {
    return fail(res, 'Authentication required', 401);
  }

  const token = authorization.split(' ')[1];
  try {
    const payload = jwt.verify(token, config.jwtAccessSecret) as { sub: string; role: string };
    req.user = { id: payload.sub, role: payload.role };
    return next();
  } catch (error) {
    return fail(res, 'Invalid or expired token', 401);
  }
}

export function requireRole(role: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return fail(res, 'Authentication required', 401);
    }
    if (req.user.role !== role && req.user.role !== 'SUPER_ADMIN') {
      return fail(res, 'Insufficient permissions', 403);
    }
    return next();
  };
}
