import { CrmRecord } from './crm';

export interface FewShotExample {
  input: Record<string, string>;
  output: Partial<CrmRecord> & { skip?: boolean; reason?: string };
}

export interface BatchResult {
  processed: CrmRecord[];
  skipped: {
    rowIndex: number;
    reason: string;
    originalData: Record<string, string>;
  }[];
  failed: {
    rowIndex: number;
    reason: string;
    raw?: unknown;
  }[];
}
