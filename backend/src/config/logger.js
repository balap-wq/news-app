import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'test' ? 'silent' : 'info',
  transports: [
    new winston.transports.Console()
  ],
});

export default logger;
