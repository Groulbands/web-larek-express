import expressWinston from 'express-winston';
import winston from 'winston';

const jsonFormat = winston.format.json();

export const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: 'request.log' })],
  format: jsonFormat,
  requestWhitelist: ['url', 'method', 'httpVersion', 'originalUrl', 'query'],
  responseWhitelist: ['statusCode'],
  meta: true,
});

export const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: 'error.log' })],
  format: jsonFormat,
  requestWhitelist: ['url', 'method', 'originalUrl'],
});
