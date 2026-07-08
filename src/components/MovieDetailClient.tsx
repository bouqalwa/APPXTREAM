'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PlayerModal } from '@/components/PlayerModal';
import { formatRating, formatYear } from '@/lib/utils';
import type { Movie } from '@/types';
import { useWatchlist } from '@/context/WatchlistContext';

interface Props {
  movie: Movie;
  posterUrl: string | null;
}

export function MovieDetailClient({ movie, posterUrl }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { addToWatchlist, removeFromWatchlist, inWatchlist } = useWatchlist();

  const [youtubeKey, setYoutubeKey] = useState<string | null>(null);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [activeYoutubeKey, setActiveYoutubeKey] = useState<string | null>(null);

  const isSaved = inWatchlist(movie.id);

  const handleWatchTrailer = async () => {
    if (youtubeKey) {
      setActiveYoutubeKey(youtubeKey);
      setOpen(true);
      return;
    }
    setTrailerLoading(true);
    try {
      const res = await fetch(`/api/tmdb?endpoint=/movie/${movie.id}/videos`);
      const data = await res.json();
      const videos = data.results || [];
      const trailer =
        videos.find((v: any) => v.site === 'YouTube' && v.type === 'Trailer') ||
        videos.find((v: any) => v.site === 'YouTube' && v.type === 'Teaser') ||
        videos.find((v: any) => v.site === 'YouTube');

      if (trailer) {
        setYoutubeKey(trailer.key);
        setActiveYoutubeKey(trailer.key);
        setOpen(true);
      } else {
        alert('Sorry, no official trailer found for this movie.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to load trailer.');
    } finally {
      setTrailerLoading(false);
    }
  };

  const handlePlayNow = () => {
    setActiveYoutubeKey(null);
    setOpen(true);
  };

  const handleWatchlistToggle = () => {
    if (isSaved) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist({
        ...movie,
        media_type: 'movie',
      });
    }
  };

  return (
    <>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 pb-12 pt-28 md:grid-cols-[300px_1fr] md:px-8">
        {/* Back button */}
        <div className="col-span-full">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <svg className="h-4 w-4 transition group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {/* Poster */}
        <div className="relative h-[450px] w-full overflow-hidden rounded-lg bg-zinc-800 shadow-2xl">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-zinc-500">
              No Poster Available
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="mb-3 text-4xl font-bold">{movie.title}</h1>

          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
            <span className="rounded bg-netflix-red/20 px-2 py-0.5 text-netflix-red font-medium">
              {formatRating(movie.vote_average)}/10
            </span>
            <span>{formatYear(movie.release_date)}</span>
            {movie.runtime && (
              <>
                <span>•</span>
                <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
              </>
            )}
            <span>•</span>
            <span>Movie</span>
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <p className="mb-6 max-w-3xl leading-relaxed text-zinc-300">
            {movie.overview}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePlayNow}
              className="group flex items-center gap-3 rounded-lg bg-netflix-red px-8 py-4 font-semibold text-white shadow-lg shadow-netflix-red/25 transition hover:bg-netflix-redHover hover:shadow-xl hover:shadow-netflix-red/30 active:scale-[0.97]"
            >
              <svg className="h-5 w-5 transition group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play Now
            </button>

            <button
              onClick={handleWatchTrailer}
              disabled={trailerLoading}
              className="group flex items-center gap-3 rounded-lg bg-zinc-700/50 px-6 py-4 font-semibold text-white shadow-lg ring-1 ring-white/10 transition hover:bg-zinc-600/60 hover:ring-white/20 active:scale-[0.97] disabled:opacity-50"
            >
              <svg className="h-5 w-5 text-zinc-300 transition group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {trailerLoading ? 'Loading...' : 'Watch Trailer'}
            </button>

            <button
              onClick={handleWatchlistToggle}
              className={`group flex h-14 w-14 items-center justify-center rounded-lg border font-semibold shadow-lg transition active:scale-[0.97] ${
                isSaved
                  ? 'border-netflix-red bg-netflix-red/10 text-netflix-red hover:bg-netflix-red/20'
                  : 'border-zinc-600 bg-transparent text-zinc-300 hover:border-white hover:text-white'
              }`}
              title={isSaved ? 'Remove from My List' : 'Add to My List'}
            >
              {isSaved ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <PlayerModal
        open={open}
        onClose={() => setOpen(false)}
        tmdbId={movie.id}
        mediaType="movie"
        title={movie.title}
        youtubeKey={activeYoutubeKey}
      />
    </>
  );
}
