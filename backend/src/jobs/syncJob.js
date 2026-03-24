import cron from "node-cron";
import logger from "../config/logger.js";
import { syncHeadlines } from "../services/newsSyncService.js";

 const startSyncJob = () => {
    cron.schedule("*/30 * * * *", async () => {
        logger.info("cron job started", {
            time: new Date().toISOString(),
        });
        try {
            await syncHeadlines();
            logger.info("cron job completed successfully");
        } catch (error) {
            logger.error("cron job Failed", {
                error: error.message,
            });
        }
    });
};
export default startSyncJob;