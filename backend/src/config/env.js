import { z } from 'zod';
import dotenv from 'dotenv'; // ← ADD
dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  PORT: z.string().regex(/^\d+$/).optional(),
  NODE_ENV: z.string().optional(),

  NEWS_API_BASE_URL: z.string().url('NEWS_API_BASE_URL must be a valid URL'),
  NEWS_API_KEY: z.string().min(1, 'NEWS_API_KEY is required'),

  CORS_ORIGIN: z.string().optional(),
  FRONTEND_URL: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  // ✅ Fix: use parsed.error.issues instead of parsed.error.errors
  parsed.error.issues.forEach((issue) => {
    console.error(`  → ${issue.path[0]}: ${issue.message}`);
  });
  process.exit(1);
}
export const env = parsed.data;
