import { z } from 'zod';

export const voteSchema = z.object({
  body: z.object({
    forecastId: z.string().min(1),
    voteType: z.enum(['HELPFUL', 'WELL_REASONED', 'INSIGHTFUL'])
  })
});
