import { z } from 'zod';

export const articleParamSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

export const headlineQuerySchema = z.object({
  page: z.string().optional().default('1'),
  category: z.string().optional(),
});
