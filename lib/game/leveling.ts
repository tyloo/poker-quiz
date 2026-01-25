import type { Difficulty } from '@/lib/types';

// XP thresholds for each level (exponential curve)
// Level 1 starts at 0 XP, Level 2 at 100 XP, etc.
export const LEVEL_THRESHOLDS: number[] = [
  0,      // Level 1
  100,    // Level 2
  250,    // Level 3
  500,    // Level 4
  850,    // Level 5
  1300,   // Level 6
  1900,   // Level 7
  2650,   // Level 8
  3550,   // Level 9
  4600,   // Level 10
  5850,   // Level 11
  7300,   // Level 12
  8950,   // Level 13
  10800,  // Level 14
  12850,  // Level 15
  15100,  // Level 16
  17550,  // Level 17
  20200,  // Level 18
  23050,  // Level 19
  26100,  // Level 20
];

export const MAX_LEVEL = LEVEL_THRESHOLDS.length;

// XP rewards
export const BASE_XP_CORRECT = 10;
export const BASE_XP_INCORRECT = 2; // Small XP for participating

// Difficulty multipliers
export const DIFFICULTY_XP_MULTIPLIER: Record<Difficulty, number> = {
  beginner: 1.0,
  intermediate: 1.5,
  advanced: 2.0,
  expert: 3.0,
};

// Streak bonuses
export const STREAK_BONUS_THRESHOLDS = [
  { streak: 3, bonus: 5 },
  { streak: 5, bonus: 10 },
  { streak: 10, bonus: 25 },
  { streak: 15, bonus: 50 },
  { streak: 20, bonus: 100 },
];

// Difficulty unlock requirements (level needed to unlock)
export const DIFFICULTY_UNLOCK_LEVELS: Record<Difficulty, number> = {
  beginner: 1,
  intermediate: 3,
  advanced: 6,
  expert: 10,
};

/**
 * Calculate the player's level from total XP
 */
export function calculateLevel(totalXP: number): number {
  let level = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (totalXP >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  return Math.min(level, MAX_LEVEL);
}

/**
 * Calculate XP needed to reach the next level
 */
export function xpToNextLevel(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);
  if (currentLevel >= MAX_LEVEL) {
    return 0; // Max level reached
  }
  return LEVEL_THRESHOLDS[currentLevel] - totalXP;
}

/**
 * Get XP progress within current level (0-100%)
 */
export function levelProgress(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);
  if (currentLevel >= MAX_LEVEL) {
    return 100;
  }

  const currentLevelXP = LEVEL_THRESHOLDS[currentLevel - 1];
  const nextLevelXP = LEVEL_THRESHOLDS[currentLevel];
  const xpInCurrentLevel = totalXP - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;

  return Math.round((xpInCurrentLevel / xpNeededForLevel) * 100);
}

/**
 * Get total XP required for a specific level
 */
export function xpForLevel(level: number): number {
  if (level < 1) return 0;
  if (level > MAX_LEVEL) return LEVEL_THRESHOLDS[MAX_LEVEL - 1];
  return LEVEL_THRESHOLDS[level - 1];
}

/**
 * Check if a level up occurred
 */
export function checkLevelUp(previousXP: number, newXP: number): boolean {
  const previousLevel = calculateLevel(previousXP);
  const newLevel = calculateLevel(newXP);
  return newLevel > previousLevel;
}

/**
 * Calculate XP earned for answering a question
 */
export function calculateXPEarned(
  isCorrect: boolean,
  difficulty: Difficulty,
  streak: number
): number {
  const baseXP = isCorrect ? BASE_XP_CORRECT : BASE_XP_INCORRECT;
  const difficultyMultiplier = DIFFICULTY_XP_MULTIPLIER[difficulty];

  let xp = Math.round(baseXP * difficultyMultiplier);

  // Add streak bonus (only for correct answers)
  if (isCorrect) {
    const streakBonus = getStreakBonus(streak);
    xp += streakBonus;
  }

  return xp;
}

/**
 * Get streak bonus based on current streak
 */
export function getStreakBonus(streak: number): number {
  let bonus = 0;
  for (const threshold of STREAK_BONUS_THRESHOLDS) {
    if (streak >= threshold.streak) {
      bonus = threshold.bonus;
    }
  }
  return bonus;
}

/**
 * Check if a difficulty is unlocked at a given level
 */
export function isDifficultyUnlocked(difficulty: Difficulty, level: number): boolean {
  return level >= DIFFICULTY_UNLOCK_LEVELS[difficulty];
}

/**
 * Get all unlocked difficulties for a given level
 */
export function getUnlockedDifficulties(level: number): Difficulty[] {
  const difficulties: Difficulty[] = ['beginner', 'intermediate', 'advanced', 'expert'];
  return difficulties.filter(d => isDifficultyUnlocked(d, level));
}

/**
 * Get the next difficulty to unlock and level required
 */
export function getNextDifficultyUnlock(level: number): { difficulty: Difficulty; level: number } | null {
  const difficulties: Difficulty[] = ['beginner', 'intermediate', 'advanced', 'expert'];

  for (const difficulty of difficulties) {
    const requiredLevel = DIFFICULTY_UNLOCK_LEVELS[difficulty];
    if (level < requiredLevel) {
      return { difficulty, level: requiredLevel };
    }
  }

  return null; // All difficulties unlocked
}

/**
 * Format XP for display
 */
export function formatXP(xp: number): string {
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}k`;
  }
  return xp.toString();
}
