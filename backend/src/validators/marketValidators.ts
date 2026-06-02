import { z } from 'zod';

export const marketSchema = z.object({
  body: z.object({
    title: z.string().min(10).max(140),
    category: z.string().min(3).max(64),
    categoryId: z.string().optional(),
    sourceName: z.string().min(3).max(128),
    sourceUrl: z.string().url(),
    description: z.string().min(20).max(1200),
    closeDate: z.string().refine((value) => !Number.isNaN(Date.parse(value)), { message: 'closeDate must be a valid ISO date' }),
    resolveDate: z.string().refine((value) => !Number.isNaN(Date.parse(value)), { message: 'resolveDate must be a valid ISO date' })
  })
});
