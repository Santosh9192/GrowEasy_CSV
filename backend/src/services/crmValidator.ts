import { CrmRecord, CrmStatus, DataSource } from '../types/crm';

const VALID_STATUSES: CrmStatus[] = [
  'GOOD_LEAD_FOLLOW_UP',
  'DID_NOT_CONNECT',
  'BAD_LEAD',
  'SALE_DONE',
];

const VALID_SOURCES: DataSource[] = [
  'leads_on_demand',
  'meridian_tower',
  'eden_park',
  'varah_swamy',
  'sarjapur_plots',
  '',
  '-',
];

const DASH = '-';

export function validateAndCleanRecord(record: Partial<CrmRecord> & { original_data?: Record<string, string> }): CrmRecord {
  const cleaned: CrmRecord = {
    created_at: validateDate(record.created_at),
    name: record.name || DASH,
    email: record.email || DASH,
    country_code: record.country_code || DASH,
    mobile_without_country_code: record.mobile_without_country_code || DASH,
    company: record.company || DASH,
    city: record.city || DASH,
    state: record.state || DASH,
    country: record.country || DASH,
    lead_owner: record.lead_owner || DASH,
    crm_status: validateStatus(record.crm_status),
    crm_note: record.crm_note || DASH,
    data_source: validateDataSource(record.data_source),
    possession_time: record.possession_time || DASH,
    description: record.description || DASH,
    original_data: record.original_data || {},
  };

  return cleaned;
}

function validateDate(date: unknown): string {
  if (!date || typeof date !== 'string') {
    return new Date().toISOString();
  }

  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) {
    return new Date().toISOString();
  }

  return parsed.toISOString();
}

function validateStatus(status: unknown): CrmStatus {
  if (typeof status === 'string' && VALID_STATUSES.includes(status as CrmStatus)) {
    return status as CrmStatus;
  }
  return 'GOOD_LEAD_FOLLOW_UP';
}

function validateDataSource(source: unknown): DataSource {
  if (typeof source === 'string' && VALID_SOURCES.includes(source as DataSource)) {
    return source as DataSource;
  }
  return '';
}
