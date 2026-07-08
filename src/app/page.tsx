import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { MovieRow } from '@/components/MovieRow';
import { Footer } from '@/components/Footer';
import {
  getTrending,
  getPopularTVShows,
  getTopRatedMovies,
  getActionThrillers,
  getMovieDiscover,
} from '@/lib/tmdb';

export default async function HomePage() {
  const [
    trending,
    topRatedMovies,
    popularTV,
    actionThrillers,
    comedyMovies,
    horrorMovies,
    sciFiMovies,
  ] = await Promise.all([
    getTrending(),
    getTopRatedMovies(),
    getPopularTVShows(),
    getActionThrillers(),
    getMovieDiscover('35'),  // Comedy
    getMovieDiscover('27'),  // Horror
    getMovieDiscover('878'), // Sci-Fi & Fantasy
  ]);

  const heroItem = trending[0];
  const trendingFiltered = trending.slice(0, 15);

  return (
    <main className="min-h-screen bg-netflix-black text-white">
      <Navbar />
      {heroItem && <Hero item={heroItem} />}

      <div className="-mt-20 relative z-20 pb-16">
        <MovieRow id="trending" title="Trending Now" items={trendingFiltered} />
        <MovieRow id="movies" title="Top Rated Movies" items={topRatedMovies} />
        <MovieRow id="tv" title="Popular TV Shows" items={popularTV} />
        <MovieRow id="action" title="Action & Thriller" items={actionThrillers} />
        <MovieRow id="comedy" title="Comedies" items={comedyMovies} />
        <MovieRow id="scifi" title="Sci-Fi & Fantasy" items={sciFiMovies} />
        <MovieRow id="horror" title="Scary Movies" items={horrorMovies} />
      </div>
      <Footer />
    </main>
  );
}
