'use client';

import { useState, useMemo } from 'react';
import { CrmRecord } from '@/types/import';

interface ImportResultTableProps {
  records: CrmRecord[];
}

const PAGE_SIZE = 20;

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  GOOD_LEAD_FOLLOW_UP: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', label: 'Good Lead' },
  DID_NOT_CONNECT: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', label: 'Did Not Connect' },
  BAD_LEAD: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', label: 'Bad Lead' },
  SALE_DONE: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', label: 'Sale Done' },
};

function StatusPill({ status }: { status: string }) {
  const style = statusStyles[status] || { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-300', label: status };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}

/** Guess which original_data columns are most interesting for display */
function getExtraColumns(records: CrmRecord[]): string[] {
  const colSet = new Set<string>();
  const excluded = new Set(['name', 'email', 'phone', 'mobile', 'company', 'city', 'state', 'country',
    'created_at', 'description', 'notes', 'note', 'comments', 'lead_owner', 'lead source',
    'possession_time', 'data_source']);
  for (const r of records) {
    if (r.original_data) {
      for (const key of Object.keys(r.original_data)) {
        const keyLower = key.toLowerCase().trim();
        // Skip keys that overlap with our main columns
        if (!excluded.has(keyLower) && !keyLower.includes('name') && !keyLower.includes('email') && !keyLower.includes('phone') && !keyLower.includes('mobile')) {
          colSet.add(key);
        }
      }
    }
  }
  // Limit to first 5 extra columns to keep table readable
  return Array.from(colSet).slice(0, 5);
}

function formatVal(v: string | undefined | null): string {
  if (!v || v.trim() === '') return '—';
  return v;
}

export default function ImportResultTable({ records }: ImportResultTableProps) {
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const [search, setSearch] = useState('');

  const extraColumns = useMemo(() => getExtraColumns(records), [records]);

  const filtered = useMemo(() => {
    if (!search.trim()) return records;
    const q = search.toLowerCase();
    return records.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.company.toLowerCase().includes(q) ||
        r.mobile_without_country_code.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.country.toLowerCase().includes(q)
    );
  }, [records, search]);

  const visibleRecords = filtered.slice(0, displayCount);
  const hasMore = displayCount < filtered.length;

  // Build column headers
  const coreColumns = [
    { key: 'name' as const, label: 'Lead Name' },
    { key: 'email' as const, label: 'Email' },
    { key: 'contact' as const, label: 'Contact' },
    { key: 'created_at' as const, label: 'Date Created' },
    { key: 'company' as const, label: 'Company' },
    { key: 'crm_status' as const, label: 'Status' },
    { key: 'city' as const, label: 'City' },
    { key: 'state' as const, label: 'State' },
    { key: 'country' as const, label: 'Country' },
  ];

  const totalCols = coreColumns.length + extraColumns.length + 1; // +1 for actions

  return (
    <div className="space-y-4">
      {/* Header + Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Manage Leads
        </h3>
        <div className="relative w-full max-w-xs">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setDisplayCount(PAGE_SIZE);
            }}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:border-orange-500"
          />
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing {visibleRecords.length} of {filtered.length} leads
        {search && filtered.length !== records.length && (
          <span> (filtered from {records.length})</span>
        )}
      </p>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                {coreColumns.map((col) => (
                  <th
                    key={col.key}
                    className="whitespace-nowrap px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    {col.label}
                  </th>
                ))}
                {extraColumns.map((col) => (
                  <th
                    key={col}
                    className="whitespace-nowrap px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    {col}
                  </th>
                ))}
                <th className="whitespace-nowrap px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {visibleRecords.length === 0 ? (
                <tr>
                  <td
                    colSpan={totalCols}
                    className="px-4 py-12 text-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    {search ? 'No leads match your search.' : 'No leads imported yet.'}
                  </td>
                </tr>
              ) : (
                visibleRecords.map((record, i) => (
                  <tr
                    key={i}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/30"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {formatVal(record.name)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {formatVal(record.email)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {record.mobile_without_country_code && record.mobile_without_country_code !== '-'
                        ? `${record.country_code !== '-' ? record.country_code + ' ' : ''}${record.mobile_without_country_code}`.trim()
                        : '—'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {record.created_at && record.created_at !== '-'
                        ? new Date(record.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : '—'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {formatVal(record.company)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <StatusPill status={record.crm_status} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {formatVal(record.city)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {formatVal(record.state)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {formatVal(record.country)}
                    </td>
                    {extraColumns.map((col) => (
                      <td
                        key={col}
                        className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-400"
                      >
                        {formatVal(record.original_data?.[col])}
                      </td>
                    ))}
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <button className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setDisplayCount((prev) => prev + PAGE_SIZE)}
            className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            Load more ({filtered.length - displayCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
