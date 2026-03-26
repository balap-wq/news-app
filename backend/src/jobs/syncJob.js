import cron from "node-cron";
import logger from "../config/logger.js";
import { syncHeadlines } from "../services/newsSyncService.js";

// ✅ Extract schedule into constant (nit improvement)
const EVERY_30_MINS = "*/30 * * * *";

const syncArticles = () => {
  cron.schedule(EVERY_30_MINS, async () => {
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

export default syncArticles;