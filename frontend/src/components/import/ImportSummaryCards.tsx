import { ImportCounts } from '@/types/import';
import Badge from '@/components/ui/Badge';

interface ImportSummaryCardsProps {
  counts: ImportCounts;
}

export default function ImportSummaryCards({
  counts,
}: ImportSummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
        <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
          {counts.total}
        </p>
      </div>
      <div className="rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
        <div className="flex items-center justify-between">
          <p className="text-sm text-green-700 dark:text-green-400">Processed</p>
          <Badge variant="success">Imported</Badge>
        </div>
        <p className="mt-1 text-2xl font-bold text-green-800 dark:text-green-300">
          {counts.processed}
        </p>
      </div>
      <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
        <div className="flex items-center justify-between">
          <p className="text-sm text-yellow-700 dark:text-yellow-400">Skipped</p>
          <Badge variant="warning">{counts.skipped}</Badge>
        </div>
        <p className="mt-1 text-2xl font-bold text-yellow-800 dark:text-yellow-300">
          {counts.skipped}
        </p>
      </div>
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
        <div className="flex items-center justify-between">
          <p className="text-sm text-red-700 dark:text-red-400">Failed</p>
          <Badge variant="error">{counts.failed}</Badge>
        </div>
        <p className="mt-1 text-2xl font-bold text-red-800 dark:text-red-300">
          {counts.failed}
        </p>
      </div>
    </div>
  );
}
