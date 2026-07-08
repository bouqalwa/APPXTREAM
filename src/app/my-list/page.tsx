'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { MovieCard } from '@/components/MovieCard';
import { Footer } from '@/components/Footer';
import { useWatchlist } from '@/context/WatchlistContext';

export default function MyListPage() {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch between server and client storage state
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-netflix-black text-white flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="mx-auto max-w-7xl px-4 pb-12 pt-28 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight">My List</h1>
            {mounted && watchlist.length > 0 && (
              <span className="text-sm font-medium text-zinc-400">
                {watchlist.length} Title{watchlist.length > 1 ? 's' : ''}
              </span>
            )}
          </div>

          {!mounted ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 animate-pulse">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[240px] md:h-[285px] rounded-lg bg-zinc-800" />
              ))}
            </div>
          ) : watchlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 rounded-full bg-zinc-800/50 p-6 ring-1 ring-white/5">
                <svg className="h-10 w-10 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="mb-2 text-xl font-bold">Your list is empty</h2>
              <p className="mb-6 max-w-md text-sm text-zinc-400">
                Find movies and TV shows you love and save them to watch later.
              </p>
              <Link
                href="/"
                className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-black shadow-lg transition hover:bg-zinc-100 active:scale-[0.97]"
              >
                Browse Popular Titles
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {watchlist.map((item) => (
                <div key={`${item.media_type}-${item.id}`} className="group relative">
                  <MovieCard item={item} />
                  {/* Remove Button Overlay */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeFromWatchlist(item.id);
                    }}
                    title="Remove from My List"
                    className="absolute right-2 top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/80 text-white opacity-0 shadow-lg ring-1 ring-white/10 transition duration-300 hover:bg-netflix-red hover:text-white group-hover:opacity-100"
                  >
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
