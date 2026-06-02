import { z } from 'zod';

export const marketResolutionSchema = z.object({
  body: z.object({
    resolution: z.string().min(3).max(280),
    evidence: z.string().min(10).max(2000),
    outcome: z.enum(['YES', 'NO'])
  })
});
