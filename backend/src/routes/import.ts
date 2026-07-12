import { Router, Request, Response, NextFunction } from 'express';
import { AIService } from '../services/aiService';
import { validateImportBody } from '../middleware/validateBody';
import { ImportRequest, ApiResponse } from '../types/api';
import { logger } from '../utils/logger';

const router = Router();
const aiService = new AIService();

router.post(
  '/',
  validateImportBody,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const startTime = Date.now();

    try {
      const { rows } = req.body as ImportRequest;
      const totalRows = rows.length;

      logger.info(`Import request received: ${totalRows} rows`);

      const result = await aiService.processAllRows(rows);

      const processingTimeMs = Date.now() - startTime;

      const response: ApiResponse = {
        success: true,
        data: {
          processed: result.processed,
          skipped: result.skipped,
          failed: result.failed,
          counts: {
            total: totalRows,
            processed: result.processed.length,
            skipped: result.skipped.length,
            failed: result.failed.length,
          },
          processingTimeMs,
        },
      };

      logger.info(
        `Import complete: ${result.processed.length} processed, ` +
          `${result.skipped.length} skipped, ${result.failed.length} failed in ${processingTimeMs}ms`
      );

      res.json(response);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
