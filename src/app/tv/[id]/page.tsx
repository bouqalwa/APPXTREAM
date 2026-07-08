import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { TVDetailClient } from '@/components/TVDetailClient';
import { getTVDetails, getTVSeasonEpisodes, getImageUrl } from '@/lib/tmdb';

export default async function TVPage({
  params,
}: {
  params: { id: string };
}) {
  let show;
  try {
    show = await getTVDetails(params.id);
  } catch {
    notFound();
  }

  if (!show || !show.id) notFound();

  const posterUrl = getImageUrl(show.poster_path, 'w500');

  // Pre-fetch initial season episodes on the server
  const defaultSeason =
    show.seasons?.find((s) => s.season_number > 0)?.season_number || 1;
  let initialEpisodes: any[] = [];
  try {
    const seasonData = await getTVSeasonEpisodes(
      String(show.id),
      String(defaultSeason)
    );
    initialEpisodes = seasonData.episodes || [];
  } catch {
    // Fallback: client will re-fetch if needed
  }

  return (
    <main className="min-h-screen bg-netflix-black text-white">
      <Navbar />
      <TVDetailClient
        show={show}
        posterUrl={posterUrl}
        initialEpisodes={initialEpisodes}
      />
    </main>
  );
}
