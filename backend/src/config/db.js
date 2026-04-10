import pkg from 'pg';
import dotenv from 'dotenv';
import logger from './logger.js';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for cloud DB (Supabase)
  },
});

// Handle unexpected errors
pool.on('error', (err) => {
  logger.error('Unexpected database error:', err);
  process.exit(-1);
});

// Test DB connection
export const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    logger.info('✅ Database connected successfully:', res.rows[0]);
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
  }
};

export default pool;