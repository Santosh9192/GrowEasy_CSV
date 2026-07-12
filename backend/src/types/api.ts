import { CrmRecord, SkippedRecord, FailedRecord, ImportCounts } from './crm';

export interface ImportRequest {
  rows: Record<string, string>[];
  batchSize?: number;
}

export interface ImportResponseData {
  processed: CrmRecord[];
  skipped: SkippedRecord[];
  failed: FailedRecord[];
  counts: ImportCounts;
  processingTimeMs: number;
}

export interface ApiSuccessResponse {
  success: true;
  data: ImportResponseData;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;
