'use client';

import { useState, useCallback } from 'react';
import { ImportResponse } from '@/types/import';
import { submitImport } from '@/services/api';

interface ImportSubmitState {
  status: 'idle' | 'submitting' | 'done' | 'error';
  result: ImportResponse | null;
  error: string | null;
}

const INITIAL: ImportSubmitState = {
  status: 'idle',
  result: null,
  error: null,
};

export function useImportSubmit() {
  const [state, setState] = useState<ImportSubmitState>(INITIAL);

  const startImport = useCallback(async (rows: Record<string, string>[]) => {
    setState({ status: 'submitting', result: null, error: null });

    try {
      const response = await submitImport(rows);
      if (response.success) {
        setState({ status: 'done', result: response, error: null });
      } else {
        setState({
          status: 'error',
          result: null,
          error: response.error?.message || 'Import failed',
        });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Network error. Please try again.';
      setState({ status: 'error', result: null, error: message });
    }
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL);
  }, []);

  return { state, startImport, reset };
}
