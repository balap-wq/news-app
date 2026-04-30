import { z } from '../lib/zod.js';

// 🔹 Query schema
const headlineQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1).openapi({
    description: 'Page number',
    example: 1,
  }),
  category: z.string().optional().openapi({
    description: 'News category',
    example: 'technology',
  }),
  country: z.string().optional().openapi({
    description: 'Country code',
    example: 'us',
  }),
});

// 🔹 Params schema
const articleParamSchema = z.object({
  id: z.coerce.number().int().positive().openapi({
    description: 'Article ID',
    example: 1,
  }),
});

// 🔹 Body schema
const articleBodySchema = z
  .object({
    title: z.string().min(1).openapi({
      example: 'Breaking News Title',
    }),
    url: z.string().url().openapi({
      example: 'https://example.com/article',
    }),
    description: z.string().nullable().optional(),
    category: z.string().optional(),
    author: z.string().nullable().optional(),
    source_name: z.string().nullable().optional(),
    content: z.string().nullable().optional(),

    url_to_image: z.string().url().nullable().optional().or(z.literal('')).openapi({
      example: 'https://example.com/image.jpg',
    }),

    published_at: z.string().datetime().nullable().optional().openapi({
      example: '2024-01-01T10:00:00Z',
    }),
  })
  .strict();

export { headlineQuerySchema, articleParamSchema, articleBodySchema };
