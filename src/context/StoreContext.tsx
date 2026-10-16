"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { defaultSiteConfig } from "../lib/config/siteConfig";
import { seasonalCollections } from "../lib/data/collections";
import { SeasonalCollection } from "../lib/types";

interface ToastMessage {
  id: string;
  message: string;
  type?: "success" | "info" | "warning";
}

interface StoreContextType {
  activeSeasonSlug: string;
  setActiveSeasonSlug: (slug: string) => void;
  activeCollection: SeasonalCollection;
  isSearchModalOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: "success" | "info" | "warning") => void;
  dismissToast: (id: string) => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const ACTIVE_SEASON_KEY = "sevak_active_season_v1";
const RECENT_SEARCHES_KEY = "sevak_recent_searches_v1";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [activeSeasonSlug, setActiveSeasonSlugState] = useState<string>(
    defaultSiteConfig.activeSeasonSlug
  );
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Oxidized earrings",
    "Navratri necklace",
    "Ked Kandoro",
    "Haathphool",
  ]);

  useEffect(() => {
    try {
      const storedSeason = localStorage.getItem(ACTIVE_SEASON_KEY);
      if (storedSeason) setActiveSeasonSlugState(storedSeason);

      const storedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (storedSearches) setRecentSearches(JSON.parse(storedSearches));
    } catch {}
  }, []);

  const setActiveSeasonSlug = (slug: string) => {
    setActiveSeasonSlugState(slug);
    try {
      localStorage.setItem(ACTIVE_SEASON_KEY, slug);
    } catch {}
  };

  const showToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addRecentSearch = (query: string) => {
    const clean = query.trim();
    if (!clean) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== clean.toLowerCase());
      const updated = [clean, ...filtered].slice(0, 8);
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch {}
  };

  const activeCollection =
    seasonalCollections.find((c) => c.slug === activeSeasonSlug) ||
    seasonalCollections[0];

  return (
    <StoreContext.Provider
      value={{
        activeSeasonSlug,
        setActiveSeasonSlug,
        activeCollection,
        isSearchModalOpen,
        openSearchModal: () => setIsSearchModalOpen(true),
        closeSearchModal: () => setIsSearchModalOpen(false),
        toasts,
        showToast,
        dismissToast,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
