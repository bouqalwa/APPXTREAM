import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { MovieDetailClient } from '@/components/MovieDetailClient';
import { getMovieDetails, getImageUrl } from '@/lib/tmdb';

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  let movie;
  try {
    movie = await getMovieDetails(params.id);
  } catch {
    notFound();
  }

  if (!movie || !movie.id) notFound();

  const posterUrl = getImageUrl(movie.poster_path, 'w500');

  return (
    <main className="min-h-screen bg-netflix-black text-white">
      <Navbar />
      <MovieDetailClient movie={movie} posterUrl={posterUrl} />
    </main>
  );
}
