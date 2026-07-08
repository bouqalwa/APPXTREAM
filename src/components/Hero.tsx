import Link from 'next/link';
import { BaseMedia } from '@/types';
import { getImageUrl } from '@/lib/tmdb';
import { formatYear, formatRating, truncate } from '@/lib/utils';

export function Hero({ item }: { item: BaseMedia }) {
  const title = item.title || item.name || 'Featured';
  const year = formatYear(item.release_date || item.first_air_date);
  const href = `/${item.media_type}/${item.id}`;
  const backdropUrl = getImageUrl(item.backdrop_path, 'w1280');

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
      {/* Background with Ken Burns effect */}
      {backdropUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{
            backgroundImage: `url(${backdropUrl})`,
          }}
        />
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/20 to-transparent" />
      {/* Top vignette for navbar blending */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-netflix-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-end px-4 pb-24 md:px-8 lg:pb-28">
        <div className="max-w-2xl animate-fade-in-up">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-netflix-red">
            ★ Featured
          </p>

          <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
            {title}
          </h1>

          <div className="mb-4 flex items-center gap-3 text-sm text-zinc-300">
            <span className="rounded bg-netflix-red/20 px-2 py-0.5 text-xs font-bold text-netflix-red">
              {formatRating(item.vote_average)}/10
            </span>
            <span>{year}</span>
            <span className="h-1 w-1 rounded-full bg-zinc-500" />
            <span className="capitalize">
              {item.media_type === 'tv' ? 'TV Series' : 'Movie'}
            </span>
          </div>

          <p className="mb-8 max-w-xl text-sm leading-relaxed text-zinc-300 md:text-base">
            {truncate(item.overview, 240)}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href={href}
              className="group flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 font-bold text-black shadow-lg transition hover:bg-zinc-100 hover:shadow-xl active:scale-[0.97]"
            >
              <svg className="h-5 w-5 transition group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </Link>
            <Link
              href={href}
              className="group flex items-center gap-2 rounded-lg bg-zinc-700/50 px-7 py-3.5 font-bold text-white shadow-lg ring-1 ring-white/10 transition hover:bg-zinc-600/60 hover:ring-white/20 active:scale-[0.97]"
            >
              <svg className="h-5 w-5 transition group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              More Info
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
