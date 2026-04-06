import { z } from 'zod';

// 1. Validate query params for GET /api/headlines
const headlineQuerySchema = z.object({
  page: z.coerce.number().int('Page must be a positive integer').min(1, 'Page must be a positive integer').optional().default(1),
  category: z.string().optional(),
  country: z.string().optional(),
});

// 2. Validate route params for GET /api/articles/:id
const articleParamSchema = z.object({
  id: z.coerce.number().int().positive('ID must be a positive integer'),
});

// 3. Validate body for POST /api/articles
const articleBodySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  url: z.string().url('Invalid article URL'),
  description: z.string().nullable().optional(),
  category: z.string().optional(),
  author: z.string().nullable().optional(),
  source_name: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  url_to_image: z.string().url().nullable().optional().or(z.literal('')),
  published_at: z.union([z.string(), z.date()]).nullable().optional(),
});

export { headlineQuerySchema, articleParamSchema, articleBodySchema };