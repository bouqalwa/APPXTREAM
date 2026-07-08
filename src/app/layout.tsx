import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { WatchlistProvider } from '@/context/WatchlistContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'StreamFlix — Watch Movies & TV Shows',
    template: '%s | StreamFlix',
  },
  description:
    'StreamFlix lets you discover and watch thousands of movies and TV shows. Browse trending titles, top-rated films, and popular series — all in one place.',
  keywords: ['streaming', 'movies', 'TV shows', 'watch online', 'StreamFlix'],
  openGraph: {
    type: 'website',
    siteName: 'StreamFlix',
    title: 'StreamFlix — Watch Movies & TV Shows',
    description:
      'Discover and watch thousands of movies and TV shows on StreamFlix.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-netflix-black font-sans text-white antialiased">
        <WatchlistProvider>
          {children}
        </WatchlistProvider>
      </body>
    </html>
  );
}
