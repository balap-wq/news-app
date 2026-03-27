import cron from 'node-cron';
import logger from '../config/logger.js';
import { syncHeadlines } from '../services/newsSyncService.js';

<<<<<<< HEAD
// ✅ Extract schedule into constant (nit improvement)
const EVERY_30_MINS = '*/30 * * * *';
=======
// ✅ Extract schedule into constant - runs every 30 minutes
const EVERY_30_MINS = '* * * * *';
>>>>>>> origin/main

const syncArticles = () => {
  cron.schedule(EVERY_30_MINS, async () => {
    logger.info('cron job started', {
      time: new Date().toISOString(),
    });

    try {
      await syncHeadlines();

      logger.info('cron job completed successfully');
    } catch (error) {
      logger.error('cron job Failed', {
        error: error.message,
      });
    }
  });
};

export default syncArticles;
