'use client';

import { useState, useCallback } from 'react';
import Papa from 'papaparse';

interface CsvParserState {
  status: 'idle' | 'parsing' | 'ready' | 'error';
  headers: string[];
  rows: Record<string, string>[];
  totalRows: number;
  fileName: string;
  fileSize: number;
  error: string | null;
}

const INITIAL: CsvParserState = {
  status: 'idle',
  headers: [],
  rows: [],
  totalRows: 0,
  fileName: '',
  fileSize: 0,
  error: null,
};

export function useCsvParser() {
  const [state, setState] = useState<CsvParserState>(INITIAL);

  const parseFile = useCallback((file: File) => {
    if (!file.name.endsWith('.csv')) {
      setState((prev) => ({
        ...prev,
        status: 'error',
        error: 'Please upload a valid CSV file',
      }));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setState((prev) => ({
        ...prev,
        status: 'error',
        error: 'File size exceeds 10MB limit',
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      status: 'parsing',
      fileName: file.name,
      fileSize: file.size,
      error: null,
    }));

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      complete: (result) => {
        if (result.errors.length > 0) {
          const hasFatal = result.errors.some((e) => e.type === 'FieldMismatch');
          if (hasFatal) {
            setState((prev) => ({
              ...prev,
              status: 'error',
              error: `Parse error: ${result.errors[0].message}`,
            }));
            return;
          }
        }

        const rows = result.data as Record<string, string>[];
        if (rows.length === 0) {
          setState((prev) => ({
            ...prev,
            status: 'error',
            error: 'CSV file is empty or has no data rows',
          }));
          return;
        }

        setState({
          status: 'ready',
          headers: result.meta.fields || [],
          rows,
          totalRows: rows.length,
          fileName: file.name,
          fileSize: file.size,
          error: null,
        });
      },
      error: (err) => {
        setState((prev) => ({
          ...prev,
          status: 'error',
          error: err.message,
        }));
      },
    });
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL);
  }, []);

  return { state, parseFile, reset };
}
