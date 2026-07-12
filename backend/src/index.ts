import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';
import healthRouter from './routes/health';
import importRouter from './routes/import';
import { logger } from './utils/logger';

const app = express();

// Trust proxy — needed when deployed behind reverse proxies (Vercel, Railway, Render, etc.)
if (config.trustProxy) {
  app.set('trust proxy', 1);
}

// CORS — allow specific origin in production, all origins in development
const corsOptions: cors.CorsOptions =
  config.corsOrigin === '*'
    ? { origin: '*' }
    : { origin: config.corsOrigin.split(',').map((o) => o.trim()) };

app.use(cors(corsOptions));

// Body parser with generous limit for large CSVs
app.use(express.json({ limit: '50mb' }));

// Rate limiting — protect the import endpoint
const importLimiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests. Please try again later.',
    },
  },
});

app.use('/api/import', importLimiter);

// Routes
app.use('/api/health', healthRouter);
app.use('/api/import', importRouter);

// Error handler
app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`Backend server running on port ${config.port}`);
  logger.info(`CORS origin: ${config.corsOrigin}`);
  logger.info(`Rate limit: ${config.rateLimitMax} requests per ${config.rateLimitWindowMs}ms`);
});

export default app;
