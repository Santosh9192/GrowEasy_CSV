export type CrmStatus =
  | 'GOOD_LEAD_FOLLOW_UP'
  | 'DID_NOT_CONNECT'
  | 'BAD_LEAD'
  | 'SALE_DONE';

export type DataSource =
  | 'leads_on_demand'
  | 'meridian_tower'
  | 'eden_park'
  | 'varah_swamy'
  | 'sarjapur_plots'
  | ''
  | '-';

export interface CrmRecord {
  created_at: string;
  name: string;
  email: string;
  country_code: string;
  mobile_without_country_code: string;
  company: string;
  city: string;
  state: string;
  country: string;
  lead_owner: string;
  crm_status: CrmStatus;
  crm_note: string;
  data_source: DataSource;
  possession_time: string;
  description: string;
  /** All original CSV column values preserved as-is */
  original_data: Record<string, string>;
}

export interface SkippedRecord {
  rowIndex: number;
  reason: string;
  originalData: Record<string, string>;
}

export interface FailedRecord {
  rowIndex: number;
  reason: string;
  raw?: unknown;
}

export interface ImportCounts {
  total: number;
  processed: number;
  skipped: number;
  failed: number;
}

export interface ImportResponseData {
  processed: CrmRecord[];
  skipped: SkippedRecord[];
  failed: FailedRecord[];
  counts: ImportCounts;
  processingTimeMs: number;
}

export interface ImportResponse {
  success: boolean;
  data: ImportResponseData;
  error?: { code: string; message: string };
}

export type PageState =
  | 'upload'
  | 'preview'
  | 'importing'
  | 'result'
  | 'error';
