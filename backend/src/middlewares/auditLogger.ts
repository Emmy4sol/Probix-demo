import { Request, Response, NextFunction } from 'express';
import AuditLog from '../models/AuditLog';

export async function auditLogger(req: Request, res: Response, next: NextFunction) {
  res.on('finish', async () => {
    try {
      await AuditLog.create({
        userId: (req as any).user?.id || null,
        action: `${req.method} ${req.originalUrl}`,
        ip: req.ip,
        userAgent: req.headers['user-agent'] ?? 'unknown',
        status: res.statusCode
      });
    } catch (error) {
      console.warn('Audit logger failed', error);
    }
  });
  next();
}
