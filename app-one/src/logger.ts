import { createLogger, format, transports } from 'winston';

const { printf, combine } = format;

const logFormat = printf(
  ({ serviceName, userId, workspaceId, level, ip, message, timestamp }) => {
    const log = {
      timestamp,
      level,
      message,
      serviceName,
      userId,
      workspaceId,
      ip,
    };
    return JSON.stringify(log);
  }
);

const localLogger = createLogger({
  format: combine(format.timestamp(), logFormat),

  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/app.log' }),
  ],
});

export { localLogger };
