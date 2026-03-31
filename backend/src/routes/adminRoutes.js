import express from 'express';
import  { syncHeadlines} from '../services/newsSyncService.js';
import logger from '../config/logger.js';

const router = express.Router();

router.post('/sync', async (req , res) => {
    try{
        logger.info('Manual sync started');

        await syncHeadlines();

        res.json ({ message: 'Manual sync completed successfully' });
    }  catch (error){
        logger.error('Manual sync failed', {
            error: error.message,
        });
        res.status(500).json({ message: 'Manual sync failed' });    
    }
});

export default router;  