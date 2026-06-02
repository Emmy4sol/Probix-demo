import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import routes from './routes';
import { connectDatabase } from './config/db';
import { config } from './config';
import { apiLimiter } from './middlewares/rateLimiter';
import { errorHandler } from './middlewares/errorHandler';
import { auditLogger } from './middlewares/auditLogger';
import logger from './utils/logger';

async function start() {
  await connectDatabase();

  const app = express();
  app.use(helmet());
  app.use(express.json({ limit: '1mb' }));
  app.use(cookieParser());
  app.use(morgan('combined'));
  app.use(cors({ origin: config.corsOrigin, credentials: true }));
  app.use(apiLimiter);
  app.use(auditLogger);

  app.use('/api', routes);

  app.use(errorHandler);

  app.listen(config.port, () => {
    logger.info(`Server listening on port ${config.port}`);
  });
}

start().catch((err) => {
  logger.error('Failed to start server', err);
  process.exit(1);
});
