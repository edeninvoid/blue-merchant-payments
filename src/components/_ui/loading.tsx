import clsx from 'clsx';

interface Props {
  message?: string;
}

export default function Loading({ message }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
        'flex flex-col items-center justify-center gap-3',
        message ? 'mt-40' : 'min-h-screen',
      )}
    >
      <div
        className="size-20 animate-spin rounded-full border-4 border-gray-300 border-t-gray-500"
        aria-hidden="true"
      />
      <p className="text-2xl font-semibold">{message}</p>
    </div>
  );
}
