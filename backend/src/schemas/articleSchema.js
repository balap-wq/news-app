import { z } from 'zod';

export const articleParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a number'),
});

export const headlineQuerySchema = z.object({
  page: z.string().optional().default('1'),
  category: z.string().optional(),
});
