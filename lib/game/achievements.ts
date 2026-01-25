import type { Achievement, PlayerStats, PlayerProgress } from '@/lib/types';

export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: Achievement['category'];
  requirement: number;
  checkUnlock: (stats: PlayerStats, progress: PlayerProgress) => boolean;
  getProgress: (stats: PlayerStats, progress: PlayerProgress) => number;
}

export const ACHIEVEMENTS: AchievementDefinition[] = [
  // ==================== VOLUME ACHIEVEMENTS ====================
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first quiz question',
    icon: '👣',
    category: 'volume',
    requirement: 1,
    checkUnlock: (stats) => stats.totalQuestionsAnswered >= 1,
    getProgress: (stats) => stats.totalQuestionsAnswered,
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Answer 10 questions',
    icon: '🎯',
    category: 'volume',
    requirement: 10,
    checkUnlock: (stats) => stats.totalQuestionsAnswered >= 10,
    getProgress: (stats) => stats.totalQuestionsAnswered,
  },
  {
    id: 'dedicated-student',
    title: 'Dedicated Student',
    description: 'Answer 50 questions',
    icon: '📚',
    category: 'volume',
    requirement: 50,
    checkUnlock: (stats) => stats.totalQuestionsAnswered >= 50,
    getProgress: (stats) => stats.totalQuestionsAnswered,
  },
  {
    id: 'centurion',
    title: 'Centurion',
    description: 'Answer 100 questions',
    icon: '💯',
    category: 'volume',
    requirement: 100,
    checkUnlock: (stats) => stats.totalQuestionsAnswered >= 100,
    getProgress: (stats) => stats.totalQuestionsAnswered,
  },
  {
    id: 'grinder',
    title: 'Grinder',
    description: 'Answer 500 questions',
    icon: '⚙️',
    category: 'volume',
    requirement: 500,
    checkUnlock: (stats) => stats.totalQuestionsAnswered >= 500,
    getProgress: (stats) => stats.totalQuestionsAnswered,
  },

  // ==================== ACCURACY ACHIEVEMENTS ====================
  {
    id: 'sharp-shooter',
    title: 'Sharp Shooter',
    description: 'Get 10 correct answers',
    icon: '🎯',
    category: 'accuracy',
    requirement: 10,
    checkUnlock: (stats) => stats.totalCorrect >= 10,
    getProgress: (stats) => stats.totalCorrect,
  },
  {
    id: 'precision-player',
    title: 'Precision Player',
    description: 'Get 50 correct answers',
    icon: '🏹',
    category: 'accuracy',
    requirement: 50,
    checkUnlock: (stats) => stats.totalCorrect >= 50,
    getProgress: (stats) => stats.totalCorrect,
  },
  {
    id: 'master-decision',
    title: 'Master of Decisions',
    description: 'Get 100 correct answers',
    icon: '🧠',
    category: 'accuracy',
    requirement: 100,
    checkUnlock: (stats) => stats.totalCorrect >= 100,
    getProgress: (stats) => stats.totalCorrect,
  },

  // ==================== STREAK ACHIEVEMENTS ====================
  {
    id: 'on-fire',
    title: 'On Fire',
    description: 'Get a streak of 5 correct answers',
    icon: '🔥',
    category: 'streaks',
    requirement: 5,
    checkUnlock: (stats) => stats.bestStreak >= 5,
    getProgress: (stats) => stats.bestStreak,
  },
  {
    id: 'hot-streak',
    title: 'Hot Streak',
    description: 'Get a streak of 10 correct answers',
    icon: '🌟',
    category: 'streaks',
    requirement: 10,
    checkUnlock: (stats) => stats.bestStreak >= 10,
    getProgress: (stats) => stats.bestStreak,
  },
  {
    id: 'unstoppable',
    title: 'Unstoppable',
    description: 'Get a streak of 15 correct answers',
    icon: '💫',
    category: 'streaks',
    requirement: 15,
    checkUnlock: (stats) => stats.bestStreak >= 15,
    getProgress: (stats) => stats.bestStreak,
  },
  {
    id: 'legendary',
    title: 'Legendary',
    description: 'Get a streak of 20 correct answers',
    icon: '👑',
    category: 'streaks',
    requirement: 20,
    checkUnlock: (stats) => stats.bestStreak >= 20,
    getProgress: (stats) => stats.bestStreak,
  },

  // ==================== MILESTONE ACHIEVEMENTS ====================
  {
    id: 'level-5',
    title: 'Rising Star',
    description: 'Reach level 5',
    icon: '⭐',
    category: 'milestones',
    requirement: 5,
    checkUnlock: (_, progress) => progress.level >= 5,
    getProgress: (_, progress) => progress.level,
  },
  {
    id: 'level-10',
    title: 'Expert Unlocked',
    description: 'Reach level 10 and unlock Expert difficulty',
    icon: '🎖️',
    category: 'milestones',
    requirement: 10,
    checkUnlock: (_, progress) => progress.level >= 10,
    getProgress: (_, progress) => progress.level,
  },
  {
    id: 'level-15',
    title: 'Poker Pro',
    description: 'Reach level 15',
    icon: '🏆',
    category: 'milestones',
    requirement: 15,
    checkUnlock: (_, progress) => progress.level >= 15,
    getProgress: (_, progress) => progress.level,
  },
  {
    id: 'level-20',
    title: 'Grand Master',
    description: 'Reach level 20',
    icon: '👑',
    category: 'milestones',
    requirement: 20,
    checkUnlock: (_, progress) => progress.level >= 20,
    getProgress: (_, progress) => progress.level,
  },
  {
    id: 'session-master',
    title: 'Session Master',
    description: 'Complete 10 quiz sessions',
    icon: '📋',
    category: 'milestones',
    requirement: 10,
    checkUnlock: (stats) => stats.totalSessions >= 10,
    getProgress: (stats) => stats.totalSessions,
  },
];

