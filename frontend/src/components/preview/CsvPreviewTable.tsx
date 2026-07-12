'use client';

import { useState } from 'react';
import Table from '@/components/ui/Table';
import Pagination from '@/components/ui/Pagination';

interface CsvPreviewTableProps {
  headers: string[];
  rows: Record<string, string>[];
}

const PAGE_SIZE = 50;

export default function CsvPreviewTable({
  headers,
  rows,
}: CsvPreviewTableProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(rows.length / PAGE_SIZE);

  const paginatedRows = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const tableRows = paginatedRows.map((row) =>
    headers.map((header) => row[header] || '')
  );

  return (
    <div className="space-y-3">
      <Table headers={headers} rows={tableRows} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={rows.length}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
    </div>
  );
}
