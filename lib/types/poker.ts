// Card Types
export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs';
export type Rank = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';

export interface Card {
  rank: Rank;
  suit: Suit;
}

// Position Types
export type Position = 'BTN' | 'SB' | 'BB' | 'UTG' | 'MP' | 'CO';

export const POSITION_ORDER: Position[] = ['UTG', 'MP', 'CO', 'BTN', 'SB', 'BB'];

export const POSITION_LABELS: Record<Position, string> = {
  BTN: 'Button',
  SB: 'Small Blind',
  BB: 'Big Blind',
  UTG: 'Under the Gun',
  MP: 'Middle Position',
  CO: 'Cutoff',
};

// Player Types
export interface Player {
  position: Position;
  stack: number;
  isHero: boolean;
  isFolded: boolean;
  currentBet: number;
  name?: string;
}

// Action Types
export type ActionType = 'fold' | 'check' | 'call' | 'raise' | 'bet' | 'all-in';

export interface Action {
  type: ActionType;
  position: Position;
  amount?: number;
  isAllIn?: boolean;
}

// Street Types
export type Street = 'preflop' | 'flop' | 'turn' | 'river';

export const STREET_ORDER: Street[] = ['preflop', 'flop', 'turn', 'river'];

export const STREET_LABELS: Record<Street, string> = {
  preflop: 'Preflop',
  flop: 'Flop',
  turn: 'Turn',
  river: 'River',
};

// Difficulty Types
export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export const DIFFICULTY_ORDER: Difficulty[] = ['beginner', 'intermediate', 'advanced', 'expert'];

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
};

export const DIFFICULTY_DESCRIPTIONS: Record<Difficulty, string> = {
  beginner: 'Learn basic hand rankings and simple preflop decisions',
  intermediate: 'Position-based play and postflop fundamentals',
  advanced: 'Complex spots, draws, and multi-street thinking',
  expert: 'GTO concepts, balanced ranges, and advanced exploits',
};

// Scenario Types
export interface Scenario {
  id: string;
  difficulty: Difficulty;
  street: Street;
  heroPosition: Position;
  heroCards: [Card, Card];
  communityCards: Card[];
  pot: number;
  players: Player[];
  actionHistory: Action[];
  validActions: ActionType[];
  optimalAction: ActionType;
  optimalAmount?: number;
  explanation: string;
  keyConcept: string;
  tags: string[];
}

// Game Session Types
export interface SessionConfig {
  questionCount: number;
  difficulty: Difficulty | 'all';
  streetFilter: Street | 'all' | 'postflop';
  topics: string[];
}

export interface SessionResult {
  scenarioId: string;
  playerAction: ActionType;
  playerAmount?: number;
  isCorrect: boolean;
  xpEarned: number;
  timeSpent?: number;
}

export interface Session {
  id: string;
  config: SessionConfig;
  startedAt: Date;
  results: SessionResult[];
  currentQuestionIndex: number;
  streak: number;
  completed: boolean;
}

// Player Progress Types
export interface PlayerStats {
  totalQuestionsAnswered: number;
  totalCorrect: number;
  bestStreak: number;
  totalSessions: number;
  statsByDifficulty: Record<Difficulty, { answered: number; correct: number }>;
  statsByStreet: Record<Street, { answered: number; correct: number }>;
  statsByAction: Record<ActionType, { answered: number; correct: number }>;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'accuracy' | 'streaks' | 'volume' | 'milestones';
  requirement: number;
  unlockedAt?: Date;
}

export interface PlayerProgress {
  level: number;
  xp: number;
  achievements: string[];
  stats: PlayerStats;
  unlockedDifficulties: Difficulty[];
}

// Settings Types
export interface PlayerSettings {
  defaultSessionLength: number;
  defaultDifficulty: Difficulty | 'all';
  streetFilter: Street | 'all' | 'postflop';
  topics: string[];
  soundEnabled: boolean;
  reducedMotion: boolean;
}

// Helper type for card display
export function getCardDisplay(card: Card): string {
  const suitSymbols: Record<Suit, string> = {
    spades: '♠',
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
  };
  return `${card.rank}${suitSymbols[card.suit]}`;
}

export function isRedSuit(suit: Suit): boolean {
  return suit === 'hearts' || suit === 'diamonds';
}
