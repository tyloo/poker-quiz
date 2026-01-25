'use client';

import { useSyncExternalStore } from 'react';
import { useGameStore as useGameStoreBase } from '@/lib/store/game-store';
import type { PlayerProgress, PlayerSettings } from '@/lib/types';

// Default values for SSR
const DEFAULT_PROGRESS: PlayerProgress = {
  level: 1,
  xp: 0,
  achievements: [],
  stats: {
    totalQuestionsAnswered: 0,
    totalCorrect: 0,
    bestStreak: 0,
    totalSessions: 0,
    statsByDifficulty: {
      beginner: { answered: 0, correct: 0 },
      intermediate: { answered: 0, correct: 0 },
      advanced: { answered: 0, correct: 0 },
      expert: { answered: 0, correct: 0 },
    },
    statsByStreet: {
      preflop: { answered: 0, correct: 0 },
      flop: { answered: 0, correct: 0 },
      turn: { answered: 0, correct: 0 },
      river: { answered: 0, correct: 0 },
    },
    statsByAction: {
      fold: { answered: 0, correct: 0 },
      check: { answered: 0, correct: 0 },
      call: { answered: 0, correct: 0 },
      raise: { answered: 0, correct: 0 },
      bet: { answered: 0, correct: 0 },
      'all-in': { answered: 0, correct: 0 },
    },
  },
  unlockedDifficulties: ['beginner'],
};

const DEFAULT_SETTINGS: PlayerSettings = {
  defaultSessionLength: 10,
  defaultDifficulty: 'beginner',
  streetFilter: 'all',
  topics: [],
  soundEnabled: true,
  reducedMotion: false,
};

// Hydration state using module-level variable
const isClientHydrated = typeof window !== 'undefined';

function subscribeToNothing() {
  return () => {};
}

function getIsHydrated() {
  return isClientHydrated;
}

function getIsHydratedServer() {
  return false;
}

/**
 * Hook to check if store is hydrated from localStorage
 */
export function useStoreHydration(): boolean {
  return useSyncExternalStore(subscribeToNothing, getIsHydrated, getIsHydratedServer);
}

/**
 * Hook to get player progress with SSR safety
 */
export function usePlayerProgressHydrated(): PlayerProgress {
  const isHydrated = useStoreHydration();
  const progress = useGameStoreBase((state) => state.progress);

  return isHydrated ? progress : DEFAULT_PROGRESS;
}

/**
 * Hook to get player settings with SSR safety
 */
export function usePlayerSettingsHydrated(): PlayerSettings {
  const isHydrated = useStoreHydration();
  const settings = useGameStoreBase((state) => state.settings);

  return isHydrated ? settings : DEFAULT_SETTINGS;
}

/**
 * Hook to safely use the game store with SSR support.
 * Returns default values during SSR to avoid hydration mismatches.
 */
export function useGameStoreHydrated() {
  const isHydrated = useStoreHydration();
  const store = useGameStoreBase();

  if (!isHydrated) {
    // Return safe defaults during SSR
    return {
      ...store,
      progress: DEFAULT_PROGRESS,
      settings: DEFAULT_SETTINGS,
    };
  }

  return store;
}

// Re-export the base store for non-hydration-sensitive usage
export { useGameStoreBase as useGameStore };
