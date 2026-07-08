'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { BaseMedia } from '@/types';

interface WatchlistContextType {
  watchlist: BaseMedia[];
  addToWatchlist: (item: BaseMedia) => void;
  removeFromWatchlist: (id: number) => void;
  inWatchlist: (id: number) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<BaseMedia[]>([]);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('streamflix_watchlist');
      if (stored) {
        setWatchlist(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load watchlist from localStorage', e);
    }
  }, []);

  // Save watchlist to localStorage when it changes
  const saveWatchlist = (newList: BaseMedia[]) => {
    setWatchlist(newList);
    try {
      localStorage.setItem('streamflix_watchlist', JSON.stringify(newList));
    } catch (e) {
      console.error('Failed to save watchlist to localStorage', e);
    }
  };

  const addToWatchlist = (item: BaseMedia) => {
    if (watchlist.some((x) => x.id === item.id)) return;
    // Ensure media_type is present for later routing
    const itemWithMediaType = { ...item };
    if (!itemWithMediaType.media_type) {
      // Guess media type based on fields
      itemWithMediaType.media_type = item.title ? 'movie' : 'tv';
    }
    const newList = [itemWithMediaType, ...watchlist];
    saveWatchlist(newList);
  };

  const removeFromWatchlist = (id: number) => {
    const newList = watchlist.filter((x) => x.id !== id);
    saveWatchlist(newList);
  };

  const inWatchlist = (id: number) => {
    return watchlist.some((x) => x.id === id);
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        inWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}
