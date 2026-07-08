import { Navbar } from '@/components/Navbar';
import { MovieCard } from '@/components/MovieCard';
import { searchTitles } from '@/lib/tmdb';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || '';
  const results = query ? await searchTitles(query) : [];

  return (
    <main className="min-h-screen bg-netflix-black text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-28 md:px-8">
        <h1 className="mb-6 text-3xl font-bold">
          Search Results {query ? `for "${query}"` : ''}
        </h1>

        {results.length === 0 ? (
          <p className="text-zinc-400">No results found.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {results.map((item) => (
              <MovieCard key={`${item.media_type}-${item.id}`} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