/**
 * Check which achievements should be unlocked
 */
export function checkNewAchievements(
  stats: PlayerStats,
  progress: PlayerProgress,
  alreadyUnlocked: string[]
): AchievementDefinition[] {
  return ACHIEVEMENTS.filter(
    (achievement) =>
      !alreadyUnlocked.includes(achievement.id) &&
      achievement.checkUnlock(stats, progress)
  );
}

/**
 * Get achievement by ID
 */
export function getAchievementById(id: string): AchievementDefinition | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id);
}

/**
 * Get achievement progress (for display)
 */
export function getAchievementProgress(
  achievement: AchievementDefinition,
  stats: PlayerStats,
  progress: PlayerProgress
): { current: number; target: number; percentage: number } {
  const current = achievement.getProgress(stats, progress);
  const target = achievement.requirement;
  const percentage = Math.min(100, Math.round((current / target) * 100));

  return { current, target, percentage };
}

/**
 * Get all achievements with their current status
 */
export function getAllAchievementsWithStatus(
  stats: PlayerStats,
  progress: PlayerProgress,
  unlockedIds: string[]
): Array<{
  definition: AchievementDefinition;
  isUnlocked: boolean;
  progress: { current: number; target: number; percentage: number };
}> {
  return ACHIEVEMENTS.map((definition) => ({
    definition,
    isUnlocked: unlockedIds.includes(definition.id),
    progress: getAchievementProgress(definition, stats, progress),
  }));
}

/**
 * Get achievements by category
 */
export function getAchievementsByCategory(
  category: Achievement['category']
): AchievementDefinition[] {
  return ACHIEVEMENTS.filter((a) => a.category === category);
}

/**
 * Convert AchievementDefinition to Achievement type (for store)
 */
export function toAchievement(
  definition: AchievementDefinition,
  unlockedAt?: Date
): Achievement {
  return {
    id: definition.id,
    title: definition.title,
    description: definition.description,
    icon: definition.icon,
    category: definition.category,
    requirement: definition.requirement,
    unlockedAt,
  };
}
