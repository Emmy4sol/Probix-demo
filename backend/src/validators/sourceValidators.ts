import { z } from 'zod';

export const sourceSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(128),
    url: z.string().url(),
    category: z.string().min(3).max(64),
    trustScore: z.number().min(0).max(100).optional(),
    isActive: z.boolean().optional()
  })
});
