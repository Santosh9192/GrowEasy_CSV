'use client';

import { useState, useCallback, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ImportSummaryCards from '@/components/import/ImportSummaryCards';
import ImportResultTable from '@/components/import/ImportResultTable';
import ImportProgress from '@/components/import/ImportProgress';
import UploadModal from '@/components/upload/UploadModal';
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import { useCsvParser } from '@/hooks/useCsvParser';
import { useImportSubmit } from '@/hooks/useImportSubmit';
import type { SkippedRecord, FailedRecord, CrmRecord } from '@/types/import';

type AppState = 'upload' | 'preview' | 'importing' | 'result' | 'error';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('result');
  const [sidebarActive, setSidebarActive] = useState('manage-leads');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { state: csvState, parseFile, reset: resetCsv } = useCsvParser();
  const { state: importState, startImport, reset: resetImport } = useImportSubmit();

  useEffect(() => {
    if (importState.status === 'done') {
      setAppState('result');
      setShowUploadModal(false);
    } else if (importState.status === 'error') {
      setErrorMessage(importState.error || 'Import failed');
      setAppState('error');
    }
  }, [importState.status, importState.error]);

  const handleOpenImport = useCallback(() => {
    resetCsv();
    resetImport();
    setErrorMessage('');
    setShowUploadModal(true);
    setAppState('upload');
  }, [resetCsv, resetImport]);

  const handleCloseImport = useCallback(() => {
    setShowUploadModal(false);
    resetCsv();
    resetImport();
    setErrorMessage('');
    setAppState('result');
  }, [resetCsv, resetImport]);

  const handleFileSelect = useCallback(
    (file: File) => {
      setErrorMessage('');
      parseFile(file);
      setAppState('preview');
    },
    [parseFile]
  );

  const handleRemoveFile = useCallback(() => {
    resetCsv();
    setAppState('upload');
    setErrorMessage('');
  }, [resetCsv]);

  const handleUpload = useCallback(async () => {
    if (csvState.rows.length === 0) return;
    setShowUploadModal(false);
    setAppState('importing');
    await startImport(csvState.rows);
  }, [csvState.rows, startImport]);

  const handleTryAgain = useCallback(() => {
    setErrorMessage('');
    setShowUploadModal(true);
    setAppState('upload');
    resetCsv();
    resetImport();
  }, [resetCsv, resetImport]);

  const skippedRecords = importState.result?.data?.skipped ?? [];
  const failedRecords = importState.result?.data?.failed ?? [];
  const processedRecords = importState.result?.data?.processed ?? [];
  const counts = importState.result?.data?.counts ?? {
    total: 0,
    processed: 0,
    skipped: 0,
    failed: 0,
  };

  return (
    <div className="flex h-full">
      <Sidebar activeItem={sidebarActive} onNavigate={setSidebarActive} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4 dark:border-gray-700 dark:bg-gray-900">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {sidebarActive === 'manage-leads' ? 'Manage Leads' : 'Dashboard'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {sidebarActive === 'manage-leads'
                ? 'View and manage all your imported leads'
                : 'Overview of your CRM activities'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenImport}
              className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Import CSV
            </button>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          {/* Summary cards (visible in result state) */}
          {appState === 'result' && processedRecords.length > 0 && (
            <div className="space-y-6">
              <ImportSummaryCards counts={counts} />

              {/* Skipped records */}
              {skippedRecords.length > 0 && (
                <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
                    {skippedRecords.length} record{skippedRecords.length !== 1 ? 's were' : ' was'} skipped
                  </p>
                  <div className="mt-2 space-y-1">
                    {skippedRecords.slice(0, 5).map((rec: SkippedRecord, i: number) => (
                      <p key={i} className="text-xs text-yellow-700 dark:text-yellow-500">
                        Row {rec.rowIndex + 1}: {rec.reason}
                      </p>
                    ))}
                    {skippedRecords.length > 5 && (
                      <p className="text-xs text-yellow-600 dark:text-yellow-500">
                        ...and {skippedRecords.length - 5} more
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Failed records */}
              {failedRecords.length > 0 && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
                  <p className="text-sm font-medium text-red-800 dark:text-red-400">
                    {failedRecords.length} record{failedRecords.length !== 1 ? 's' : ''} failed
                  </p>
                  <div className="mt-2 space-y-1">
                    {failedRecords.slice(0, 5).map((rec: FailedRecord, i: number) => (
                      <p key={i} className="text-xs text-red-700 dark:text-red-500">
                        Row {rec.rowIndex + 1}: {rec.reason}
                      </p>
                    ))}
                    {failedRecords.length > 5 && (
                      <p className="text-xs text-red-600 dark:text-red-500">
                        ...and {failedRecords.length - 5} more
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Result table */}
              {processedRecords.length > 0 && (
                <ImportResultTable records={processedRecords as CrmRecord[]} />
              )}
            </div>
          )}

          {/* Default empty state when no imports done yet */}
          {(appState === 'result' && processedRecords.length === 0) && (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                No leads imported yet
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Click the Import CSV button to upload your first file.
              </p>
            </div>
          )}

          {/* Error state */}
          {appState === 'error' && (
            <div className="mx-auto max-w-lg py-16">
              <Alert type="error" title="Import Error">
                {errorMessage}
              </Alert>
              <div className="mt-4 flex justify-center">
                <Button variant="outline" onClick={handleTryAgain}>
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal
          onFileSelect={handleFileSelect}
          onClose={handleCloseImport}
          fileName={csvState.fileName}
          fileSize={csvState.fileSize}
          headers={csvState.headers}
          previewRows={csvState.rows}
          onUpload={handleUpload}
          onRemove={handleRemoveFile}
          loading={importState.status === 'submitting'}
          hasFile={csvState.status === 'ready'}
        />
      )}

      {/* Import Progress Overlay */}
      {appState === 'importing' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <ImportProgress />
        </div>
      )}
    </div>
  );
}
