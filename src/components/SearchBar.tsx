'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export function SearchBar() {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Navigate on debounced query change (live search)
  useEffect(() => {
    if (debouncedQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(debouncedQuery.trim())}`);
    }
  }, [debouncedQuery, router]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
    if (!expanded) {
      // Focus input after expanding
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setQuery('');
    }
  };

  return (
    <form onSubmit={onSubmit} className="relative flex items-center">
      {/* Search icon button */}
      <button
        type="button"
        onClick={toggleExpand}
        aria-label="Search"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-300 transition hover:text-white"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Expandable input */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? 'w-48 opacity-100 sm:w-56' : 'w-0 opacity-0'
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Titles, genres..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() => {
            if (!query.trim()) setExpanded(false);
          }}
          className="w-full rounded-lg border border-zinc-700 bg-black/60 px-3 py-2 text-sm text-white outline-none backdrop-blur-sm transition focus:border-netflix-red focus:ring-1 focus:ring-netflix-red/30"
        />
      </div>
    </form>
  );
}
