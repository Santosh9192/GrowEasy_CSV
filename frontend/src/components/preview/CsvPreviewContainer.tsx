'use client';

import Card from '@/components/ui/Card';
import CsvPreviewTable from './CsvPreviewTable';
import CsvPreviewToolbar from './CsvPreviewToolbar';

interface CsvPreviewContainerProps {
  headers: string[];
  rows: Record<string, string>[];
  totalRows: number;
  fileName: string;
  onConfirm: () => void;
  onBack: () => void;
  loading?: boolean;
}

export default function CsvPreviewContainer({
  headers,
  rows,
  totalRows,
  fileName,
  onConfirm,
  onBack,
  loading,
}: CsvPreviewContainerProps) {
  return (
    <div className="space-y-4">
      <CsvPreviewToolbar
        rowCount={totalRows}
        columnCount={headers.length}
        fileName={fileName}
        onConfirm={onConfirm}
        onBack={onBack}
        loading={loading}
      />
      <Card className="p-0 overflow-hidden">
        <CsvPreviewTable headers={headers} rows={rows} />
      </Card>
    </div>
  );
}
