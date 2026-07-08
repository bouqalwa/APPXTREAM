import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-netflix-black px-4 text-white">
      <div className="text-center">
        <h1 className="mb-2 text-8xl font-black text-netflix-red">404</h1>
        <h2 className="mb-4 text-2xl font-bold">Lost your way?</h2>
        <p className="mb-8 max-w-md text-zinc-400">
          Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-white px-8 py-3 font-semibold text-black transition hover:bg-zinc-200"
        >
          StreamFlix Home
        </Link>
      </div>
    </div>
  );
}
