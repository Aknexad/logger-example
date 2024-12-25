import { Client } from '@opensearch-project/opensearch';
import winston from 'winston';

import { OPENSEARCH_HOSTS } from './config';

const host = OPENSEARCH_HOSTS;
const protocol = 'https'; // <-- Changing http to https worked.
const ports = [9200, 9600];
const auth = 'admin:@Ad23546123145645x'; // For testing only. Don't store credentials in code.

// OpenSearch client configuration
const opensearchClient = new Client({
  nodes: [
    protocol + '://' + auth + '@' + host + ':' + ports[0],
    protocol + '://' + auth + '@' + host + ':' + ports[1],
  ],
  ssl: {
    rejectUnauthorized: false,
  },
});

// Custom Winston transport for OpenSearch
class OpenSearchTransport extends winston.transports.Console {
  constructor(options: any) {
    super(options);
    this.name = 'opensearchTransport';
    this.level = options.level || 'info';
  }

  log(info: any, callback: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: info.level,
      message: info.message,
      serviceName: info.serviceName,
      userId: info.userId,
      workspaceId: info.workspaceId,
      ip: info.ip,
    };

    // Index the log entry in OpenSearch
    opensearchClient
      .index({
        index: 'hubin-system-logs', // Replace with your desired index name
        body: logEntry,
      })
      .then(response => {
        console.log('Log entry indexed:', response.body);
      })
      .catch(err => {
        console.error('Error indexing log entry:', err);
      });

    callback();
  }
}

//
const logFormat = winston.format.printf(
  ({ serviceName, userId, workspaceId, level, ip, message, timestamp }: any) => {
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

// Create a Winston logger instance with the custom OpenSearch transport
const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  transports: [
    // new winston.transports.File({ filename: 'app.log' }), // File transport
    new OpenSearchTransport({ level: 'info' }), // Custom OpenSearch transport,
    new winston.transports.Console(), // Console transport
  ],
});

// Log a test message to verify that logging is working
// logger.info('Logger initialized successfully.');

export { logger };
