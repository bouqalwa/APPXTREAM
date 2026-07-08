import Link from 'next/link';

const FOOTER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'TV Shows', href: '/tv-shows' },
  { label: 'Movies', href: '/movies' },
  { label: 'My List', href: '/my-list' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-netflix-black/80">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="text-xl font-extrabold tracking-wider text-netflix-red"
            >
              STREAMFLIX
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
              Discover and stream thousands of movies and TV shows.
              Powered by TMDB.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Browse
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Info
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-zinc-500">Built with Next.js</span>
              </li>
              <li>
                <span className="text-sm text-zinc-500">Data from TMDB</span>
              </li>
              <li>
                <span className="text-sm text-zinc-500">Player by VidAPI</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-zinc-500">
                  This product uses the TMDB API but is not endorsed or certified by TMDB.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-zinc-600 sm:flex-row">
          <p>© {new Date().getFullYear()} StreamFlix. For educational purposes only.</p>
          <div className="flex items-center gap-1 text-zinc-600">
            Made with
            <svg className="mx-0.5 h-3 w-3 text-netflix-red" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            using Next.js
          </div>
        </div>
      </div>
    </footer>
  );
}
