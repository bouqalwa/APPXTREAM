import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { MovieRow } from '@/components/MovieRow';
import { Footer } from '@/components/Footer';
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getMovieDiscover,
} from '@/lib/tmdb';

export const metadata = {
  title: 'Movies',
  description: 'Browse the latest, trending, and top rated movies on StreamFlix.',
};

export default async function MoviesPage() {
  const [
    trending,
    popular,
    topRated,
    action,
    comedy,
    horror,
    romance,
    sciFi,
    documentaries,
  ] = await Promise.all([
    getTrendingMovies(),
    getPopularMovies(),
    getTopRatedMovies(),
    getMovieDiscover('28'),    // Action
    getMovieDiscover('35'),    // Comedy
    getMovieDiscover('27'),    // Horror
    getMovieDiscover('10749'), // Romance
    getMovieDiscover('878'),   // Sci-Fi & Fantasy
    getMovieDiscover('99'),    // Documentary
  ]);

  // Pick a random trending or popular movie for the hero banner
  const heroCandidates = trending.length > 0 ? trending : popular;
  const heroItem = heroCandidates[Math.floor(Math.random() * Math.min(heroCandidates.length, 10))];

  return (
    <main className="min-h-screen bg-netflix-black text-white">
      <Navbar />
      {heroItem && <Hero item={heroItem} />}

      <div className="-mt-20 relative z-20 pb-16">
        <MovieRow id="trending-movies" title="Trending Movies" items={trending} />
        <MovieRow id="popular-movies" title="Popular Movies" items={popular} />
        <MovieRow id="top-rated-movies" title="Top Rated Movies" items={topRated} />
        <MovieRow id="action-movies" title="Action Thrillers" items={action} />
        <MovieRow id="comedy-movies" title="Comedies" items={comedy} />
        <MovieRow id="horror-movies" title="Scary Horror" items={horror} />
        <MovieRow id="romance-movies" title="Romance Movies" items={romance} />
        <MovieRow id="scifi-movies" title="Sci-Fi & Fantasy" items={sciFi} />
        <MovieRow id="documentary-movies" title="Documentaries" items={documentaries} />
      </div>
      <Footer />
    </main>
  );
}
