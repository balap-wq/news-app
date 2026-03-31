import { z } from 'zod';

// ✅ Validate query params for GET /api/headlines
const headlineQuerySchema = z.object({
  page: z.coerce.number().int().min(1, 'Page must be at least 1').optional().default(1),
  category: z.string().optional(),
  country: z.string().optional(),
});

// ✅ Validate route params for GET /api/articles/:id
const articleParamSchema = z.object({
  id: z.coerce.number().int().positive('ID must be a positive integer'),
});

export { headlineQuerySchema, articleParamSchema };