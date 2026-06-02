import { z } from 'zod';

export const watchlistSchema = z.object({
  body: z.object({
    marketId: z.string().min(1)
  })
});
