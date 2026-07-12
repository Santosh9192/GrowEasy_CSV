interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
}

export default function ProgressBar({
  value,
  max,
  label,
}: ProgressBarProps) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className="w-full">
      {label && (
        <div className="mb-1 text-sm text-gray-600 dark:text-gray-400">
          {label}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
