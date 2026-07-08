'use client';

import { useEffect, useRef, useMemo, useState, useCallback } from 'react';
import { TVShow, Episode } from '@/types';

type MediaType = 'movie' | 'tv';

interface PlayerModalProps {
  open: boolean;
  onClose: () => void;
  tmdbId: number;
  mediaType: MediaType;
  title: string;
  tvData?: TVShow;
  episodes?: Episode[];
  youtubeKey?: string | null;
}

export function PlayerModal({
  open,
  onClose,
  tmdbId,
  mediaType,
  title,
  tvData,
  episodes = [],
  youtubeKey = null,
}: PlayerModalProps) {
  const initialSeason =
    tvData?.seasons?.find((s) => s.season_number > 0)?.season_number || 1;
  const [season, setSeason] = useState(initialSeason);
  const [episode, setEpisode] = useState(1);
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const iframeSrc = useMemo(() => {
    if (youtubeKey) {
      return `https://www.youtube.com/embed/${youtubeKey}?autoplay=1&rel=0`;
    }
    if (mediaType === 'movie') {
      return `https://vaplayer.ru/embed/movie/${tmdbId}`;
    }
    return `https://vaplayer.ru/embed/tv/${tmdbId}/${season}/${episode}`;
  }, [mediaType, tmdbId, season, episode, youtubeKey]);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // Trigger animation
      requestAnimationFrame(() => setIsAnimating(true));
    } else {
      setIsAnimating(false);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  // Close on click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  // Focus trap
  useEffect(() => {
    if (open && modalRef.current) {
      const firstFocusable = modalRef.current.querySelector<HTMLElement>(
        'button, select, input, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        isAnimating ? 'bg-black/85 backdrop-blur-sm' : 'bg-black/0'
      }`}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Player: ${title}`}
        className={`relative w-full max-w-6xl rounded-xl bg-netflix-dark shadow-2xl ring-1 ring-white/10 transition-all duration-300 ${
          isAnimating
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-95 opacity-0 translate-y-4'
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close player"
          className="absolute -right-2 -top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-white shadow-lg ring-1 ring-white/10 transition hover:bg-netflix-red hover:ring-netflix-red/50"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-5">
          <h2 className="mb-4 text-xl font-bold">{title}</h2>

          {mediaType === 'tv' && tvData?.seasons?.length ? (
            <div className="mb-4 flex flex-wrap gap-3">
              <select
                value={season}
                onChange={(e) => {
                  setSeason(Number(e.target.value));
                  setEpisode(1);
                }}
                className="rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-sm text-white outline-none transition focus:border-netflix-red"
              >
                {tvData.seasons
                  .filter((s) => s.season_number > 0)
                  .map((s) => (
                    <option key={s.id} value={s.season_number}>
                      Season {s.season_number}
                    </option>
                  ))}
              </select>

              <select
                value={episode}
                onChange={(e) => setEpisode(Number(e.target.value))}
                className="rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-sm text-white outline-none transition focus:border-netflix-red"
              >
                {episodes.length > 0
                  ? episodes.map((ep) => (
                      <option key={ep.id} value={ep.episode_number}>
                        Ep {ep.episode_number} — {ep.name}
                      </option>
                    ))
                  : Array.from({ length: 20 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Episode {i + 1}
                      </option>
                    ))}
              </select>
            </div>
          ) : null}

          <div className="aspect-video w-full overflow-hidden rounded-lg bg-black ring-1 ring-white/5">
            <iframe
              src={iframeSrc}
              width="100%"
              height="100%"
              allowFullScreen
              allow="autoplay; encrypted-media; fullscreen"
              title={title}
              className="h-full w-full border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
