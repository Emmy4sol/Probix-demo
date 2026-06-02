import { z } from 'zod';

export const categorySchema = z.object({
  body: z.object({
    name: z.string().min(3).max(64),
    slug: z.string().min(3).max(64),
    icon: z.string().min(1),
    color: z.string().min(3).max(32),
    isActive: z.boolean().optional()
  })
});
