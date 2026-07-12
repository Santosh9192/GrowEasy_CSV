'use client';

import { ReactNode, useRef, useEffect } from 'react';

interface TableProps {
  headers: string[];
  rows: ReactNode[][];
  className?: string;
  stickyHeader?: boolean;
}

export default function Table({
  headers,
  rows,
  className = '',
  stickyHeader = true,
}: TableProps) {
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableRef.current) {
      const resizeObserver = new ResizeObserver(() => {});
      resizeObserver.observe(tableRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  return (
    <div
      ref={tableRef}
      className={`overflow-auto rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead
          className={`bg-gray-50 dark:bg-gray-700/50 ${stickyHeader ? 'sticky top-0' : ''}`}
        >
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length}
                className="px-4 py-8 text-center text-sm text-gray-500"
              >
                No data
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/30"
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="whitespace-nowrap px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
