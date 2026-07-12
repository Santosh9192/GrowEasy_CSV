import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

export const validateImportBody = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const { rows } = req.body;

  if (!rows || !Array.isArray(rows)) {
    throw new AppError(400, 'INVALID_INPUT', 'rows must be a non-empty array');
  }

  if (rows.length === 0) {
    throw new AppError(400, 'INVALID_INPUT', 'rows array cannot be empty');
  }

  if (rows.length > 10000) {
    throw new AppError(400, 'INVALID_INPUT', 'Maximum 10,000 rows allowed per request');
  }

  next();
};
