import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  aiModel: process.env.AI_MODEL || 'gemini-2.0-flash',
  batchSize: parseInt(process.env.BATCH_SIZE || '20', 10),
  maxConcurrency: parseInt(process.env.MAX_CONCURRENCY || '3', 10),
  maxRetries: parseInt(process.env.MAX_RETRIES || '3', 10),
  corsOrigin: process.env.CORS_ORIGIN || '*',
  trustProxy: process.env.TRUST_PROXY === 'true',
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '30', 10),
};
