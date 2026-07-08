'use client';

import Link from 'next/link';

export default function TVError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-netflix-black px-4 text-white">
      <div className="text-center">
        <div className="mb-6 text-6xl">📺</div>
        <h1 className="mb-3 text-3xl font-bold">Show Not Found</h1>
        <p className="mb-6 max-w-md text-zinc-400">
          We couldn&apos;t load this TV show. It may have been removed or the ID is invalid.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="rounded-lg bg-netflix-red px-6 py-3 font-semibold text-white transition hover:bg-netflix-redHover"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-lg border border-zinc-700 px-6 py-3 font-semibold text-white transition hover:bg-zinc-800"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
