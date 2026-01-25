import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  Scenario,
  ActionType,
  Difficulty,
  Street,
  Session,
  SessionConfig,
  SessionResult,
  PlayerStats,
  PlayerProgress,
  PlayerSettings,
  Achievement,
} from '@/lib/types';

// Default stats structure
const createDefaultStats = (): PlayerStats => ({
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
});

// Default progress structure
const createDefaultProgress = (): PlayerProgress => ({
  level: 1,
  xp: 0,
  achievements: [],
  stats: createDefaultStats(),
  unlockedDifficulties: ['beginner'],
});

// Default settings structure
const createDefaultSettings = (): PlayerSettings => ({
  defaultSessionLength: 10,
  defaultDifficulty: 'beginner',
  streetFilter: 'all',
  topics: [],
  soundEnabled: true,
  reducedMotion: false,
});

// Game State Slice
interface GameState {
  currentScenario: Scenario | null;
  isAnswered: boolean;
  selectedAction: ActionType | null;
  selectedAmount: number | null;
  isCorrect: boolean | null;
  feedback: string | null;
}

// Session State Slice
interface SessionState {
  session: Session | null;
  isSessionActive: boolean;
}

// Player State Slice
interface PlayerState {
  progress: PlayerProgress;
  settings: PlayerSettings;
  pendingAchievements: Achievement[];
}

// Combined Store State
interface GameStoreState extends GameState, SessionState, PlayerState {
  // Game Actions
  setScenario: (scenario: Scenario) => void;
  submitAnswer: (action: ActionType, amount?: number) => void;
  clearAnswer: () => void;

  // Session Actions
  startSession: (config: SessionConfig) => void;
  nextQuestion: (scenario: Scenario) => void;
  endSession: () => void;
  recordResult: (result: SessionResult) => void;

  // Player Actions
  addXP: (amount: number) => void;
  unlockAchievement: (achievement: Achievement) => void;
  clearPendingAchievements: () => void;
  updateStats: (
    difficulty: Difficulty,
    street: Street,
    optimalAction: ActionType,
    isCorrect: boolean
  ) => void;
  unlockDifficulty: (difficulty: Difficulty) => void;
  updateSettings: (settings: Partial<PlayerSettings>) => void;
  resetProgress: () => void;
}

