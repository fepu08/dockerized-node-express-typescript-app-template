import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level} ${info.message}`,
    ),
  ),
});
