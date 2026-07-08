import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { MovieRow } from '@/components/MovieRow';
import { Footer } from '@/components/Footer';
import {
  getTrendingTVShows,
  getPopularTVShows,
  getTVDiscover,
} from '@/lib/tmdb';

export const metadata = {
  title: 'TV Shows',
  description: 'Browse the latest, trending, and popular TV shows on StreamFlix.',
};

export default async function TVShowsPage() {
  const [
    trending,
    popular,
    actionAdventure,
    comedy,
    drama,
    sciFiFantasy,
    mysteryCrime,
  ] = await Promise.all([
    getTrendingTVShows(),
    getPopularTVShows(),
    getTVDiscover('10759'),  // Action & Adventure
    getTVDiscover('35'),     // Comedy
    getTVDiscover('18'),     // Drama
    getTVDiscover('10765'),  // Sci-Fi & Fantasy
    getTVDiscover('9648,80'), // Mystery & Crime
  ]);

  // Pick a random trending or popular show for the hero banner
  const heroCandidates = trending.length > 0 ? trending : popular;
  const heroItem = heroCandidates[Math.floor(Math.random() * Math.min(heroCandidates.length, 10))];

  return (
    <main className="min-h-screen bg-netflix-black text-white">
      <Navbar />
      {heroItem && <Hero item={heroItem} />}

      <div className="-mt-20 relative z-20 pb-16">
        <MovieRow id="trending-tv" title="Trending TV Shows" items={trending} />
        <MovieRow id="popular-tv" title="Popular TV Shows" items={popular} />
        <MovieRow id="action-tv" title="Action & Adventure TV" items={actionAdventure} />
        <MovieRow id="comedy-tv" title="Comedy TV Shows" items={comedy} />
        <MovieRow id="drama-tv" title="Dramatic TV Shows" items={drama} />
        <MovieRow id="scifi-tv" title="Sci-Fi & Fantasy TV" items={sciFiFantasy} />
        <MovieRow id="mystery-tv" title="Mystery & Crime TV" items={mysteryCrime} />
      </div>
      <Footer />
    </main>
  );
}
