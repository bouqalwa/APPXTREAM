'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SearchBar } from './SearchBar';
import { useWatchlist } from '@/context/WatchlistContext';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'TV Shows', href: '/tv-shows' },
  { label: 'Movies', href: '/movies' },
  { label: 'My List', href: '/my-list' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { watchlist } = useWatchlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-lg shadow-black/20'
            : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-wider text-netflix-red transition hover:opacity-90"
          >
            STREAMFLIX
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'text-white bg-white/5 font-semibold'
                      : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.label === 'My List' && watchlist.length > 0 && (
                    <span className="ml-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-netflix-red px-1 text-[9px] font-bold text-white animate-pulse-glow">
                      {watchlist.length}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <SearchBar />
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-300 transition hover:bg-white/10 hover:text-white md:hidden"
            >
              {mobileOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="absolute right-0 top-0 flex h-full w-64 flex-col bg-netflix-dark/95 backdrop-blur-xl pt-20 shadow-2xl animate-slide-in-right">
            <div className="px-4 pb-4 sm:hidden">
              <SearchBar />
            </div>
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between border-b border-white/5 px-6 py-4 text-sm font-medium transition ${
                    isActive
                      ? 'bg-white/5 text-white font-semibold border-l-4 border-l-netflix-red'
                      : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.label === 'My List' && watchlist.length > 0 && (
                    <span className="rounded-full bg-netflix-red px-2 py-0.5 text-xs font-bold text-white">
                      {watchlist.length}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
