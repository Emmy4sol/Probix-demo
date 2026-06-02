import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { fail } from '../utils/apiResponse';

export function validate(schema: ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({ body: req.body, params: req.params, query: req.query });
    if (!result.success) {
      const message = result.error.errors.map((error) => `${error.path.join('.')}: ${error.message}`).join('; ');
      return fail(res, message, 422);
    }

    return next();
  };
}
