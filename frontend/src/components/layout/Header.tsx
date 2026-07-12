'use client';

import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            G
          </div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            GrowEasy CSV Importer
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
