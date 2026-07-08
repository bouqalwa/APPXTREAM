'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { BaseMedia } from '@/types';
import { MovieCard } from './MovieCard';

export function MovieRow({
  title,
  items,
  id,
}: {
  title: string;
  items: BaseMedia[];
  id: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, items]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section id={id} className="relative px-4 py-6 md:px-8">
      <h2 className="mb-4 text-xl font-bold md:text-2xl">{title}</h2>

      <div className="group/row relative">
        {/* Left scroll arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="absolute -left-2 top-1/2 z-20 flex h-full -translate-y-1/2 items-center bg-gradient-to-r from-netflix-black/90 via-netflix-black/50 to-transparent px-2 opacity-0 transition duration-300 group-hover/row:opacity-100"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white ring-1 ring-white/20 transition hover:bg-white/20 hover:ring-white/40">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </button>
        )}

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-none md:gap-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, index) => (
            <div
              key={`${item.media_type}-${item.id}`}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <MovieCard item={item} />
            </div>
          ))}
        </div>

        {/* Right scroll arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="absolute -right-2 top-1/2 z-20 flex h-full -translate-y-1/2 items-center bg-gradient-to-l from-netflix-black/90 via-netflix-black/50 to-transparent px-2 opacity-0 transition duration-300 group-hover/row:opacity-100"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white ring-1 ring-white/20 transition hover:bg-white/20 hover:ring-white/40">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        )}
      </div>
    </section>
  );
}
