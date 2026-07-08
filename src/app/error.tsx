'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-netflix-black px-4 text-white">
      <div className="text-center">
        <div className="mb-6 text-6xl">⚠️</div>
        <h1 className="mb-3 text-3xl font-bold">Something went wrong</h1>
        <p className="mb-6 max-w-md text-zinc-400">
          {error?.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <button
          onClick={reset}
          className="rounded-lg bg-netflix-red px-6 py-3 font-semibold text-white transition hover:bg-netflix-redHover"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
