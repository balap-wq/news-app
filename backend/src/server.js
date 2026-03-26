import app from "./app.js";
import {testConnection} from './config/db.js'
import logger from "./config/logger.js";

const PORT = 5000;

testConnection();

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});