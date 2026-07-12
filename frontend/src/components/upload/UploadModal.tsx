'use client';

import { useCallback, useRef, useState, DragEvent } from 'react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface UploadModalProps {
  onFileSelect: (file: File) => void;
  onClose: () => void;
  fileName?: string;
  fileSize?: number;
  headers?: string[];
  previewRows?: Record<string, string>[];
  onUpload: () => void;
  onRemove: () => void;
  loading: boolean;
  hasFile: boolean;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadModal({
  onFileSelect,
  onClose,
  fileName = '',
  fileSize = 0,
  headers = [],
  previewRows = [],
  onUpload,
  onRemove,
  loading,
  hasFile,
}: UploadModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleBrowse = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-5xl rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Import Leads via CSV
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Upload a CSV file to bulk import leads into your system.
          </p>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto px-8 py-6">
          {!hasFile ? (
            /* Dropzone */
            <div
              onClick={handleBrowse}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-colors ${
                dragging
                  ? 'border-orange-400 bg-orange-50 dark:border-orange-400 dark:bg-orange-900/20'
                  : 'border-gray-300 hover:border-orange-300 dark:border-gray-600 dark:hover:border-orange-500'
              }`}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                <svg
                  className="h-7 w-7 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <p className="mb-1 text-base font-medium text-gray-700 dark:text-gray-300">
                Drop your CSV file here
              </p>
              <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                or click to browse (max 10MB)
              </p>
              <span className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600">
                Choose File
              </span>
              <input
                ref={inputRef}
                type="file"
                accept=".csv"
                onChange={handleChange}
                className="hidden"
              />
            </div>
          ) : (
            /* File Preview with Table */
            <div className="space-y-4">
              {/* Selected file info */}
              <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-200">
                    {fileName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatSize(fileSize)} • {previewRows.length} rows • {headers.length} columns
                  </p>
                </div>
                <button
                  onClick={onRemove}
                  className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  aria-label="Remove file"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* ALL column header chips — no limit */}
              <div className="flex flex-wrap gap-2">
                {headers.map((header, i) => (
                  <Badge key={i} variant="info">
                    {header}
                  </Badge>
                ))}
              </div>

              {/* Full table preview — ALL columns visible with horizontal scroll */}
              <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="max-h-72 overflow-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-700/50">
                      <tr>
                        <th className="sticky left-0 z-20 whitespace-nowrap bg-gray-50 px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:bg-gray-700/50 dark:text-gray-400">
                          #
                        </th>
                        {headers.map((header, i) => (
                          <th
                            key={i}
                            className="whitespace-nowrap px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {previewRows.slice(0, 10).map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                          <td className="sticky left-0 z-10 whitespace-nowrap bg-white px-3 py-2 text-sm font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                            {i + 1}
                          </td>
                          {headers.map((header, j) => (
                            <td
                              key={j}
                              className="whitespace-nowrap px-3 py-2 text-sm text-gray-700 dark:text-gray-300"
                            >
                              {row[header] || '—'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {previewRows.length > 10 && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Showing first 10 of {previewRows.length} rows
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-8 py-4 dark:border-gray-700">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {hasFile && (
            <Button
              variant="warning"
              onClick={onUpload}
              loading={loading}
            >
              Upload File
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
