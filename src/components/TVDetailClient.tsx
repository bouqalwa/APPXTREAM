'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { PlayerModal } from '@/components/PlayerModal';
import { formatRating, formatYear } from '@/lib/utils';
import type { TVShow, Episode } from '@/types';
import { useWatchlist } from '@/context/WatchlistContext';

interface Props {
  show: TVShow;
  posterUrl: string | null;
  initialEpisodes: Episode[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function TVDetailClient({ show, posterUrl, initialEpisodes }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { addToWatchlist, removeFromWatchlist, inWatchlist } = useWatchlist();

  const defaultSeason =
    show.seasons?.find((s) => s.season_number > 0)?.season_number || 1;
  const [season, setSeason] = useState(defaultSeason);
  const [episode, setEpisode] = useState(1);

  const [youtubeKey, setYoutubeKey] = useState<string | null>(null);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [activeYoutubeKey, setActiveYoutubeKey] = useState<string | null>(null);

  const isSaved = inWatchlist(show.id);

  // Fetch season episodes using SWR for automatic client-side caching
  const { data, isLoading: loadingEpisodes } = useSWR(
    `/api/tmdb?endpoint=/tv/${show.id}/season/${season}`,
    fetcher,
    {
      fallbackData: season === defaultSeason ? { episodes: initialEpisodes } : undefined,
      revalidateOnFocus: false,
    }
  );

  const episodes: Episode[] = data?.episodes || [];

  // Reset to episode 1 when season changes
  useEffect(() => {
    setEpisode(1);
  }, [season]);

  const handleWatchTrailer = async () => {
    if (youtubeKey) {
      setActiveYoutubeKey(youtubeKey);
      setOpen(true);
      return;
    }
    setTrailerLoading(true);
    try {
      const res = await fetch(`/api/tmdb?endpoint=/tv/${show.id}/videos`);
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
        alert('Sorry, no official trailer found for this TV show.');
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
      removeFromWatchlist(show.id);
    } else {
      addToWatchlist({
        ...show,
        media_type: 'tv',
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
              alt={show.name}
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
          <h1 className="mb-3 text-4xl font-bold">{show.name}</h1>

          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
            <span className="rounded bg-netflix-red/20 px-2 py-0.5 text-netflix-red font-medium">
              {formatRating(show.vote_average)}/10
            </span>
            <span>{formatYear(show.first_air_date)}</span>
            {show.number_of_seasons && (
              <>
                <span>•</span>
                <span>
                  {show.number_of_seasons} Season{show.number_of_seasons > 1 ? 's' : ''}
                </span>
              </>
            )}
            <span>•</span>
            <span>TV Show</span>
          </div>

          {show.genres && show.genres.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {show.genres.map((genre) => (
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
            {show.overview}
          </p>

          {/* Action buttons */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <button
              onClick={handlePlayNow}
              className="group flex items-center gap-3 rounded-lg bg-netflix-red px-8 py-3.5 font-semibold text-white shadow-lg shadow-netflix-red/25 transition hover:bg-netflix-redHover hover:shadow-xl hover:shadow-netflix-red/30 active:scale-[0.97]"
            >
              <svg className="h-5 w-5 transition group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play Now
            </button>

            <button
              onClick={handleWatchTrailer}
              disabled={trailerLoading}
              className="group flex items-center gap-3 rounded-lg bg-zinc-700/50 px-6 py-3.5 font-semibold text-white shadow-lg ring-1 ring-white/10 transition hover:bg-zinc-600/60 hover:ring-white/20 active:scale-[0.97] disabled:opacity-50"
            >
              <svg className="h-5 w-5 text-zinc-300 transition group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {trailerLoading ? 'Loading...' : 'Watch Trailer'}
            </button>

            <button
              onClick={handleWatchlistToggle}
              className={`group flex h-[50px] w-[50px] items-center justify-center rounded-lg border font-semibold shadow-lg transition active:scale-[0.97] ${
                isSaved
                  ? 'border-netflix-red bg-netflix-red/10 text-netflix-red hover:bg-netflix-red/20'
                  : 'border-zinc-600 bg-transparent text-zinc-300 hover:border-white hover:text-white'
              }`}
              title={isSaved ? 'Remove from My List' : 'Add to My List'}
            >
              {isSaved ? (
                <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              )}
            </button>
          </div>

          {/* Season / Episode selectors */}
          <div className="mb-6 flex flex-wrap items-center gap-3 border-t border-white/5 pt-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Season</span>
              <select
                value={season}
                onChange={(e) => setSeason(Number(e.target.value))}
                className="rounded-lg border border-zinc-700 bg-zinc-800/80 px-4 py-2.5 text-sm text-white outline-none transition focus:border-netflix-red cursor-pointer"
              >
                {show.seasons
                  ?.filter((s) => s.season_number > 0)
                  .map((s) => (
                    <option key={s.id} value={s.season_number}>
                      Season {s.season_number}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Episode</span>
              <select
                value={episode}
                onChange={(e) => setEpisode(Number(e.target.value))}
                disabled={loadingEpisodes}
                className="rounded-lg border border-zinc-700 bg-zinc-800/80 px-4 py-2.5 text-sm text-white outline-none transition focus:border-netflix-red disabled:opacity-50 cursor-pointer min-w-[200px]"
              >
                {loadingEpisodes ? (
                  <option>Loading...</option>
                ) : episodes.length > 0 ? (
                  episodes.map((ep) => (
                    <option key={ep.id} value={ep.episode_number}>
                      Ep {ep.episode_number} — {ep.name}
                    </option>
                  ))
                ) : (
                  <option>No episodes</option>
                )}
              </select>
            </div>
          </div>

          {/* Episode list */}
          {episodes.length > 0 && (
            <div className="mt-4">
              <h2 className="mb-3 text-lg font-semibold text-zinc-200">
                Season {season} Episode Guide
              </h2>
              <div className="max-h-[300px] space-y-2 overflow-y-auto pr-2">
                {episodes.map((ep) => (
                  <button
                    key={ep.id}
                    onClick={() => {
                      setEpisode(ep.episode_number);
                      setOpen(true);
                    }}
                    className={`w-full rounded-lg p-3 text-left transition hover:bg-zinc-700/50 ${
                      ep.episode_number === episode
                        ? 'bg-zinc-700/70 border border-netflix-red/30'
                        : 'bg-zinc-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-zinc-700 text-xs font-bold">
                        {ep.episode_number}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{ep.name}</p>
                        {ep.overview && (
                          <p className="mt-0.5 line-clamp-1 text-xs text-zinc-400">
                            {ep.overview}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <PlayerModal
        open={open}
        onClose={() => setOpen(false)}
        tmdbId={show.id}
        mediaType="tv"
        title={show.name}
        tvData={show}
        episodes={episodes}
        youtubeKey={activeYoutubeKey}
      />
    </>
  );
}

