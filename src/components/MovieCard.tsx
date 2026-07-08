'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BaseMedia } from '@/types';
import { getImageUrl } from '@/lib/tmdb';
import { GENRE_MAP } from '@/lib/genres';

export function MovieCard({ item }: { item: BaseMedia }) {
  const router = useRouter();
  const title = item.title || item.name || 'Untitled';
  const href = `/${item.media_type}/${item.id}`;

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    router.push(href);
  };

  const posterSrc = getImageUrl(item.poster_path, 'w500');
  const year = item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4);
  const genres = item.genre_ids?.slice(0, 2).map((id) => GENRE_MAP[id]).filter(Boolean) || [];

  return (
    <a
      href={href}
      onClick={onClick}
      className="group relative block min-w-[160px] overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.05] hover:z-10 hover:shadow-2xl hover:shadow-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-netflix-red"
      aria-label={title}
    >
      <div className="relative h-[240px] w-[160px] bg-zinc-800 md:h-[285px] md:w-[190px]">
        {posterSrc ? (
          <Image
            src={posterSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 160px, 190px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-sm text-zinc-500">
            <svg className="h-12 w-12 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
        )}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Play icon on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg transition group-hover:scale-110">
          <svg className="ml-0.5 h-5 w-5 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Bottom info on hover */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="line-clamp-2 text-sm font-semibold leading-tight">{title}</h3>
        <div className="mt-1.5 flex items-center gap-2 text-xs text-zinc-300">
          {item.vote_average > 0 && (
            <span className="flex items-center gap-1">
              <svg className="h-3 w-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {item.vote_average.toFixed(1)}
            </span>
          )}
          {year && <span>{year}</span>}
        </div>
        {genres.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {genres.map((g) => (
              <span key={g} className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-zinc-300">
                {g}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Rating badge (always visible) */}
      {item.vote_average > 0 && (
        <div className="absolute right-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
          {item.vote_average.toFixed(1)}
        </div>
      )}
    </a>
  );
}
