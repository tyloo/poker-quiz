import type { Card, Rank, Suit, Scenario, Difficulty } from '@/lib/types';

// Hand range definitions for different hand types
type HandRange = {
  type: 'pair' | 'suited' | 'offsuit' | 'any';
  minRank?: Rank;
  maxRank?: Rank;
  exactRanks?: Rank[];
};

const RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];

const RANK_VALUES: Record<Rank, number> = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'T': 10,
  'J': 11, 'Q': 12, 'K': 13, 'A': 14,
};

/**
 * Hand ranges by category for randomization
 */
export const HAND_RANGES = {
  premiumPairs: { type: 'pair', exactRanks: ['A', 'K', 'Q', 'J', 'T'] } as HandRange,
  mediumPairs: { type: 'pair', exactRanks: ['9', '8', '7', '6'] } as HandRange,
  smallPairs: { type: 'pair', exactRanks: ['5', '4', '3', '2'] } as HandRange,
  broadwaySuited: { type: 'suited', minRank: 'T' } as HandRange,
  suitedConnectors: { type: 'suited' } as HandRange,
  broadwayOffsuit: { type: 'offsuit', minRank: 'T' } as HandRange,
};

/**
 * Generate a random integer between min and max (inclusive)
 */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Pick a random element from an array
 */
function randomElement<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

/**
 * Shuffle an array (Fisher-Yates)
 */
function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Generate a random card
 */
function randomCard(excludeCards: Card[] = []): Card {
  const excludeSet = new Set(excludeCards.map((c) => `${c.rank}${c.suit}`));
  let card: Card;
  do {
    card = {
      rank: randomElement(RANKS),
      suit: randomElement(SUITS),
    };
  } while (excludeSet.has(`${card.rank}${card.suit}`));
  return card;
}

/**
 * Generate a pair of cards matching a hand range
 */
export function generateHandFromRange(range: HandRange, excludeCards: Card[] = []): [Card, Card] {
  const excludeSet = new Set(excludeCards.map((c) => `${c.rank}${c.suit}`));

  const getValidRanks = (): Rank[] => {
    if (range.exactRanks) return range.exactRanks;
    if (range.minRank) {
      const minValue = RANK_VALUES[range.minRank];
      return RANKS.filter((r) => RANK_VALUES[r] >= minValue);
    }
    return RANKS;
  };

  const validRanks = getValidRanks();
  const shuffledSuits = shuffleArray(SUITS);

  if (range.type === 'pair') {
    const rank = randomElement(validRanks);
    // Find two available suits
    const availableSuits = shuffledSuits.filter(
      (s) => !excludeSet.has(`${rank}${s}`)
    );
    if (availableSuits.length < 2) {
      // Fallback if not enough suits available
      return [randomCard(excludeCards), randomCard(excludeCards)];
    }
    return [
      { rank, suit: availableSuits[0] },
      { rank, suit: availableSuits[1] },
    ];
  }

  if (range.type === 'suited') {
    const suit = randomElement(shuffledSuits);
    const shuffledRanks = shuffleArray(validRanks);
    // For connectors, pick two adjacent ranks
    const rankIndex = randomInt(0, shuffledRanks.length - 2);
    const rank1 = shuffledRanks[rankIndex];
    const rank2 = shuffledRanks[rankIndex + 1];

    if (!excludeSet.has(`${rank1}${suit}`) && !excludeSet.has(`${rank2}${suit}`)) {
      return [
        { rank: rank1, suit },
        { rank: rank2, suit },
      ];
    }
    // Fallback
    return [randomCard(excludeCards), randomCard(excludeCards)];
  }

  // Offsuit
  const shuffledRanks = shuffleArray(validRanks);
  const rank1 = shuffledRanks[0];
  const rank2 = shuffledRanks[1] || shuffledRanks[0];
  const suit1 = shuffledSuits[0];
  const suit2 = shuffledSuits[1];

  if (!excludeSet.has(`${rank1}${suit1}`) && !excludeSet.has(`${rank2}${suit2}`)) {
    return [
      { rank: rank1, suit: suit1 },
      { rank: rank2, suit: suit2 },
    ];
  }
  return [randomCard(excludeCards), randomCard(excludeCards)];
}

/**
 * Randomize stack sizes within realistic bounds
 * @param baseStack The original stack size
 * @param minBB Minimum big blinds (default 50)
 * @param maxBB Maximum big blinds (default 200)
 * @returns Randomized stack size
 */
export function randomizeStackSize(
  baseStack: number,
  bigBlind: number,
  minBB = 50,
  maxBB = 200
): number {
  const minStack = minBB * bigBlind;
  const maxStack = maxBB * bigBlind;

  // Add some variance around the base stack (±25%)
  const variance = baseStack * 0.25;
  const low = Math.max(minStack, baseStack - variance);
  const high = Math.min(maxStack, baseStack + variance);

  // Round to nearest big blind
  const randomized = randomInt(Math.floor(low / bigBlind), Math.floor(high / bigBlind)) * bigBlind;
  return randomized;
}

