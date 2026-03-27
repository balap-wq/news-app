import express from 'express';
import { syncHeadlines } from '../services/newsSyncService.js';
import logger from '../config/logger.js';

const router = express.Router();

router.post('/sync', async (req, res) => {
  try {
    logger.info('Manual  sync trigggred');

    await syncHeadlines();

    res.json({ message: 'Sync completed successfully' });
  } catch (error) {
    logger.error('manual sync failed', {
      error: error.message,
    });
    res.status(500).json({ error: 'sync failed' });
  }
});

export default router;