export const useGameStore = create<GameStoreState>()(
  persist(
    (set, get) => ({
      // Initial Game State
      currentScenario: null,
      isAnswered: false,
      selectedAction: null,
      selectedAmount: null,
      isCorrect: null,
      feedback: null,

      // Initial Session State
      session: null,
      isSessionActive: false,

      // Initial Player State
      progress: createDefaultProgress(),
      settings: createDefaultSettings(),
      pendingAchievements: [],

      // Game Actions
      setScenario: (scenario) =>
        set({
          currentScenario: scenario,
          isAnswered: false,
          selectedAction: null,
          selectedAmount: null,
          isCorrect: null,
          feedback: null,
        }),

      submitAnswer: (action, amount) => {
        const { currentScenario } = get();
        if (!currentScenario) return;

        const isCorrect = action === currentScenario.optimalAction;
        set({
          isAnswered: true,
          selectedAction: action,
          selectedAmount: amount ?? null,
          isCorrect,
          feedback: currentScenario.explanation,
        });
      },

      clearAnswer: () =>
        set({
          isAnswered: false,
          selectedAction: null,
          selectedAmount: null,
          isCorrect: null,
          feedback: null,
        }),

      // Session Actions
      startSession: (config) => {
        const newSession: Session = {
          id: crypto.randomUUID(),
          config,
          startedAt: new Date(),
          results: [],
          currentQuestionIndex: 0,
          streak: 0,
          completed: false,
        };
        set({
          session: newSession,
          isSessionActive: true,
          currentScenario: null,
          isAnswered: false,
          selectedAction: null,
          selectedAmount: null,
          isCorrect: null,
          feedback: null,
        });
      },

      nextQuestion: (scenario) => {
        const { session } = get();
        if (!session) return;

        set({
          session: {
            ...session,
            currentQuestionIndex: session.currentQuestionIndex + 1,
          },
          currentScenario: scenario,
          isAnswered: false,
          selectedAction: null,
          selectedAmount: null,
          isCorrect: null,
          feedback: null,
        });
      },

      endSession: () => {
        const { session, progress } = get();
        if (!session) return;

        set({
          session: { ...session, completed: true },
          isSessionActive: false,
          progress: {
            ...progress,
            stats: {
              ...progress.stats,
              totalSessions: progress.stats.totalSessions + 1,
            },
          },
        });
      },

      recordResult: (result) => {
        const { session, progress } = get();
        if (!session) return;

        const newStreak = result.isCorrect ? session.streak + 1 : 0;
        const newBestStreak = Math.max(progress.stats.bestStreak, newStreak);

        set({
          session: {
            ...session,
            results: [...session.results, result],
            streak: newStreak,
          },
          progress: {
            ...progress,
            stats: {
              ...progress.stats,
              bestStreak: newBestStreak,
            },
          },
        });
      },

      // Player Actions
      addXP: (amount) => {
        const { progress } = get();
        set({
          progress: {
            ...progress,
            xp: progress.xp + amount,
          },
        });
      },

      unlockAchievement: (achievement) => {
        const { progress, pendingAchievements } = get();
        if (progress.achievements.includes(achievement.id)) return;

        set({
          progress: {
            ...progress,
            achievements: [...progress.achievements, achievement.id],
          },
          pendingAchievements: [
            ...pendingAchievements,
            { ...achievement, unlockedAt: new Date() },
          ],
        });
      },

      clearPendingAchievements: () => set({ pendingAchievements: [] }),

      updateStats: (difficulty, street, optimalAction, isCorrect) => {
        const { progress } = get();
        const { stats } = progress;

        set({
          progress: {
            ...progress,
            stats: {
              ...stats,
              totalQuestionsAnswered: stats.totalQuestionsAnswered + 1,
              totalCorrect: stats.totalCorrect + (isCorrect ? 1 : 0),
              statsByDifficulty: {
                ...stats.statsByDifficulty,
                [difficulty]: {
                  answered: stats.statsByDifficulty[difficulty].answered + 1,
                  correct:
                    stats.statsByDifficulty[difficulty].correct +
                    (isCorrect ? 1 : 0),
                },
              },
              statsByStreet: {
                ...stats.statsByStreet,
                [street]: {
                  answered: stats.statsByStreet[street].answered + 1,
                  correct:
                    stats.statsByStreet[street].correct + (isCorrect ? 1 : 0),
                },
              },
              statsByAction: {
                ...stats.statsByAction,
                [optimalAction]: {
                  answered: stats.statsByAction[optimalAction].answered + 1,
                  correct:
                    stats.statsByAction[optimalAction].correct +
                    (isCorrect ? 1 : 0),
                },
              },
            },
          },
        });
      },

      unlockDifficulty: (difficulty) => {
        const { progress } = get();
        if (progress.unlockedDifficulties.includes(difficulty)) return;

        set({
          progress: {
            ...progress,
            unlockedDifficulties: [...progress.unlockedDifficulties, difficulty],
          },
        });
      },

      updateSettings: (newSettings) => {
        const { settings } = get();
        set({
          settings: { ...settings, ...newSettings },
        });
      },

      resetProgress: () => {
        set({
          progress: createDefaultProgress(),
          session: null,
          isSessionActive: false,
          currentScenario: null,
          isAnswered: false,
          selectedAction: null,
          selectedAmount: null,
          isCorrect: null,
          feedback: null,
        });
      },
    }),
    {
      name: 'poker-quiz-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        progress: state.progress,
        settings: state.settings,
      }),
    }
  )
);

// Selector hooks for common operations
export const useCurrentScenario = () =>
  useGameStore((state) => state.currentScenario);
export const useSession = () => useGameStore((state) => state.session);
export const usePlayerProgress = () => useGameStore((state) => state.progress);
export const usePlayerSettings = () => useGameStore((state) => state.settings);
export const usePendingAchievements = () =>
  useGameStore((state) => state.pendingAchievements);
export const useIsSessionActive = () =>
  useGameStore((state) => state.isSessionActive);
