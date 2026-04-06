import pkg from 'pg';
import dotenv from 'dotenv';
import logger from './logger.js';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), // ensure it's a number
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Handle unexpected errors on idle clients
pool.on('error', (err) => {
  logger.error('Unexpected database error:', err);
  process.exit(-1);
});

// Test DB connection
export const testConnection = async () => {
  try {
    const client = await pool.connect();
    logger.info('✅ Database connected successfully');
    client.release();
  } catch (error) {
    // FULL error logging (important)
    logger.error('❌ Database connection failed:', error);
  }
};

export default pool;
