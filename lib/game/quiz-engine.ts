import type { Scenario, ActionType, Difficulty, SessionConfig, SessionResult } from '@/lib/types';
import { scenarios } from '@/lib/data/scenarios';
import { calculateXPEarned } from './leveling';

/**
 * Evaluate if the player's action matches the optimal action
 */
export function evaluateAnswer(
  scenario: Scenario,
  playerAction: ActionType,
  _playerAmount?: number
): boolean {
  // For quiz purposes, we only check the action type, not the exact amount
  return playerAction === scenario.optimalAction;
}

/**
 * Create a session result from a player's answer
 */
export function createSessionResult(
  scenario: Scenario,
  playerAction: ActionType,
  streak: number,
  playerAmount?: number
): SessionResult {
  const isCorrect = evaluateAnswer(scenario, playerAction, playerAmount);
  const xpEarned = calculateXPEarned(isCorrect, scenario.difficulty, streak);

  return {
    scenarioId: scenario.id,
    playerAction,
    playerAmount,
    isCorrect,
    xpEarned,
  };
}

/**
 * Get a random scenario based on session config
 */
export function getRandomScenario(
  config: SessionConfig,
  excludeIds: string[] = []
): Scenario | null {
  let filteredScenarios = scenarios.filter((s) => !excludeIds.includes(s.id));

  // Filter by difficulty
  if (config.difficulty !== 'all') {
    filteredScenarios = filteredScenarios.filter(
      (s) => s.difficulty === config.difficulty
    );
  }

  // Filter by street
  if (config.streetFilter !== 'all') {
    if (config.streetFilter === 'postflop') {
      filteredScenarios = filteredScenarios.filter(
        (s) => s.street !== 'preflop'
      );
    } else {
      filteredScenarios = filteredScenarios.filter(
        (s) => s.street === config.streetFilter
      );
    }
  }

  // Filter by topics
  if (config.topics.length > 0) {
    filteredScenarios = filteredScenarios.filter((s) =>
      s.tags.some((tag) => config.topics.includes(tag))
    );
  }

  if (filteredScenarios.length === 0) {
    return null;
  }

  // Random selection
  const randomIndex = Math.floor(Math.random() * filteredScenarios.length);
  return filteredScenarios[randomIndex];
}

/**
 * Get scenarios for a full session
 */
export function getSessionScenarios(config: SessionConfig): Scenario[] {
  const selectedScenarios: Scenario[] = [];
  const usedIds: string[] = [];

  for (let i = 0; i < config.questionCount; i++) {
    const scenario = getRandomScenario(config, usedIds);
    if (scenario) {
      selectedScenarios.push(scenario);
      usedIds.push(scenario.id);
    } else {
      // If we run out of unique scenarios, allow repeats
      const anyScenario = getRandomScenario(config);
      if (anyScenario) {
        selectedScenarios.push(anyScenario);
      }
    }
  }

  return selectedScenarios;
}

/**
 * Calculate session statistics
 */
export function calculateSessionStats(results: SessionResult[]) {
  const totalQuestions = results.length;
  const correctCount = results.filter((r) => r.isCorrect).length;
  const accuracy = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
  const totalXP = results.reduce((sum, r) => sum + r.xpEarned, 0);

  // Calculate best streak
  let bestStreak = 0;
  let currentStreak = 0;
  for (const result of results) {
    if (result.isCorrect) {
      currentStreak++;
      bestStreak = Math.max(bestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  return {
    totalQuestions,
    correctCount,
    accuracy: Math.round(accuracy),
    totalXP,
    bestStreak,
  };
}

/**
 * Get the call amount for a scenario (for display purposes)
 */
export function getCallAmount(scenario: Scenario): number | undefined {
  // Find the last bet or raise action
  for (let i = scenario.actionHistory.length - 1; i >= 0; i--) {
    const action = scenario.actionHistory[i];
    if (
      (action.type === 'bet' || action.type === 'raise') &&
      action.amount !== undefined
    ) {
      // Find hero's current bet
      const heroPlayer = scenario.players.find((p) => p.isHero);
      const heroBet = heroPlayer?.currentBet ?? 0;
      return action.amount - heroBet;
    }
  }
  return undefined;
}

/**
 * Check if an action is valid for the current scenario
 */
export function isValidAction(scenario: Scenario, action: ActionType): boolean {
  return scenario.validActions.includes(action);
}

/**
 * Get available topics from all scenarios
 */
export function getAvailableTopics(): string[] {
  const topicsSet = new Set<string>();
  for (const scenario of scenarios) {
    for (const tag of scenario.tags) {
      topicsSet.add(tag);
    }
  }
  return Array.from(topicsSet).sort();
}

/**
 * Get scenarios by difficulty
 */
export function getScenariosByDifficulty(difficulty: Difficulty): Scenario[] {
  return scenarios.filter((s) => s.difficulty === difficulty);
}

/**
 * Count scenarios by difficulty
 */
export function countScenariosByDifficulty(): Record<Difficulty, number> {
  return {
    beginner: getScenariosByDifficulty('beginner').length,
    intermediate: getScenariosByDifficulty('intermediate').length,
    advanced: getScenariosByDifficulty('advanced').length,
    expert: getScenariosByDifficulty('expert').length,
  };
}
