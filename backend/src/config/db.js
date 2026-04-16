import pkg from 'pg';
import logger from './logger.js';

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on('error', (err) => {
  logger.error('Unexpected database error:', err);
  process.exit(-1);
});

export const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    logger.info('✅ Database connected successfully', res.rows[0]);
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
  }
};

export default pool;