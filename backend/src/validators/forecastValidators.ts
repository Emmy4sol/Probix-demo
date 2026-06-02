import { z } from 'zod';

export const forecastSchema = z.object({
  body: z.object({
    marketId: z.string().min(1),
    probability: z.number().min(0).max(100),
    confidence: z.number().min(0).max(100),
    position: z.enum(['YES', 'NO']),
    reasoning: z.string().min(20).max(1200)
  })
});