/**
 * Vary bet sizes within logical ranges
 * @param baseBet The original bet size
 * @param betType Type of bet (open, 3bet, cbet, etc.)
 * @returns Randomized bet size
 */
export function randomizeBetSize(
  baseBet: number,
  bigBlind: number,
  betType: 'open' | '3bet' | 'cbet' | 'valuebet' | 'bluff' = 'open'
): number {
  const ranges: Record<string, { min: number; max: number }> = {
    open: { min: 2, max: 3.5 }, // 2-3.5x BB
    '3bet': { min: 2.5, max: 4 }, // 2.5-4x the open
    cbet: { min: 0.33, max: 0.75 }, // 33-75% pot
    valuebet: { min: 0.5, max: 1 }, // 50-100% pot
    bluff: { min: 0.33, max: 0.8 }, // 33-80% pot
  };

  const range = ranges[betType] || ranges.open;

  // Calculate base multiplier from the bet
  const baseMultiplier = baseBet / bigBlind;

  // Apply variance within the range
  const minMultiplier = Math.max(range.min, baseMultiplier * 0.8);
  const maxMultiplier = Math.min(range.max * bigBlind, baseMultiplier * 1.2);

  const randomMultiplier = minMultiplier + Math.random() * (maxMultiplier - minMultiplier);

  // Round to nearest 0.5 BB
  return Math.round(randomMultiplier * 2) / 2 * bigBlind;
}

/**
 * Select scenarios weighted by difficulty and player level
 * @param scenarios Available scenarios
 * @param playerLevel Current player level
 * @param preferredDifficulty Preferred difficulty (optional)
 * @returns Weighted random scenario
 */
export function selectWeightedScenario(
  scenarios: Scenario[],
  playerLevel: number,
  preferredDifficulty?: Difficulty | 'all'
): Scenario | null {
  if (scenarios.length === 0) return null;

  // Define difficulty weights based on player level
  const difficultyWeights: Record<Difficulty, number> = {
    beginner: Math.max(1, 5 - playerLevel), // Decreases as level increases
    intermediate: Math.min(playerLevel, 5), // Peaks around level 5
    advanced: Math.max(0, Math.min(playerLevel - 3, 5)), // Unlocks around level 3
    expert: Math.max(0, Math.min(playerLevel - 6, 5)), // Unlocks around level 6
  };

  // If preferred difficulty specified, boost its weight significantly
  if (preferredDifficulty && preferredDifficulty !== 'all') {
    Object.keys(difficultyWeights).forEach((d) => {
      if (d === preferredDifficulty) {
        difficultyWeights[d as Difficulty] *= 10;
      }
    });
  }

  // Calculate weights for each scenario
  const weightedScenarios = scenarios.map((scenario) => ({
    scenario,
    weight: difficultyWeights[scenario.difficulty] || 1,
  }));

  // Calculate total weight
  const totalWeight = weightedScenarios.reduce((sum, ws) => sum + ws.weight, 0);

  if (totalWeight === 0) {
    // Fallback to random selection
    return randomElement(scenarios);
  }

  // Select based on weight
  let random = Math.random() * totalWeight;
  for (const ws of weightedScenarios) {
    random -= ws.weight;
    if (random <= 0) {
      return ws.scenario;
    }
  }

  // Fallback
  return scenarios[scenarios.length - 1];
}

/**
 * Create a variation of a scenario with randomized elements
 * Note: This preserves the optimal action by only varying cosmetic elements
 */
export function createScenarioVariation(
  scenario: Scenario,
  options: {
    randomizeStacks?: boolean;
    randomizeBets?: boolean;
  } = {}
): Scenario {
  const { randomizeStacks = false, randomizeBets = false } = options;

  // Create a deep copy
  const variation: Scenario = JSON.parse(JSON.stringify(scenario));

  // Give it a new ID
  variation.id = `${scenario.id}-var-${Date.now()}`;

  // Get big blind from the scenario (assuming standard structure)
  const bigBlind = 2; // Default BB for most scenarios

  if (randomizeStacks) {
    // Randomize player stacks
    variation.players = variation.players.map((player) => ({
      ...player,
      stack: randomizeStackSize(player.stack, bigBlind),
    }));
  }

  if (randomizeBets) {
    // Randomize action history bet sizes (preserving action types)
    variation.actionHistory = variation.actionHistory.map((action) => {
      if (action.amount && action.amount > 0) {
        return {
          ...action,
          amount: randomizeBetSize(action.amount, bigBlind, 'open'),
        };
      }
      return action;
    });

    // Recalculate pot based on new action history
    let pot = 3; // SB + BB
    for (const action of variation.actionHistory) {
      if (action.amount) {
        pot += action.amount;
      }
    }
    variation.pot = pot;
  }

  return variation;
}
