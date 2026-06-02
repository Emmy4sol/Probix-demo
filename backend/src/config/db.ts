import mongoose from 'mongoose';
import { config } from './index';
import logger from '../utils/logger';

let memoryServer: any = null;

export async function connectDatabase() {
  const uri = config.mongodbUri;
  mongoose.set('strictQuery', true);

  if (uri && uri !== 'mongodb://localhost:27017/probix') {
    try {
      await mongoose.connect(uri, {
        autoIndex: true
      });

      if (/mongodb(\+srv)?:\/\/.*mongodb\.net/.test(uri)) {
        logger.info('✅ Connected to MongoDB Atlas (persistent data)');
      } else {
        logger.info('Connected to MongoDB');
      }

      return;
    } catch (error) {
      logger.error('Failed to connect to provided MongoDB URI', error);
      throw error;
    }
  }

  // Development fallback
  logger.warn('⚠️  Using in-memory MongoDB (data lost on restart). Set MONGODB_URI for persistent storage.');
  const { MongoMemoryServer } = await import('mongodb-memory-server');
  memoryServer = await MongoMemoryServer.create();
  const memoryUri = memoryServer.getUri();
  await mongoose.connect(memoryUri, { autoIndex: true });
  logger.info('📦 Connected to in-memory MongoDB');
}


