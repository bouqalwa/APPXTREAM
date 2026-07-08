import { Movie, TVShow, BaseMedia, TMDBResponse, Episode } from '@/types';

const API_KEY = process.env.TMDB_API_KEY;
if (!API_KEY) {
  // Don't throw at import time in case other tooling reads this file; warn clearly.
  // Server code will throw when a request is attempted without a key.
  // This helps surface a clear message instead of a low-level 401 from TMDB.
  console.warn(
    'TMDB_API_KEY is not set. Add it to .env.local or your environment. TMDB requests will fail with a clear message.'
  );
}
const BASE_URL = process.env.TMDB_API_BASE_URL || 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = process.env.TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

async function tmdbFetch<T>(endpoint: string, params: Record<string, string> = {}) {
  if (!API_KEY) {
    throw new Error(
      'Missing TMDB_API_KEY. Create a .env.local with TMDB_API_KEY=<your_key> or set the environment variable.'
    );
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', 'en-US');

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const res = await fetch(url.toString(), {
    next: { revalidate: 1800 },
  });

  if (!res.ok) {
    throw new Error(`TMDB error: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export function getImageUrl(path: string | null | undefined, size = 'w500'): string | null {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export async function getTrending() {
  const data = await tmdbFetch<TMDBResponse<BaseMedia>>('/trending/all/week');
  return data.results.filter((item) => item.media_type === 'movie' || item.media_type === 'tv');
}

export async function getTopRatedMovies() {
  const data = await tmdbFetch<TMDBResponse<Movie>>('/movie/top_rated');
  return data.results.map((item) => ({ ...item, media_type: 'movie' as const }));
}

export async function getPopularMovies() {
  const data = await tmdbFetch<TMDBResponse<Movie>>('/movie/popular');
  return data.results.map((item) => ({ ...item, media_type: 'movie' as const }));
}

export async function getPopularTVShows() {
  const data = await tmdbFetch<TMDBResponse<TVShow>>('/tv/popular');
  return data.results.map((item) => ({ ...item, media_type: 'tv' as const }));
}

export async function getActionThrillers() {
  const data = await tmdbFetch<TMDBResponse<Movie>>('/discover/movie', {
    with_genres: '28,53',
    sort_by: 'popularity.desc',
  });
  return data.results.map((item) => ({ ...item, media_type: 'movie' as const }));
}

export async function searchTitles(query: string) {
  const data = await tmdbFetch<TMDBResponse<BaseMedia>>('/search/multi', {
    query,
    include_adult: 'false',
  });

  return data.results.filter((item) => item.media_type === 'movie' || item.media_type === 'tv');
}

export async function getMovieDetails(id: string) {
  return tmdbFetch<Movie>(`/movie/${id}`);
}

export async function getTVDetails(id: string) {
  return tmdbFetch<TVShow>(`/tv/${id}`);
}

export async function getTVSeasonEpisodes(tvId: string, seasonNumber: string) {
  return tmdbFetch<{ episodes: Episode[] }>(`/tv/${tvId}/season/${seasonNumber}`);
}

export async function getMovieDiscover(genreIds: string) {
  const data = await tmdbFetch<TMDBResponse<Movie>>('/discover/movie', {
    with_genres: genreIds,
    sort_by: 'popularity.desc',
  });
  return data.results.map((item) => ({ ...item, media_type: 'movie' as const }));
}

export async function getTVDiscover(genreIds: string) {
  const data = await tmdbFetch<TMDBResponse<TVShow>>('/discover/tv', {
    with_genres: genreIds,
    sort_by: 'popularity.desc',
  });
  return data.results.map((item) => ({ ...item, media_type: 'tv' as const }));
}

export async function getTrendingMovies() {
  const data = await tmdbFetch<TMDBResponse<Movie>>('/trending/movie/week');
  return data.results.map((item) => ({ ...item, media_type: 'movie' as const }));
}

export async function getTrendingTVShows() {
  const data = await tmdbFetch<TMDBResponse<TVShow>>('/trending/tv/week');
  return data.results.map((item) => ({ ...item, media_type: 'tv' as const }));
}

export async function getMovieVideos(id: string) {
  return tmdbFetch<{ results: { key: string; name: string; site: string; type: string }[] }>(
    `/movie/${id}/videos`
  );
}

export async function getTVVideos(id: string) {
  return tmdbFetch<{ results: { key: string; name: string; site: string; type: string }[] }>(
    `/tv/${id}/videos`
  );
}

