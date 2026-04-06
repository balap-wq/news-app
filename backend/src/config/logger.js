import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }), // ✅ IMPORTANT
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(), // ✅ ensure console logging
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
});

export default logger;