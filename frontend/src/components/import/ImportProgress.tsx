import Spinner from '@/components/ui/Spinner';

export default function ImportProgress() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Spinner className="mb-4 h-10 w-10" />
      <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
        Processing your CSV with AI...
      </p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        This may take a moment. We are extracting CRM fields intelligently.
      </p>
    </div>
  );
}
