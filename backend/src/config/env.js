import { z } from 'zod';
import dotenv from 'dotenv'; // ← ADD
dotenv.config();   

const envSchema = z.object({
  DB_HOST: z.string().min(1, 'DB_HOST is required'),
  DB_PORT: z.string().regex(/^\d+$/, 'DB_PORT must be a number'),
  DB_USER: z.string().min(1, 'DB_USER is required'),
  DB_PASSWORD: z.string().min(1, 'DB_PASSWORD is required'),
  DB_NAME: z.string().min(1, 'DB_NAME is required'),
  PORT: z.string().regex(/^\d+$/).optional(),
  NEWS_API_BASE_URL: z.string().url('NEWS_API_BASE_URL must be a valid URL'),
  NEWS_API_KEY: z.string().min(1, 'NEWS_API_KEY is required'),
  CORS_ORIGIN: z.string().optional(),
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