'use client';

import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface CsvPreviewToolbarProps {
  rowCount: number;
  columnCount: number;
  fileName: string;
  onConfirm: () => void;
  onBack: () => void;
  loading?: boolean;
}

export default function CsvPreviewToolbar({
  rowCount,
  columnCount,
  fileName,
  onConfirm,
  onBack,
  loading,
}: CsvPreviewToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Badge variant="info">{fileName}</Badge>
        <Badge>{rowCount} rows</Badge>
        <Badge>{columnCount} columns</Badge>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={onBack} disabled={loading}>
          Back
        </Button>
        <Button onClick={onConfirm} loading={loading}>
          Confirm Import
        </Button>
      </div>
    </div>
  );
}
