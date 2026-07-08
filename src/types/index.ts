export interface BaseMedia {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids?: number[];
  genres?: Genre[];
  media_type?: 'movie' | 'tv';
}

export interface Movie extends BaseMedia {
  title: string;
  media_type: 'movie';
  runtime?: number;
}

export interface TVShow extends BaseMedia {
  name: string;
  media_type: 'tv';
  number_of_seasons?: number;
  number_of_episodes?: number;
  seasons?: Season[];
}

export interface Season {
  id: number;
  name: string;
  season_number: number;
  episode_count: number;
}

export interface Episode {
  id: number;
  name: string;
  episode_number: number;
  season_number: number;
  overview: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
