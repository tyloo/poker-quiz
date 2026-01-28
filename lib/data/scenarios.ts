import type { Scenario, Card, Player, Action } from '@/lib/types';

// Helper to create cards
const card = (rank: Card['rank'], suit: Card['suit']): Card => ({ rank, suit });

// Helper to create players
const player = (
  position: Player['position'],
  stack: number,
  isHero: boolean = false,
  isFolded: boolean = false,
  currentBet: number = 0
): Player => ({
  position,
  stack,
  isHero,
  isFolded,
  currentBet,
});

// Helper to create actions
const action = (
  type: Action['type'],
  position: Action['position'],
  amount?: number
): Action => ({
  type,
  position,
  ...(amount !== undefined && { amount }),
});

export const scenarios: Scenario[] = [
  // ==================== BEGINNER SCENARIOS ====================

  // Beginner 1: Premium pair preflop - easy open raise
  {
    id: 'beginner-1-aa-open',
    difficulty: 'beginner',
    street: 'preflop',
    heroPosition: 'CO',
    heroCards: [card('A', 'spades'), card('A', 'hearts')],
    communityCards: [],
    pot: 15,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, true, false, 0),
      player('BTN', 1000, false, false, 0),
      player('SB', 995, false, false, 5),
      player('BB', 990, false, false, 10),
    ],
    actionHistory: [
      action('fold', 'UTG'),
      action('fold', 'MP'),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'raise',
    optimalAmount: 30,
    explanation:
      'Pocket Aces is the best starting hand in poker. You should always raise with AA to build the pot and get value from worse hands. Folding or limping would be a significant mistake.',
    keyConcept: 'Premium hands should be raised for value',
    tags: ['preflop', 'premium-hands', 'open-raise'],
  },

  // Beginner 2: Obvious fold with trash
  {
    id: 'beginner-2',
    difficulty: 'beginner',
    street: 'preflop',
    heroPosition: 'UTG',
    heroCards: [card('7', 'hearts'), card('2', 'clubs')],
    communityCards: [],
    pot: 15,
    players: [
      player('UTG', 1000, true, false, 0),
      player('MP', 1000, false, false, 0),
      player('CO', 1000, false, false, 0),
      player('BTN', 1000, false, false, 0),
      player('SB', 995, false, false, 5),
      player('BB', 990, false, false, 10),
    ],
    actionHistory: [],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'fold',
    explanation:
      '7-2 offsuit is the worst starting hand in poker. From early position (UTG), you need strong hands to play. This hand has no straight potential, no flush potential, and will rarely make a strong hand.',
    keyConcept: 'Fold weak hands, especially from early position',
    tags: ['preflop', 'fold', 'position'],
  },

  // Beginner 3: Call a raise with a strong hand
  {
    id: 'beginner-3',
    difficulty: 'beginner',
    street: 'preflop',
    heroPosition: 'BTN',
    heroCards: [card('Q', 'spades'), card('Q', 'diamonds')],
    communityCards: [],
    pot: 85,
    players: [
      player('UTG', 970, false, false, 30),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 1000, true, false, 0),
      player('SB', 995, false, false, 5),
      player('BB', 990, false, false, 10),
    ],
    actionHistory: [
      action('raise', 'UTG', 30),
      action('fold', 'MP'),
      action('fold', 'CO'),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'raise',
    optimalAmount: 90,
    explanation:
      'Queens is a premium hand. When facing a raise, you should 3-bet (re-raise) to build the pot and define the strength of your opponent\'s hand. Calling is acceptable but 3-betting is more profitable.',
    keyConcept: '3-bet premium hands for value',
    tags: ['preflop', '3-bet', 'premium-hands'],
  },

  // Beginner 4: Top pair on flop - value bet
  {
    id: 'beginner-4',
    difficulty: 'beginner',
    street: 'flop',
    heroPosition: 'BTN',
    heroCards: [card('A', 'hearts'), card('K', 'spades')],
    communityCards: [card('A', 'clubs'), card('7', 'diamonds'), card('3', 'hearts')],
    pot: 60,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 970, false, false, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 970, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 1000, false, true, 0),
    ],
    actionHistory: [
      action('check', 'MP'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 40,
    explanation:
      'You have top pair with the best kicker (TPTK). This is a very strong hand that should bet for value. Many worse hands (Ax, pocket pairs, draws) will call. Checking would miss value.',
    keyConcept: 'Bet strong hands for value',
    tags: ['flop', 'value-bet', 'top-pair'],
  },

  // Beginner 5: Obvious fold on river with missed draw
  {
    id: 'beginner-5',
    difficulty: 'beginner',
    street: 'river',
    heroPosition: 'CO',
    heroCards: [card('9', 'hearts'), card('8', 'hearts')],
    communityCards: [
      card('7', 'spades'),
      card('3', 'diamonds'),
      card('K', 'clubs'),
      card('2', 'hearts'),
      card('Q', 'spades'),
    ],
    pot: 200,
    players: [
      player('UTG', 800, false, false, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 700, true, false, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 1000, false, true, 0),
    ],
    actionHistory: [
      action('bet', 'UTG', 150),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'fold',
    explanation:
      'Your straight draw missed and you only have 9-high. You cannot beat any hand your opponent would bet for value. Calling would be throwing money away.',
    keyConcept: 'Fold missed draws facing bets',
    tags: ['river', 'fold', 'missed-draw'],
  },

  // Beginner 6: Check behind with medium strength
  {
    id: 'beginner-6',
    difficulty: 'beginner',
    street: 'river',
    heroPosition: 'BTN',
    heroCards: [card('J', 'diamonds'), card('T', 'diamonds')],
    communityCards: [
      card('J', 'clubs'),
      card('5', 'hearts'),
      card('2', 'spades'),
      card('8', 'diamonds'),
      card('3', 'clubs'),
    ],
    pot: 80,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 900, false, false, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 900, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 1000, false, true, 0),
    ],
    actionHistory: [
      action('check', 'MP'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'check',
    explanation:
      'You have second pair with a decent kicker. While this beats some hands, betting would only get called by better hands and fold out worse hands. Checking keeps the pot small and realizes your showdown value.',
    keyConcept: 'Check medium-strength hands to showdown',
    tags: ['river', 'check', 'showdown-value'],
  },

  // ==================== INTERMEDIATE SCENARIOS ====================

  // Intermediate 1: C-bet on dry board
  {
    id: 'intermediate-1',
    difficulty: 'intermediate',
    street: 'flop',
    heroPosition: 'CO',
    heroCards: [card('A', 'spades'), card('Q', 'clubs')],
    communityCards: [card('K', 'hearts'), card('7', 'diamonds'), card('2', 'clubs')],
    pot: 70,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 965, true, false, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 965, false, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 35,
    explanation:
      'As the preflop aggressor, you should continuation bet (c-bet) this dry board. You have two overcards, a gutshot, and backdoor flush draw. Your range advantage and the dry texture make this a profitable c-bet spot.',
    keyConcept: 'C-bet dry boards as the preflop raiser',
    tags: ['flop', 'c-bet', 'dry-board'],
  },

  // Intermediate 2: Check-raise bluff with draw
  {
    id: 'intermediate-2',
    difficulty: 'intermediate',
    street: 'flop',
    heroPosition: 'BB',
    heroCards: [card('9', 'spades'), card('8', 'spades')],
    communityCards: [card('7', 'spades'), card('6', 'diamonds'), card('2', 'spades')],
    pot: 60,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 960, false, false, 40),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 970, true, false, 0),
    ],
    actionHistory: [
      action('bet', 'CO', 40),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'raise',
    optimalAmount: 130,
    explanation:
      'You have an open-ended straight draw plus a flush draw - a monster draw with 15 outs. Check-raising puts maximum pressure on your opponent while building a pot you\'ll often win. Even if called, you have great equity.',
    keyConcept: 'Semi-bluff with strong draws',
    tags: ['flop', 'semi-bluff', 'check-raise', 'draw'],
  },

  // Intermediate 3: Fold to 3-bet with marginal hand
  {
    id: 'intermediate-3',
    difficulty: 'intermediate',
    street: 'preflop',
    heroPosition: 'CO',
    heroCards: [card('K', 'hearts'), card('J', 'spades')],
    communityCards: [],
    pot: 105,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 970, true, false, 30),
      player('BTN', 910, false, false, 90),
      player('SB', 995, false, false, 5),
      player('BB', 990, false, false, 10),
    ],
    actionHistory: [
      action('fold', 'UTG'),
      action('fold', 'MP'),
      action('raise', 'CO', 30),
      action('raise', 'BTN', 90),
      action('fold', 'SB'),
      action('fold', 'BB'),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'fold',
    explanation:
      'KJo is a decent opening hand but struggles against a 3-bet range. You\'ll be dominated by AK, KQ and crushed by QQ+. Without a significant skill edge or reads, folding is the most profitable play.',
    keyConcept: 'Fold marginal hands to 3-bets',
    tags: ['preflop', '3-bet', 'fold'],
  },

  // Intermediate 4: Value bet thin on river
  {
    id: 'intermediate-4',
    difficulty: 'intermediate',
    street: 'river',
    heroPosition: 'BTN',
    heroCards: [card('A', 'diamonds'), card('9', 'diamonds')],
    communityCards: [
      card('9', 'clubs'),
      card('6', 'hearts'),
      card('2', 'spades'),
      card('K', 'diamonds'),
      card('4', 'clubs'),
    ],
    pot: 120,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 880, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 880, false, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 60,
    explanation:
      'You have top pair with a decent kicker. While not a monster, you can get value from worse 9x hands, pocket pairs like 77-88, and missed draws. Betting small extracts value while keeping your opponent\'s calling range wide.',
    keyConcept: 'Thin value bet when you beat the calling range',
    tags: ['river', 'value-bet', 'thin-value'],
  },

  // Intermediate 5: Float the flop in position
  {
    id: 'intermediate-5',
    difficulty: 'intermediate',
    street: 'flop',
    heroPosition: 'BTN',
    heroCards: [card('A', 'clubs'), card('5', 'clubs')],
    communityCards: [card('K', 'diamonds'), card('8', 'hearts'), card('3', 'spades')],
    pot: 70,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 955, false, false, 45),
      player('BTN', 970, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 1000, false, true, 0),
    ],
    actionHistory: [
      action('bet', 'CO', 45),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'call',
    explanation:
      'This is a good spot to "float" - call with the intention of taking the pot away later. You have position, a backdoor flush draw, and an overcard. If villain checks the turn, you can often take the pot with a bet.',
    keyConcept: 'Float in position with backdoor equity',
    tags: ['flop', 'float', 'position'],
  },

  // Intermediate 6: Defend BB with suited connector
  {
    id: 'intermediate-6',
    difficulty: 'intermediate',
    street: 'preflop',
    heroPosition: 'BB',
    heroCards: [card('7', 'hearts'), card('6', 'hearts')],
    communityCards: [],
    pot: 65,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 975, false, false, 25),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 990, true, false, 10),
    ],
    actionHistory: [
      action('fold', 'UTG'),
      action('fold', 'MP'),
      action('raise', 'CO', 25),
      action('fold', 'BTN'),
      action('fold', 'SB'),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'call',
    explanation:
      'Suited connectors play well from the BB against a single raise. You\'re getting good pot odds, can hit straights and flushes, and already have money invested. 3-betting would turn your hand into a bluff.',
    keyConcept: 'Defend BB with playable suited hands',
    tags: ['preflop', 'BB-defense', 'suited-connectors'],
  },

  // ==================== ADVANCED SCENARIOS ====================

  // Advanced 1: Triple barrel bluff
  {
    id: 'advanced-1',
    difficulty: 'advanced',
    street: 'river',
    heroPosition: 'CO',
    heroCards: [card('A', 'hearts'), card('J', 'hearts')],
    communityCards: [
      card('K', 'spades'),
      card('Q', 'diamonds'),
      card('7', 'clubs'),
      card('3', 'hearts'),
      card('2', 'spades'),
    ],
    pot: 280,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 720, true, false, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 720, false, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 200,
    explanation:
      'You have the nut straight blocker (AJ blocks TJ straight) and missed your gutshot. The board favors your range heavily with KQ high cards. A big bet represents strong hands and puts pressure on BB\'s capped range (they would have raised KK/QQ).',
    keyConcept: 'Bluff when you block the nuts and have range advantage',
    tags: ['river', 'bluff', 'blockers', 'range-advantage'],
  },

  // Advanced 2: Slow play a monster
  {
    id: 'advanced-2',
    difficulty: 'advanced',
    street: 'flop',
    heroPosition: 'BB',
    heroCards: [card('5', 'diamonds'), card('5', 'hearts')],
    communityCards: [card('5', 'clubs'), card('A', 'spades'), card('K', 'hearts')],
    pot: 70,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 965, false, false, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 965, true, false, 0),
    ],
    actionHistory: [
      action('bet', 'CO', 45),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'call',
    explanation:
      'You flopped trips on an Ace-high board. Your opponent likely has an Ace or is c-betting. Slow playing (calling) keeps their entire range in, allowing them to continue barreling or catch up on later streets.',
    keyConcept: 'Slow play monsters on dry boards',
    tags: ['flop', 'slow-play', 'set', 'deception'],
  },

  // Advanced 3: Squeeze play
  {
    id: 'advanced-3',
    difficulty: 'advanced',
    street: 'preflop',
    heroPosition: 'BB',
    heroCards: [card('A', 'clubs'), card('T', 'spades')],
    communityCards: [],
    pot: 95,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 975, false, false, 25),
      player('CO', 1000, false, true, 0),
      player('BTN', 975, false, false, 25),
      player('SB', 1000, false, true, 0),
      player('BB', 990, true, false, 10),
    ],
    actionHistory: [
      action('fold', 'UTG'),
      action('raise', 'MP', 25),
      action('fold', 'CO'),
      action('call', 'BTN', 25),
      action('fold', 'SB'),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'raise',
    optimalAmount: 110,
    explanation:
      'This is a perfect squeeze spot. You have a decent hand (ATo), position to act last preflop, and the BTN\'s call indicates a capped/weak range. A large 3-bet will often take down the pot immediately.',
    keyConcept: 'Squeeze when there\'s dead money and weakness',
    tags: ['preflop', 'squeeze', '3-bet', 'bluff'],
  },

  // Advanced 4: Fold top pair to aggression
  {
    id: 'advanced-4',
    difficulty: 'advanced',
    street: 'river',
    heroPosition: 'BTN',
    heroCards: [card('A', 'spades'), card('Q', 'hearts')],
    communityCards: [
      card('A', 'diamonds'),
      card('9', 'clubs'),
      card('4', 'spades'),
      card('9', 'hearts'),
      card('7', 'diamonds'),
    ],
    pot: 450,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 600, false, false, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 550, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 1000, false, true, 0),
    ],
    actionHistory: [
      action('bet', 'MP', 350),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'fold',
    explanation:
      'Despite having top pair, this is a fold. The board paired nines, and villain\'s overbet on the river represents extreme strength (99, A9, 44, or a bluff). Given stack-to-pot ratio and the overbet sizing, villain rarely bluffs here.',
    keyConcept: 'Fold top pair to river overbets on paired boards',
    tags: ['river', 'fold', 'overbet', 'board-reading'],
  },

  // Advanced 5: Check-raise turn for value
  {
    id: 'advanced-5',
    difficulty: 'advanced',
    street: 'turn',
    heroPosition: 'SB',
    heroCards: [card('T', 'hearts'), card('9', 'hearts')],
    communityCards: [
      card('J', 'hearts'),
      card('8', 'clubs'),
      card('2', 'hearts'),
      card('7', 'diamonds'),
    ],
    pot: 180,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 820, false, false, 100),
      player('SB', 910, true, false, 0),
      player('BB', 1000, false, true, 0),
    ],
    actionHistory: [
      action('check', 'SB'),
      action('bet', 'BTN', 100),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'raise',
    optimalAmount: 280,
    explanation:
      'You flopped a straight and picked up a flush draw on the turn. This is a monster hand. Check-raising gets maximum value from draws, two pairs, and sets that villain will continue with. Don\'t slow play when the board is draw-heavy.',
    keyConcept: 'Fast play monsters on wet boards',
    tags: ['turn', 'check-raise', 'value', 'wet-board'],
  },

  // Advanced 6: Pot control with medium hand
  {
    id: 'advanced-6',
    difficulty: 'advanced',
    street: 'turn',
    heroPosition: 'BTN',
    heroCards: [card('K', 'spades'), card('Q', 'spades')],
    communityCards: [
      card('K', 'diamonds'),
      card('8', 'hearts'),
      card('5', 'clubs'),
      card('J', 'diamonds'),
    ],
    pot: 120,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 920, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 920, false, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'check',
    explanation:
      'You have top pair with second kicker, but the turn brought potential straight draws. Betting would build a pot where you\'re often behind when called. Checking keeps the pot controlled and lets you comfortably call a river bet.',
    keyConcept: 'Pot control with medium-strength hands',
    tags: ['turn', 'pot-control', 'check', 'medium-strength'],
  },

  // ==================== EXPERT SCENARIOS ====================

  // Expert 1: GTO mixed strategy spot (raise vs call)
  {
    id: 'expert-1',
    difficulty: 'expert',
    street: 'river',
    heroPosition: 'BB',
    heroCards: [card('A', 'hearts'), card('A', 'spades')],
    communityCards: [
      card('K', 'diamonds'),
      card('T', 'clubs'),
      card('6', 'hearts'),
      card('2', 'spades'),
      card('3', 'diamonds'),
    ],
    pot: 300,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 700, false, false, 150),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 850, true, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
      action('bet', 'CO', 150),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'call',
    explanation:
      'With AA on this runout, you have a strong hand but raising doesn\'t make sense. You don\'t get value from worse hands (they fold) and only get action from better hands (straights, sets, two pairs). Calling extracts value from bluffs and thin value bets.',
    keyConcept: 'Don\'t raise when you only get called by better',
    tags: ['river', 'call', 'GTO', 'value-to-bluff'],
  },

  // Expert 2: Blocker-based bluff catch
  {
    id: 'expert-2',
    difficulty: 'expert',
    street: 'river',
    heroPosition: 'BTN',
    heroCards: [card('A', 'clubs'), card('K', 'clubs')],
    communityCards: [
      card('J', 'clubs'),
      card('T', 'clubs'),
      card('5', 'hearts'),
      card('8', 'spades'),
      card('2', 'diamonds'),
    ],
    pot: 400,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 600, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 300, false, false, 300),
    ],
    actionHistory: [
      action('bet', 'BB', 300),
    ],
    validActions: ['fold', 'call'],
    optimalAction: 'call',
    explanation:
      'You have Ace-high with the nut flush blocker (Ac). This means villain cannot have the nut flush. When facing an all-in, your blockers make it more likely villain is bluffing or value-betting worse. You\'re getting 2.3:1 and need to be right 30% of the time.',
    keyConcept: 'Use blockers to inform bluff-catching decisions',
    tags: ['river', 'bluff-catch', 'blockers', 'GTO'],
  },

  // Expert 3: Range merging spot
  {
    id: 'expert-3',
    difficulty: 'expert',
    street: 'river',
    heroPosition: 'CO',
    heroCards: [card('Q', 'hearts'), card('Q', 'clubs')],
    communityCards: [
      card('A', 'spades'),
      card('J', 'diamonds'),
      card('5', 'hearts'),
      card('5', 'clubs'),
      card('9', 'spades'),
    ],
    pot: 200,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 800, true, false, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 800, false, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 80,
    explanation:
      'This is a "merge" spot. Your QQ is too strong to check (you beat many hands), but not strong enough to bet large (only worse hands fold). A small bet of ~40% pot extracts thin value from worse pairs and gets folds from Ace-high.',
    keyConcept: 'Merge betting with medium-strong hands',
    tags: ['river', 'merge', 'thin-value', 'sizing'],
  },

  // Expert 4: Overbetting the nuts
  {
    id: 'expert-4',
    difficulty: 'expert',
    street: 'river',
    heroPosition: 'BTN',
    heroCards: [card('Q', 'diamonds'), card('J', 'diamonds')],
    communityCards: [
      card('A', 'diamonds'),
      card('K', 'diamonds'),
      card('8', 'clubs'),
      card('3', 'hearts'),
      card('T', 'diamonds'),
    ],
    pot: 180,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 820, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 820, false, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 400,
    explanation:
      'You have the Royal Flush - the absolute nuts. The board is very scary with 4 diamonds and a broadway straight possible. An overbet (2x+ pot) maximizes value because opponents with flushes or straights will feel committed to call, thinking you might be bluffing.',
    keyConcept: 'Overbet the nuts on scary boards',
    tags: ['river', 'overbet', 'nuts', 'value'],
  },

  // Expert 5: Defending against a donk bet
  {
    id: 'expert-5',
    difficulty: 'expert',
    street: 'flop',
    heroPosition: 'BTN',
    heroCards: [card('A', 'hearts'), card('K', 'hearts')],
    communityCards: [card('Q', 'clubs'), card('J', 'spades'), card('4', 'diamonds')],
    pot: 70,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 965, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 920, false, false, 50),
    ],
    actionHistory: [
      action('bet', 'BB', 50),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'call',
    explanation:
      'A "donk bet" (betting into the preflop raiser) typically indicates medium strength or a draw. You have two overcards, a gutshot to the nuts (T for broadway), and backdoor flush potential. Calling keeps dominated hands in while seeing cheap turns.',
    keyConcept: 'Flat donk bets with overcards and equity',
    tags: ['flop', 'donk-bet', 'call', 'draws'],
  },

  // Expert 6: Exploitative fold with strong hand
  {
    id: 'expert-6',
    difficulty: 'expert',
    street: 'river',
    heroPosition: 'CO',
    heroCards: [card('K', 'spades'), card('K', 'hearts')],
    communityCards: [
      card('Q', 'diamonds'),
      card('Q', 'hearts'),
      card('8', 'clubs'),
      card('4', 'spades'),
      card('2', 'hearts'),
    ],
    pot: 250,
    players: [
      player('UTG', 500, false, false, 500),
      player('MP', 1000, false, true, 0),
      player('CO', 500, true, false, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 1000, false, true, 0),
    ],
    actionHistory: [
      action('raise', 'UTG', 500),
    ],
    validActions: ['fold', 'call'],
    optimalAction: 'fold',
    explanation:
      'Despite having Kings full, you lose to QQ (quads) and any Qx (trips/full houses). UTG shoving the river for 2x pot screams strength - specifically trips or better. Recreational players don\'t bluff here. This is an exploitative fold against a polarized range that\'s weighted toward value.',
    keyConcept: 'Make exploitative folds against unbalanced opponents',
    tags: ['river', 'exploitative', 'fold', 'full-house'],
  },

  // ==================== ADDITIONAL BEGINNER SCENARIOS ====================

  // Beginner 7: KK preflop open from button
  {
    id: 'beginner-7-kk-btn',
    difficulty: 'beginner',
    street: 'preflop',
    heroPosition: 'BTN',
    heroCards: [card('K', 'hearts'), card('K', 'diamonds')],
    communityCards: [],
    pot: 15,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 1000, true, false, 0),
      player('SB', 995, false, false, 5),
      player('BB', 990, false, false, 10),
    ],
    actionHistory: [
      action('fold', 'UTG'),
      action('fold', 'MP'),
      action('fold', 'CO'),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'raise',
    optimalAmount: 25,
    explanation:
      'Pocket Kings is the second-best starting hand. Even when everyone folds to you, raising is correct to build the pot against the blinds. Limping would be a mistake as it gives the blinds a cheap look.',
    keyConcept: 'Always raise premium hands',
    tags: ['preflop', 'premium-hands', 'open-raise', 'button'],
  },

  // Beginner 8: Fold J4o from MP
  {
    id: 'beginner-8-j4o-fold',
    difficulty: 'beginner',
    street: 'preflop',
    heroPosition: 'MP',
    heroCards: [card('J', 'spades'), card('4', 'diamonds')],
    communityCards: [],
    pot: 15,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, true, false, 0),
      player('CO', 1000, false, false, 0),
      player('BTN', 1000, false, false, 0),
      player('SB', 995, false, false, 5),
      player('BB', 990, false, false, 10),
    ],
    actionHistory: [
      action('fold', 'UTG'),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'fold',
    explanation:
      'J4 offsuit is a weak hand with poor playability. The Jack is easily dominated by AJ, KJ, QJ, and the 4 provides no backup. From middle position with many players to act, this is a clear fold.',
    keyConcept: 'Fold weak offsuit hands from early and middle positions',
    tags: ['preflop', 'fold', 'position', 'hand-selection'],
  },

  // Beginner 9: AK raises facing a raise
  {
    id: 'beginner-9-ak-3bet',
    difficulty: 'beginner',
    street: 'preflop',
    heroPosition: 'CO',
    heroCards: [card('A', 'hearts'), card('K', 'clubs')],
    communityCards: [],
    pot: 45,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 975, false, false, 25),
      player('CO', 1000, true, false, 0),
      player('BTN', 1000, false, false, 0),
      player('SB', 995, false, false, 5),
      player('BB', 990, false, false, 10),
    ],
    actionHistory: [
      action('fold', 'UTG'),
      action('raise', 'MP', 25),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'raise',
    optimalAmount: 75,
    explanation:
      'AK (Big Slick) is a premium hand that should be 3-bet for value. You have position on the raiser and can build a pot with the best non-pair hand in poker. Calling is also acceptable but 3-betting is more profitable.',
    keyConcept: '3-bet premium hands for value',
    tags: ['preflop', '3-bet', 'premium-hands', 'AK'],
  },

  // Beginner 10: Set on flop - bet for value
  {
    id: 'beginner-10-set-flop-bet',
    difficulty: 'beginner',
    street: 'flop',
    heroPosition: 'CO',
    heroCards: [card('8', 'hearts'), card('8', 'diamonds')],
    communityCards: [card('8', 'clubs'), card('K', 'spades'), card('4', 'hearts')],
    pot: 65,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 970, true, false, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 970, false, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 45,
    explanation:
      'You flopped a set - one of the strongest hands possible. This board has a King, so hands like KQ, KJ will call. Betting builds the pot and extracts value. Don\'t slow play when there\'s value to be had.',
    keyConcept: 'Bet strong hands to build the pot',
    tags: ['flop', 'value-bet', 'set', 'made-hand'],
  },

  // Beginner 11: Flush on board - easy call
  {
    id: 'beginner-11-flush-call',
    difficulty: 'beginner',
    street: 'river',
    heroPosition: 'BTN',
    heroCards: [card('A', 'spades'), card('5', 'spades')],
    communityCards: [
      card('K', 'spades'),
      card('9', 'spades'),
      card('3', 'diamonds'),
      card('7', 'hearts'),
      card('2', 'spades'),
    ],
    pot: 150,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 900, false, false, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 900, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 1000, false, true, 0),
    ],
    actionHistory: [
      action('bet', 'MP', 75),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'raise',
    optimalAmount: 225,
    explanation:
      'You have the nut flush (Ace-high). This is the best possible flush. You should raise for value as many weaker flushes and straights will call. Missing value here would be a significant mistake.',
    keyConcept: 'Raise for value with the nuts',
    tags: ['river', 'value', 'nuts', 'flush'],
  },

  // Beginner 12: Pair on flop facing bet - call or fold decision
  {
    id: 'beginner-12-second-pair-fold',
    difficulty: 'beginner',
    street: 'flop',
    heroPosition: 'BB',
    heroCards: [card('9', 'clubs'), card('6', 'hearts')],
    communityCards: [card('K', 'diamonds'), card('9', 'hearts'), card('2', 'spades')],
    pot: 60,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 970, false, false, 45),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 970, true, false, 0),
    ],
    actionHistory: [
      action('bet', 'CO', 45),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'call',
    explanation:
      'You have second pair with a weak kicker. This is a marginal hand but getting good pot odds to see the turn. Villain could be c-betting with overcards. Folding would be too tight, calling is correct.',
    keyConcept: 'Call with marginal hands when getting good pot odds',
    tags: ['flop', 'call', 'pot-odds', 'second-pair'],
  },

  // Beginner 13: Straight on board - value bet
  {
    id: 'beginner-13-straight-bet',
    difficulty: 'beginner',
    street: 'turn',
    heroPosition: 'CO',
    heroCards: [card('9', 'diamonds'), card('8', 'diamonds')],
    communityCards: [card('T', 'clubs'), card('7', 'hearts'), card('6', 'spades'), card('2', 'clubs')],
    pot: 90,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 955, true, false, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 955, false, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 65,
    explanation:
      'You have a straight (T-9-8-7-6). This is a very strong hand. Bet to get value from top pairs, two pairs, and draws. The only hand that beats you is J9 for a higher straight.',
    keyConcept: 'Bet strong hands for value',
    tags: ['turn', 'value-bet', 'straight', 'made-hand'],
  },

  // Beginner 14: Facing all-in with weak hand
  {
    id: 'beginner-14-allin-fold',
    difficulty: 'beginner',
    street: 'flop',
    heroPosition: 'BTN',
    heroCards: [card('Q', 'hearts'), card('J', 'hearts')],
    communityCards: [card('A', 'spades'), card('K', 'clubs'), card('3', 'diamonds')],
    pot: 80,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 0, false, false, 500),
      player('CO', 1000, false, true, 0),
      player('BTN', 960, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 1000, false, true, 0),
    ],
    actionHistory: [
      action('raise', 'MP', 500),
    ],
    validActions: ['fold', 'call'],
    optimalAction: 'fold',
    explanation:
      'You have a gutshot straight draw (need a T) and nothing else. Calling an all-in with just 4 outs is mathematically incorrect. You need about 8% equity to call but have poor odds.',
    keyConcept: 'Fold weak draws to big bets',
    tags: ['flop', 'fold', 'all-in', 'pot-odds'],
  },

  // Beginner 15: Open from small blind
  {
    id: 'beginner-15-sb-open',
    difficulty: 'beginner',
    street: 'preflop',
    heroPosition: 'SB',
    heroCards: [card('A', 'diamonds'), card('T', 'hearts')],
    communityCards: [],
    pot: 15,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 995, true, false, 5),
      player('BB', 990, false, false, 10),
    ],
    actionHistory: [
      action('fold', 'UTG'),
      action('fold', 'MP'),
      action('fold', 'CO'),
      action('fold', 'BTN'),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'raise',
    optimalAmount: 30,
    explanation:
      'AT offsuit is a strong hand heads-up against the BB. When folded to the SB, you should raise to attack the BB\'s wide defending range. Your Ace-high will often be best and win uncontested.',
    keyConcept: 'Raise with strong hands from the small blind',
    tags: ['preflop', 'open-raise', 'small-blind', 'stealing'],
  },

  // ==================== ADDITIONAL INTERMEDIATE SCENARIOS ====================

  // Intermediate 7: Defending vs button steal
  {
    id: 'intermediate-7-bb-defend',
    difficulty: 'intermediate',
    street: 'preflop',
    heroPosition: 'BB',
    heroCards: [card('K', 'diamonds'), card('9', 'spades')],
    communityCards: [],
    pot: 55,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 980, false, false, 20),
      player('SB', 1000, false, true, 0),
      player('BB', 990, true, false, 10),
    ],
    actionHistory: [
      action('fold', 'UTG'),
      action('fold', 'MP'),
      action('fold', 'CO'),
      action('raise', 'BTN', 20),
      action('fold', 'SB'),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'call',
    explanation:
      'K9o is a playable hand against a button steal. The BTN opens a very wide range, so your K9 has decent equity. You\'re getting 2.75:1 pot odds and only need to call 10 more to win 55.',
    keyConcept: 'Defend BB wide vs late position raises',
    tags: ['preflop', 'BB-defense', 'call', 'pot-odds'],
  },

  // Intermediate 8: Double barrel bluff
  {
    id: 'intermediate-8-double-barrel',
    difficulty: 'intermediate',
    street: 'turn',
    heroPosition: 'CO',
    heroCards: [card('A', 'spades'), card('Q', 'spades')],
    communityCards: [card('K', 'hearts'), card('8', 'diamonds'), card('3', 'clubs'), card('2', 'spades')],
    pot: 100,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 900, true, false, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 900, false, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 65,
    explanation:
      'After c-betting the flop and getting called, the turn is a brick. You have overcards, backdoor flush draw, and range advantage on this board. Continuing to barrel puts pressure on villain\'s weak pairs and draws.',
    keyConcept: 'Double barrel with equity and range advantage',
    tags: ['turn', 'bluff', 'barrel', 'semi-bluff'],
  },

  // Intermediate 9: Calling a turn raise
  {
    id: 'intermediate-9-turn-raise-call',
    difficulty: 'intermediate',
    street: 'turn',
    heroPosition: 'BTN',
    heroCards: [card('A', 'hearts'), card('J', 'hearts')],
    communityCards: [card('J', 'diamonds'), card('T', 'hearts'), card('4', 'clubs'), card('3', 'hearts')],
    pot: 200,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 700, false, false, 150),
      player('CO', 1000, false, true, 0),
      player('BTN', 850, true, false, 50),
      player('SB', 1000, false, true, 0),
      player('BB', 1000, false, true, 0),
    ],
    actionHistory: [
      action('bet', 'BTN', 50),
      action('raise', 'MP', 150),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'call',
    explanation:
      'You have top pair with top kicker plus a flush draw. This is too strong to fold. The turn gave you the nut flush draw with 9 outs. Even if behind to two pair or a set, you have significant equity to continue.',
    keyConcept: 'Call raises with strong made hands plus draws',
    tags: ['turn', 'call', 'combo-draw', 'pot-odds'],
  },

  // Intermediate 10: 4-bet bluff spot
  {
    id: 'intermediate-10-4bet-bluff',
    difficulty: 'intermediate',
    street: 'preflop',
    heroPosition: 'BTN',
    heroCards: [card('A', 'hearts'), card('4', 'hearts')],
    communityCards: [],
    pot: 165,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 910, false, false, 90),
      player('BTN', 970, true, false, 30),
      player('SB', 1000, false, true, 0),
      player('BB', 1000, false, true, 0),
    ],
    actionHistory: [
      action('fold', 'UTG'),
      action('fold', 'MP'),
      action('raise', 'CO', 25),
      action('raise', 'BTN', 75),
      action('fold', 'SB'),
      action('fold', 'BB'),
      action('raise', 'CO', 90),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'fold',
    explanation:
      'While A4s looks like a good 4-bet bluff, CO\'s 3-bet is small and calls for caution. Your hand plays well postflop if you just call, but folding is also fine against a tight 3-betting range. This is a close spot where folding is safest.',
    keyConcept: 'Pick your 4-bet bluffs carefully',
    tags: ['preflop', '4-bet', 'fold', 'hand-selection'],
  },

  // Intermediate 11: Bet-fold on river
  {
    id: 'intermediate-11-bet-fold-river',
    difficulty: 'intermediate',
    street: 'river',
    heroPosition: 'CO',
    heroCards: [card('A', 'diamonds'), card('T', 'diamonds')],
    communityCards: [
      card('T', 'hearts'),
      card('8', 'clubs'),
      card('5', 'spades'),
      card('2', 'diamonds'),
      card('K', 'spades'),
    ],
    pot: 140,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 860, true, false, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 860, false, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 70,
    explanation:
      'You have top pair with top kicker. The King on the river is a scare card but you should still bet for thin value. Worse tens, pocket pairs, and some 8x will call. If raised, you can fold - but that doesn\'t mean you shouldn\'t bet.',
    keyConcept: 'Value bet even on scary runouts',
    tags: ['river', 'value-bet', 'thin-value', 'top-pair'],
  },

  // Intermediate 12: Probe bet after check-check
  {
    id: 'intermediate-12-probe-bet',
    difficulty: 'intermediate',
    street: 'turn',
    heroPosition: 'BB',
    heroCards: [card('Q', 'clubs'), card('9', 'clubs')],
    communityCards: [card('J', 'hearts'), card('7', 'diamonds'), card('3', 'spades'), card('Q', 'hearts')],
    pot: 60,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 970, false, false, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 970, true, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
      action('check', 'CO'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 40,
    explanation:
      'After villain checked back the flop, their range is capped (no strong hands). You\'ve hit top pair on the turn. A "probe bet" takes advantage of their weakness and gets value from middle pairs and draws.',
    keyConcept: 'Probe bet when villain shows weakness',
    tags: ['turn', 'bet', 'probe', 'value'],
  },

  // Intermediate 13: Fold overpair to obvious strength
  {
    id: 'intermediate-13-fold-overpair',
    difficulty: 'intermediate',
    street: 'river',
    heroPosition: 'CO',
    heroCards: [card('J', 'spades'), card('J', 'diamonds')],
    communityCards: [
      card('9', 'hearts'),
      card('8', 'clubs'),
      card('2', 'diamonds'),
      card('4', 'spades'),
      card('7', 'hearts'),
    ],
    pot: 180,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 820, false, false, 0),
      player('CO', 820, true, false, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 1000, false, true, 0),
    ],
    actionHistory: [
      action('bet', 'MP', 150),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'fold',
    explanation:
      'The river completed a straight (T-9-8-7-6 or 9-8-7-6-5). Villain\'s large bet on this scary board represents extreme strength. Your overpair loses to any straight, any two pair, and any set. This is a clear fold.',
    keyConcept: 'Fold overpairs on scary boards',
    tags: ['river', 'fold', 'overpair', 'board-reading'],
  },

  // Intermediate 14: Open-ended straight draw semi-bluff
  {
    id: 'intermediate-14-oesd-raise',
    difficulty: 'intermediate',
    street: 'flop',
    heroPosition: 'CO',
    heroCards: [card('J', 'diamonds'), card('T', 'diamonds')],
    communityCards: [card('9', 'hearts'), card('8', 'clubs'), card('2', 'spades')],
    pot: 70,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 960, false, false, 40),
      player('CO', 970, true, false, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 1000, false, true, 0),
    ],
    actionHistory: [
      action('bet', 'MP', 40),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'raise',
    optimalAmount: 120,
    explanation:
      'You have an open-ended straight draw with 8 outs (any Q or 7 makes a straight). Raising as a semi-bluff can win the pot immediately or set up a big pot when you hit. You also have two overcards for additional equity.',
    keyConcept: 'Semi-bluff with strong draws',
    tags: ['flop', 'semi-bluff', 'raise', 'draw'],
  },

  // Intermediate 15: Defending vs c-bet with gutshot
  {
    id: 'intermediate-15-gutshot-float',
    difficulty: 'intermediate',
    street: 'flop',
    heroPosition: 'BB',
    heroCards: [card('Q', 'hearts'), card('J', 'clubs')],
    communityCards: [card('K', 'diamonds'), card('8', 'spades'), card('4', 'hearts')],
    pot: 65,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 955, false, false, 45),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 970, true, false, 0),
    ],
    actionHistory: [
      action('bet', 'CO', 45),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'call',
    explanation:
      'You have a gutshot straight draw (need T for KQJT), two overcards (Q, J), and backdoor flush potential. While not super strong, you have enough equity to continue. Floating here allows you to realize equity or bluff later streets.',
    keyConcept: 'Float with backdoor equity and overcards',
    tags: ['flop', 'float', 'call', 'draw'],
  },

  // ==================== ADDITIONAL ADVANCED SCENARIOS ====================

  // Advanced 7: Delayed c-bet
  {
    id: 'advanced-7-delayed-cbet',
    difficulty: 'advanced',
    street: 'turn',
    heroPosition: 'CO',
    heroCards: [card('A', 'clubs'), card('Q', 'clubs')],
    communityCards: [card('K', 'hearts'), card('7', 'diamonds'), card('3', 'spades'), card('J', 'clubs')],
    pot: 65,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 970, true, false, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 970, false, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
      action('check', 'CO'),
      action('check', 'BB'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 50,
    explanation:
      'You checked the flop for pot control but the turn brings a great card. You now have a gutshot plus backdoor flush draw. A delayed c-bet represents strength (like a slow-played KK/JJ) and can take down the pot.',
    keyConcept: 'Delayed c-bet on favorable turn cards',
    tags: ['turn', 'delayed-cbet', 'bluff', 'timing'],
  },

  // Advanced 8: River check-raise bluff
  {
    id: 'advanced-8-river-checkraise-bluff',
    difficulty: 'advanced',
    street: 'river',
    heroPosition: 'BB',
    heroCards: [card('6', 'diamonds'), card('5', 'diamonds')],
    communityCards: [
      card('K', 'spades'),
      card('9', 'hearts'),
      card('4', 'diamonds'),
      card('3', 'diamonds'),
      card('A', 'clubs'),
    ],
    pot: 180,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 820, false, false, 60),
      player('SB', 1000, false, true, 0),
      player('BB', 910, true, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
      action('bet', 'BTN', 60),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'raise',
    optimalAmount: 200,
    explanation:
      'You missed your straight flush draw but the Ace on the river is a perfect scare card. A check-raise represents a slow-played Ace or two pair. Villain\'s small bet indicates weakness and they\'ll struggle to call with one pair.',
    keyConcept: 'Bluff raise when scare cards hit',
    tags: ['river', 'bluff', 'check-raise', 'scare-card'],
  },

  // Advanced 9: Call down with Ace-high
  {
    id: 'advanced-9-ace-high-calldown',
    difficulty: 'advanced',
    street: 'river',
    heroPosition: 'BTN',
    heroCards: [card('A', 'spades'), card('K', 'diamonds')],
    communityCards: [
      card('J', 'hearts'),
      card('7', 'clubs'),
      card('4', 'spades'),
      card('2', 'hearts'),
      card('5', 'diamonds'),
    ],
    pot: 220,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 780, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 780, false, false, 75),
    ],
    actionHistory: [
      action('bet', 'BB', 75),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'call',
    explanation:
      'Villain has barreled all three streets on a disconnected board. Your AK beats all busted draws (clubs, 63, 86). The small river sizing is often thin value or a bluff. Your ace-high is a bluff-catcher that should call.',
    keyConcept: 'Call down with bluff-catchers against small bets',
    tags: ['river', 'bluff-catch', 'call', 'ace-high'],
  },

  // Advanced 10: Overbet shove for value
  {
    id: 'advanced-10-overbet-value',
    difficulty: 'advanced',
    street: 'river',
    heroPosition: 'CO',
    heroCards: [card('9', 'clubs'), card('9', 'spades')],
    communityCards: [
      card('9', 'hearts'),
      card('7', 'diamonds'),
      card('5', 'clubs'),
      card('6', 'hearts'),
      card('8', 'spades'),
    ],
    pot: 200,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 450, true, false, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 450, false, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 450,
    explanation:
      'You have a set but the river completed a straight (9-8-7-6-5). However, you beat any T or 4 for a weaker straight. Shoving puts maximum pressure on straights to call and looks like a desperate bluff. The polarized size extracts max value.',
    keyConcept: 'Overbet when you have the nuts advantage',
    tags: ['river', 'overbet', 'value', 'polarizing'],
  },

  // Advanced 11: Hero fold with strong hand
  {
    id: 'advanced-11-hero-fold',
    difficulty: 'advanced',
    street: 'river',
    heroPosition: 'BTN',
    heroCards: [card('A', 'hearts'), card('A', 'clubs')],
    communityCards: [
      card('J', 'spades'),
      card('T', 'spades'),
      card('9', 'spades'),
      card('2', 'hearts'),
      card('3', 'diamonds'),
    ],
    pot: 300,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 400, false, false, 400),
      player('CO', 1000, false, true, 0),
      player('BTN', 700, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 1000, false, true, 0),
    ],
    actionHistory: [
      action('raise', 'MP', 400),
    ],
    validActions: ['fold', 'call'],
    optimalAction: 'fold',
    explanation:
      'You have an overpair but the board shows J-T-9 with three spades. Villain\'s all-in screams flush or straight. Your AA has no spade, so you can\'t even have a flush blocker. Against this action, folding is correct.',
    keyConcept: 'Fold strong hands on coordinated scary boards',
    tags: ['river', 'fold', 'hero-fold', 'board-reading'],
  },

  // Advanced 12: Blocking bet river
  {
    id: 'advanced-12-blocking-bet',
    difficulty: 'advanced',
    street: 'river',
    heroPosition: 'CO',
    heroCards: [card('A', 'spades'), card('J', 'spades')],
    communityCards: [
      card('A', 'hearts'),
      card('8', 'clubs'),
      card('5', 'diamonds'),
      card('3', 'spades'),
      card('Q', 'hearts'),
    ],
    pot: 150,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 850, true, false, 0),
      player('BTN', 850, false, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 1000, false, true, 0),
    ],
    actionHistory: [],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 45,
    explanation:
      'You have top pair with decent kicker but the Queen on the river is scary. A small "blocking bet" (25-33% pot) lets you control the price and extract thin value from worse Ax while preventing villain from betting larger.',
    keyConcept: 'Use blocking bets to control pot size',
    tags: ['river', 'blocking-bet', 'thin-value', 'pot-control'],
  },

  // Advanced 13: Isolation raise
  {
    id: 'advanced-13-isolation-raise',
    difficulty: 'advanced',
    street: 'preflop',
    heroPosition: 'CO',
    heroCards: [card('A', 'diamonds'), card('J', 'clubs')],
    communityCards: [],
    pot: 30,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 990, false, false, 10),
      player('CO', 1000, true, false, 0),
      player('BTN', 1000, false, false, 0),
      player('SB', 995, false, false, 5),
      player('BB', 990, false, false, 10),
    ],
    actionHistory: [
      action('fold', 'UTG'),
      action('call', 'MP', 10),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'raise',
    optimalAmount: 40,
    explanation:
      'When a weak player limps, you should "isolate" them with a raise. AJo plays well heads-up against a limping range. Raising gets value from worse hands and thins the field to play against one weak opponent.',
    keyConcept: 'Isolation raise limpers with strong hands',
    tags: ['preflop', 'isolation', 'raise', 'exploitative'],
  },

  // Advanced 14: Lead river after checking turn
  {
    id: 'advanced-14-river-lead',
    difficulty: 'advanced',
    street: 'river',
    heroPosition: 'BB',
    heroCards: [card('8', 'diamonds'), card('7', 'diamonds')],
    communityCards: [
      card('9', 'clubs'),
      card('6', 'hearts'),
      card('2', 'spades'),
      card('K', 'diamonds'),
      card('5', 'diamonds'),
    ],
    pot: 120,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 880, false, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 880, true, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
      action('check', 'BTN'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 90,
    explanation:
      'You made a straight on the river (9-8-7-6-5). After both checking the turn, villain likely has showdown value but not a strong hand. Betting gets value from Kings, 9x, and weaker made hands that would check back.',
    keyConcept: 'Value bet when you improve on the river',
    tags: ['river', 'value-bet', 'lead', 'straight'],
  },

  // Advanced 15: Float turn in position
  {
    id: 'advanced-15-turn-float',
    difficulty: 'advanced',
    street: 'turn',
    heroPosition: 'BTN',
    heroCards: [card('A', 'hearts'), card('5', 'hearts')],
    communityCards: [card('K', 'clubs'), card('J', 'diamonds'), card('3', 'spades'), card('4', 'hearts')],
    pot: 140,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 860, false, false, 60),
      player('BTN', 930, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 1000, false, true, 0),
    ],
    actionHistory: [
      action('bet', 'CO', 60),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'call',
    explanation:
      'You picked up a gutshot (need a 2) and a flush draw on the turn. Floating with 12 outs is profitable. If villain checks the river, you can bluff or value bet depending on what comes. Position is key.',
    keyConcept: 'Float with equity and position',
    tags: ['turn', 'float', 'call', 'draw'],
  },

  // ==================== ADDITIONAL EXPERT SCENARIOS ====================

  // Expert 7: Multi-way pot dynamics
  {
    id: 'expert-7-multiway-pot',
    difficulty: 'expert',
    street: 'flop',
    heroPosition: 'BB',
    heroCards: [card('T', 'spades'), card('9', 'spades')],
    communityCards: [card('8', 'hearts'), card('7', 'clubs'), card('2', 'diamonds')],
    pot: 90,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 970, false, false, 0),
      player('CO', 970, false, false, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 970, true, false, 0),
    ],
    actionHistory: [
      action('check', 'MP'),
      action('check', 'CO'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'check',
    explanation:
      'You have an open-ended straight draw in a 3-way pot. While betting has merit, checking allows you to see a free card. In multiway pots, hands need more protection but draws prefer free cards. Check and evaluate the turn.',
    keyConcept: 'Play draws passively in multiway pots',
    tags: ['flop', 'multiway', 'check', 'draw'],
  },

  // Expert 8: River overbet bluff
  {
    id: 'expert-8-river-overbet-bluff',
    difficulty: 'expert',
    street: 'river',
    heroPosition: 'BTN',
    heroCards: [card('Q', 'hearts'), card('J', 'hearts')],
    communityCards: [
      card('K', 'spades'),
      card('T', 'diamonds'),
      card('4', 'clubs'),
      card('2', 'hearts'),
      card('A', 'hearts'),
    ],
    pot: 180,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 500, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 500, false, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 500,
    explanation:
      'You missed your straight draw but the Ace on the river is perfect for your range. You represent AK, AT, or a broadway straight. An overbet shove maximizes fold equity and puts maximum pressure on villain\'s one-pair hands.',
    keyConcept: 'Overbet bluff when range advantage is clear',
    tags: ['river', 'bluff', 'overbet', 'polarizing'],
  },

  // Expert 9: Set mining decision
  {
    id: 'expert-9-set-mine-fold',
    difficulty: 'expert',
    street: 'preflop',
    heroPosition: 'BTN',
    heroCards: [card('4', 'hearts'), card('4', 'spades')],
    communityCards: [],
    pot: 185,
    players: [
      player('UTG', 900, false, false, 100),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 1000, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 1000, false, true, 0),
    ],
    actionHistory: [
      action('raise', 'UTG', 100),
      action('fold', 'MP'),
      action('fold', 'CO'),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'fold',
    explanation:
      'Pocket 4s need to hit a set (~12% of flops) to win big pots. With the 4x raise from UTG, you need about 15:1 implied odds to profit. UTG only has 800BB behind - not enough implied odds. Small pairs need deep stacks to set mine.',
    keyConcept: 'Set mining requires proper implied odds',
    tags: ['preflop', 'set-mining', 'fold', 'implied-odds'],
  },

  // Expert 10: Check-call river with showdown value
  {
    id: 'expert-10-check-call-sd',
    difficulty: 'expert',
    street: 'river',
    heroPosition: 'SB',
    heroCards: [card('A', 'clubs'), card('T', 'clubs')],
    communityCards: [
      card('A', 'hearts'),
      card('9', 'diamonds'),
      card('5', 'clubs'),
      card('3', 'spades'),
      card('2', 'hearts'),
    ],
    pot: 200,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 800, true, false, 0),
      player('BB', 800, false, false, 0),
    ],
    actionHistory: [],
    validActions: ['check', 'bet'],
    optimalAction: 'check',
    explanation:
      'You have top pair on a dry board. While you could bet for thin value, checking has merit: it keeps villain\'s bluffs in and induces them to bet worse hands. If villain bets, you have an easy call. This is check-call territory.',
    keyConcept: 'Induce bluffs by checking strong hands',
    tags: ['river', 'check', 'induce', 'showdown-value'],
  },

  // Expert 11: Bet for information
  {
    id: 'expert-11-info-bet',
    difficulty: 'expert',
    street: 'turn',
    heroPosition: 'CO',
    heroCards: [card('Q', 'diamonds'), card('Q', 'hearts')],
    communityCards: [card('A', 'clubs'), card('8', 'spades'), card('5', 'hearts'), card('3', 'diamonds')],
    pot: 100,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 900, true, false, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 900, false, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 50,
    explanation:
      'Your QQ is uncomfortable on this Ace-high board. A small bet serves two purposes: it gets value from pairs below the Ace and it gains information - a raise likely means you\'re beaten. Checking allows free river cards.',
    keyConcept: 'Small bets can gather information while extracting value',
    tags: ['turn', 'bet', 'thin-value', 'information'],
  },

  // Expert 12: Reverse implied odds fold
  {
    id: 'expert-12-reverse-implied',
    difficulty: 'expert',
    street: 'flop',
    heroPosition: 'BB',
    heroCards: [card('K', 'hearts'), card('Q', 'spades')],
    communityCards: [card('A', 'spades'), card('J', 'spades'), card('T', 'spades')],
    pot: 65,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 960, false, false, 45),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 970, true, false, 0),
    ],
    actionHistory: [
      action('bet', 'CO', 45),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'fold',
    explanation:
      'You have the second-nut straight but no spade. The board is incredibly dangerous with the flush already possible. If you call and a spade comes, you\'ll face an impossible decision. The reverse implied odds make this a fold.',
    keyConcept: 'Fold non-nut hands with bad reverse implied odds',
    tags: ['flop', 'fold', 'reverse-implied-odds', 'wet-board'],
  },

  // Expert 13: Call 4-bet with AKs
  {
    id: 'expert-13-call-4bet-aks',
    difficulty: 'expert',
    street: 'preflop',
    heroPosition: 'CO',
    heroCards: [card('A', 'spades'), card('K', 'spades')],
    communityCards: [],
    pot: 270,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 900, true, false, 100),
      player('BTN', 800, false, false, 200),
      player('SB', 1000, false, true, 0),
      player('BB', 1000, false, true, 0),
    ],
    actionHistory: [
      action('fold', 'UTG'),
      action('fold', 'MP'),
      action('raise', 'CO', 30),
      action('raise', 'BTN', 100),
      action('fold', 'SB'),
      action('fold', 'BB'),
      action('raise', 'CO', 100),
      action('raise', 'BTN', 200),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'call',
    explanation:
      'AKs is too strong to fold but calling is often better than 5-bet shoving. Calling keeps villain\'s bluffs in the pot and lets you realize equity postflop. Shoving only gets called by hands that crush you (AA, KK) or flip with (QQ, JJ).',
    keyConcept: 'Flat 4-bets with AKs to realize equity postflop',
    tags: ['preflop', '4-bet', 'call', 'AK'],
  },

  // Expert 14: Turn check-raise bluff
  {
    id: 'expert-14-turn-cr-bluff',
    difficulty: 'expert',
    street: 'turn',
    heroPosition: 'BB',
    heroCards: [card('6', 'spades'), card('5', 'spades')],
    communityCards: [card('K', 'diamonds'), card('9', 'hearts'), card('8', 'spades'), card('7', 'clubs')],
    pot: 140,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 850, false, false, 60),
      player('SB', 1000, false, true, 0),
      player('BB', 930, true, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
      action('bet', 'BTN', 60),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'raise',
    optimalAmount: 180,
    explanation:
      'You turned an open-ended straight draw (need a T or 4). A check-raise as a semi-bluff represents trips, two pair, or a made straight. You have 8 outs if called, and villain will often fold one pair on this scary board.',
    keyConcept: 'Check-raise draws on coordinated turn cards',
    tags: ['turn', 'check-raise', 'semi-bluff', 'draw'],
  },

  // Expert 15: Exploitative limp
  {
    id: 'expert-15-exploitative-limp',
    difficulty: 'expert',
    street: 'preflop',
    heroPosition: 'SB',
    heroCards: [card('A', 'clubs'), card('A', 'diamonds')],
    communityCards: [],
    pot: 15,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 995, true, false, 5),
      player('BB', 990, false, false, 10),
    ],
    actionHistory: [
      action('fold', 'UTG'),
      action('fold', 'MP'),
      action('fold', 'CO'),
      action('fold', 'BTN'),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'raise',
    optimalAmount: 30,
    explanation:
      'While limping AA to trap might seem clever, it\'s suboptimal in most cases. Raising builds the pot immediately and gets value. The BB won\'t always raise, so you miss value. Standard raise is correct - deception is overrated here.',
    keyConcept: 'Raise premium hands even heads-up',
    tags: ['preflop', 'raise', 'premium-hands', 'value'],
  },

  // Expert 16: River range bet
  {
    id: 'expert-16-river-range-bet',
    difficulty: 'expert',
    street: 'river',
    heroPosition: 'CO',
    heroCards: [card('A', 'hearts'), card('K', 'hearts')],
    communityCards: [
      card('A', 'spades'),
      card('9', 'diamonds'),
      card('4', 'clubs'),
      card('2', 'hearts'),
      card('7', 'spades'),
    ],
    pot: 180,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 820, true, false, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 820, false, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 120,
    explanation:
      'You have TPTK on a dry runout. After barreling two streets, the river is a brick. A range bet extracts value from worse Ax and pocket pairs while also representing bluffs. This sizing works well for your entire value range.',
    keyConcept: 'Range bet rivers for value and balance',
    tags: ['river', 'value-bet', 'range', 'sizing'],
  },

  // Expert 17: Calling station adjustment
  {
    id: 'expert-17-exploit-station',
    difficulty: 'expert',
    street: 'river',
    heroPosition: 'BTN',
    heroCards: [card('A', 'clubs'), card('2', 'clubs')],
    communityCards: [
      card('A', 'diamonds'),
      card('7', 'hearts'),
      card('3', 'spades'),
      card('9', 'clubs'),
      card('5', 'diamonds'),
    ],
    pot: 160,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 840, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 840, false, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 100,
    explanation:
      'You have top pair with a weak kicker. Against a calling station, this is a clear value bet. Stations call with any pair, any Ace, and even King-high. You\'re getting value from a very wide range that won\'t fold.',
    keyConcept: 'Value bet thin against calling stations',
    tags: ['river', 'value-bet', 'exploitative', 'thin-value'],
  },

  // Expert 18: Stack-to-pot ratio adjustment
  {
    id: 'expert-18-spr-adjust',
    difficulty: 'expert',
    street: 'flop',
    heroPosition: 'BTN',
    heroCards: [card('Q', 'spades'), card('Q', 'clubs')],
    communityCards: [card('K', 'hearts'), card('8', 'diamonds'), card('3', 'clubs')],
    pot: 200,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 300, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 300, false, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 300,
    explanation:
      'With a stack-to-pot ratio (SPR) of 1.5, you\'re committed with QQ. The King is scary but you can\'t fold. Shoving puts maximum pressure on draws and worse pairs. At this SPR, there\'s not enough maneuverability to play smaller.',
    keyConcept: 'Commit with good hands at low SPR',
    tags: ['flop', 'SPR', 'commitment', 'overpair'],
  },

  // Expert 19: Turn probe raise
  {
    id: 'expert-19-turn-probe-raise',
    difficulty: 'expert',
    street: 'turn',
    heroPosition: 'BB',
    heroCards: [card('T', 'diamonds'), card('9', 'diamonds')],
    communityCards: [card('8', 'spades'), card('7', 'hearts'), card('2', 'clubs'), card('J', 'diamonds')],
    pot: 80,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 900, false, false, 40),
      player('SB', 1000, false, true, 0),
      player('BB', 960, true, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
      action('check', 'BTN'),
      action('bet', 'BB', 30),
      action('raise', 'BTN', 100),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'call',
    explanation:
      'You made a straight on the turn (J-T-9-8-7). Villain\'s raise could be a set, two pair, or a worse straight. Calling keeps the pot controlled and lets you evaluate the river. Raising telegraphs your hand and only gets action from better.',
    keyConcept: 'Flat strong hands when raising folds out worse',
    tags: ['turn', 'call', 'deception', 'made-hand'],
  },

  // Expert 20: Multiway pot squeeze
  {
    id: 'expert-20-multiway-squeeze',
    difficulty: 'expert',
    street: 'preflop',
    heroPosition: 'SB',
    heroCards: [card('K', 'clubs'), card('Q', 'clubs')],
    communityCards: [],
    pot: 95,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 980, false, false, 20),
      player('CO', 980, false, false, 20),
      player('BTN', 980, false, false, 20),
      player('SB', 995, true, false, 5),
      player('BB', 990, false, false, 10),
    ],
    actionHistory: [
      action('fold', 'UTG'),
      action('raise', 'MP', 20),
      action('call', 'CO', 20),
      action('call', 'BTN', 20),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'raise',
    optimalAmount: 110,
    explanation:
      'KQs is excellent for a multiway squeeze. Three callers means dead money and capped ranges. A large 3-bet will often take down the pot immediately. When called, KQs plays well postflop with its combo-draw potential.',
    keyConcept: 'Squeeze with premium suited hands against multiple callers',
    tags: ['preflop', 'squeeze', '3-bet', 'multiway'],
  },

  // ==================== MORE BEGINNER SCENARIOS ====================

  // Beginner 16: Call with pocket pair
  {
    id: 'beginner-16-call-pocket-pair',
    difficulty: 'beginner',
    street: 'preflop',
    heroPosition: 'MP',
    heroCards: [card('7', 'clubs'), card('7', 'diamonds')],
    communityCards: [],
    pot: 45,
    players: [
      player('UTG', 975, false, false, 25),
      player('MP', 1000, true, false, 0),
      player('CO', 1000, false, false, 0),
      player('BTN', 1000, false, false, 0),
      player('SB', 995, false, false, 5),
      player('BB', 990, false, false, 10),
    ],
    actionHistory: [
      action('raise', 'UTG', 25),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'call',
    explanation:
      'Pocket 7s is a good set-mining hand. You\'re calling to hit a set (~12% of flops). With deep stacks and good implied odds, calling is profitable. Folding is too tight, raising doesn\'t make sense with a medium pair.',
    keyConcept: 'Call with medium pairs to set mine',
    tags: ['preflop', 'call', 'set-mining', 'pocket-pair'],
  },

  // Beginner 17: Two pair on flop
  {
    id: 'beginner-17-two-pair-bet',
    difficulty: 'beginner',
    street: 'flop',
    heroPosition: 'BTN',
    heroCards: [card('K', 'clubs'), card('T', 'hearts')],
    communityCards: [card('K', 'diamonds'), card('T', 'spades'), card('4', 'clubs')],
    pot: 70,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 965, false, false, 0),
      player('BTN', 965, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 1000, false, true, 0),
    ],
    actionHistory: [
      action('check', 'CO'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 50,
    explanation:
      'You flopped top two pair - a monster hand! Bet to build the pot and get value from Kings, Tens, and draws. Two pair is strong but vulnerable to flush draws and straight draws on later streets.',
    keyConcept: 'Bet two pair for value',
    tags: ['flop', 'value-bet', 'two-pair', 'made-hand'],
  },

  // Beginner 18: Fold small suited on SB
  {
    id: 'beginner-18-sb-fold-trash',
    difficulty: 'beginner',
    street: 'preflop',
    heroPosition: 'SB',
    heroCards: [card('5', 'hearts'), card('3', 'hearts')],
    communityCards: [],
    pot: 55,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 975, false, false, 25),
      player('CO', 1000, false, true, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 995, true, false, 5),
      player('BB', 990, false, false, 10),
    ],
    actionHistory: [
      action('fold', 'UTG'),
      action('raise', 'MP', 25),
      action('fold', 'CO'),
      action('fold', 'BTN'),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'fold',
    explanation:
      '53 suited is too weak to call a raise from out of position. You\'ll rarely make a strong hand and will be dominated by better suited hands. Save your chips for better spots.',
    keyConcept: 'Fold weak hands out of position',
    tags: ['preflop', 'fold', 'position', 'hand-selection'],
  },

  // Beginner 19: Trips on board - bet
  {
    id: 'beginner-19-trips-bet',
    difficulty: 'beginner',
    street: 'turn',
    heroPosition: 'CO',
    heroCards: [card('A', 'spades'), card('8', 'spades')],
    communityCards: [card('8', 'diamonds'), card('8', 'hearts'), card('3', 'clubs'), card('K', 'hearts')],
    pot: 100,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 900, true, false, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 900, false, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 70,
    explanation:
      'You have trip 8s with an Ace kicker - a very strong hand. The King on the turn is a great card to get value from. Bet to get calls from Kings, pocket pairs, and worse 8x hands.',
    keyConcept: 'Value bet trips',
    tags: ['turn', 'value-bet', 'trips', 'made-hand'],
  },

  // Beginner 20: Fold river without a made hand
  {
    id: 'beginner-20-fold-air-river',
    difficulty: 'beginner',
    street: 'river',
    heroPosition: 'BTN',
    heroCards: [card('J', 'clubs'), card('T', 'spades')],
    communityCards: [
      card('A', 'hearts'),
      card('K', 'diamonds'),
      card('5', 'clubs'),
      card('3', 'hearts'),
      card('7', 'spades'),
    ],
    pot: 120,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 880, false, false, 80),
      player('BTN', 920, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 1000, false, true, 0),
    ],
    actionHistory: [
      action('bet', 'CO', 80),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'fold',
    explanation:
      'You have Jack-high - nothing. Your straight draw missed completely. Calling would be pure speculation hoping villain is bluffing. Against a substantial river bet, Jack-high cannot win at showdown.',
    keyConcept: 'Fold when you have nothing',
    tags: ['river', 'fold', 'missed-draw', 'hand-reading'],
  },

  // ==================== MORE INTERMEDIATE SCENARIOS ====================

  // Intermediate 16: Button steal
  {
    id: 'intermediate-16-btn-steal',
    difficulty: 'intermediate',
    street: 'preflop',
    heroPosition: 'BTN',
    heroCards: [card('K', 'spades'), card('6', 'hearts')],
    communityCards: [],
    pot: 15,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 1000, true, false, 0),
      player('SB', 995, false, false, 5),
      player('BB', 990, false, false, 10),
    ],
    actionHistory: [
      action('fold', 'UTG'),
      action('fold', 'MP'),
      action('fold', 'CO'),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'raise',
    optimalAmount: 25,
    explanation:
      'K6o is normally a fold, but when folded to the button, you should "steal" the blinds with a raise. Blinds fold often enough to make this profitable. Your King-high will often be best if called.',
    keyConcept: 'Steal blinds from the button with wide range',
    tags: ['preflop', 'steal', 'button', 'position'],
  },

  // Intermediate 17: Check-call turn with drawing hand
  {
    id: 'intermediate-17-check-call-draw',
    difficulty: 'intermediate',
    street: 'turn',
    heroPosition: 'BB',
    heroCards: [card('9', 'hearts'), card('8', 'hearts')],
    communityCards: [card('T', 'clubs'), card('6', 'hearts'), card('2', 'spades'), card('K', 'hearts')],
    pot: 120,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 880, false, false, 60),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 940, true, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
      action('bet', 'CO', 60),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'call',
    explanation:
      'You have an open-ended straight draw plus a flush draw - a monster draw with 15 outs. Getting nearly 3:1 pot odds, calling is clearly profitable. You\'ll complete your draw about 33% of the time on the river.',
    keyConcept: 'Call with strong combo draws getting good odds',
    tags: ['turn', 'call', 'combo-draw', 'pot-odds'],
  },

  // Intermediate 18: 3-bet light from BB
  {
    id: 'intermediate-18-3bet-light',
    difficulty: 'intermediate',
    street: 'preflop',
    heroPosition: 'BB',
    heroCards: [card('A', 'diamonds'), card('8', 'diamonds')],
    communityCards: [],
    pot: 55,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 980, false, false, 20),
      player('SB', 1000, false, true, 0),
      player('BB', 990, true, false, 10),
    ],
    actionHistory: [
      action('fold', 'UTG'),
      action('fold', 'MP'),
      action('fold', 'CO'),
      action('raise', 'BTN', 20),
      action('fold', 'SB'),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'raise',
    optimalAmount: 70,
    explanation:
      'Against a button open, A8s is a good hand to 3-bet as a light squeeze. Button opens wide, so you\'re often ahead. 3-betting takes the initiative and often wins the pot immediately.',
    keyConcept: '3-bet light against late position opens',
    tags: ['preflop', '3-bet', 'BB-defense', 'semi-bluff'],
  },

  // Intermediate 19: Fold to check-raise
  {
    id: 'intermediate-19-fold-to-cr',
    difficulty: 'intermediate',
    street: 'flop',
    heroPosition: 'CO',
    heroCards: [card('A', 'clubs'), card('J', 'diamonds')],
    communityCards: [card('J', 'hearts'), card('9', 'spades'), card('8', 'spades')],
    pot: 185,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 910, true, false, 45),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 810, false, false, 140),
    ],
    actionHistory: [
      action('check', 'BB'),
      action('bet', 'CO', 45),
      action('raise', 'BB', 140),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'fold',
    explanation:
      'You have top pair but the board is very coordinated with flush and straight draws. A check-raise here typically represents a strong made hand (set, two pair) or a big draw. Your TPGK struggles against this range.',
    keyConcept: 'Fold top pair to check-raises on wet boards',
    tags: ['flop', 'fold', 'check-raise', 'board-texture'],
  },

  // Intermediate 20: River bluff catch
  {
    id: 'intermediate-20-bluff-catch',
    difficulty: 'intermediate',
    street: 'river',
    heroPosition: 'BB',
    heroCards: [card('A', 'hearts'), card('9', 'hearts')],
    communityCards: [
      card('K', 'spades'),
      card('8', 'diamonds'),
      card('5', 'clubs'),
      card('3', 'hearts'),
      card('2', 'spades'),
    ],
    pot: 180,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 870, false, false, 50),
      player('SB', 1000, false, true, 0),
      player('BB', 920, true, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
      action('bet', 'BTN', 50),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'call',
    explanation:
      'You called preflop and check-called the flop with Ace-high. The turn and river were complete bricks. Villain\'s small river bet screams thin value or a bluff. Your Ace-high beats all busted draws and should call.',
    keyConcept: 'Call small river bets with showdown value',
    tags: ['river', 'bluff-catch', 'call', 'pot-odds'],
  },

  // ==================== MORE ADVANCED SCENARIOS ====================

  // Advanced 16: Donk bet for value
  {
    id: 'advanced-16-donk-value',
    difficulty: 'advanced',
    street: 'flop',
    heroPosition: 'BB',
    heroCards: [card('8', 'clubs'), card('7', 'clubs')],
    communityCards: [card('8', 'hearts'), card('7', 'spades'), card('2', 'diamonds')],
    pot: 60,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 970, false, false, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 970, true, false, 0),
    ],
    actionHistory: [],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 40,
    explanation:
      'You flopped top two pair on a dry board. While checking to the raiser is standard, a "donk bet" here makes sense. Villain will often check back weak hands, and you miss value. Betting gets money from overcards and overpairs.',
    keyConcept: 'Donk bet two pair on dry boards for value',
    tags: ['flop', 'donk-bet', 'value', 'two-pair'],
  },

  // Advanced 17: Fold flush to bigger flush
  {
    id: 'advanced-17-fold-flush',
    difficulty: 'advanced',
    street: 'river',
    heroPosition: 'BTN',
    heroCards: [card('9', 'diamonds'), card('7', 'diamonds')],
    communityCards: [
      card('A', 'diamonds'),
      card('K', 'diamonds'),
      card('5', 'hearts'),
      card('2', 'clubs'),
      card('3', 'diamonds'),
    ],
    pot: 250,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 600, false, false, 200),
      player('CO', 1000, false, true, 0),
      player('BTN', 750, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 1000, false, true, 0),
    ],
    actionHistory: [
      action('bet', 'MP', 200),
    ],
    validActions: ['fold', 'call', 'raise'],
    optimalAction: 'fold',
    explanation:
      'You have a flush but it\'s only 9-high. The river bet is very large on a four-flush board. Villain likely has a higher diamond (Qd, Jd, Td). Your hand is near the bottom of your flush range and should fold to this sizing.',
    keyConcept: 'Fold weak flushes to large bets',
    tags: ['river', 'fold', 'flush', 'hand-ranking'],
  },

  // Advanced 18: Bluff river after missed draw
  {
    id: 'advanced-18-bluff-missed-draw',
    difficulty: 'advanced',
    street: 'river',
    heroPosition: 'CO',
    heroCards: [card('J', 'spades'), card('T', 'spades')],
    communityCards: [
      card('9', 'hearts'),
      card('8', 'clubs'),
      card('3', 'spades'),
      card('2', 'diamonds'),
      card('A', 'hearts'),
    ],
    pot: 160,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 840, true, false, 0),
      player('BTN', 1000, false, true, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 840, false, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'bet',
    optimalAmount: 120,
    explanation:
      'Your straight draw missed, but the Ace on the river is an excellent bluff card. You represent hands like AK, A9, A8 that improved. Villain\'s check suggests weakness, and a big bet can fold out 9x, 8x, and pocket pairs.',
    keyConcept: 'Bluff on scare cards after missed draws',
    tags: ['river', 'bluff', 'scare-card', 'semi-bluff'],
  },

  // Advanced 19: Call all-in with AK preflop
  {
    id: 'advanced-19-call-allin-ak',
    difficulty: 'advanced',
    street: 'preflop',
    heroPosition: 'BTN',
    heroCards: [card('A', 'hearts'), card('K', 'hearts')],
    communityCards: [],
    pot: 1015,
    players: [
      player('UTG', 0, false, false, 500),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 500, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 1000, false, true, 0),
    ],
    actionHistory: [
      action('raise', 'UTG', 500),
      action('fold', 'MP'),
      action('fold', 'CO'),
    ],
    validActions: ['fold', 'call'],
    optimalAction: 'call',
    explanation:
      'AK suited is one of the best hands in poker. Against an all-in, you\'re flipping against QQ-JJ, dominating AQ-AT, and only crushed by AA-KK. Getting 2:1 pot odds, this is a mandatory call.',
    keyConcept: 'Call all-ins with AKs getting good odds',
    tags: ['preflop', 'call', 'all-in', 'AK'],
  },

  // Advanced 20: Check back river with showdown value
  {
    id: 'advanced-20-check-back-sdv',
    difficulty: 'advanced',
    street: 'river',
    heroPosition: 'BTN',
    heroCards: [card('Q', 'diamonds'), card('J', 'diamonds')],
    communityCards: [
      card('Q', 'hearts'),
      card('9', 'clubs'),
      card('5', 'spades'),
      card('2', 'hearts'),
      card('8', 'diamonds'),
    ],
    pot: 140,
    players: [
      player('UTG', 1000, false, true, 0),
      player('MP', 1000, false, true, 0),
      player('CO', 1000, false, true, 0),
      player('BTN', 860, true, false, 0),
      player('SB', 1000, false, true, 0),
      player('BB', 860, false, false, 0),
    ],
    actionHistory: [
      action('check', 'BB'),
    ],
    validActions: ['check', 'bet'],
    optimalAction: 'check',
    explanation:
      'You have top pair with second kicker. This is good showdown value but betting risks being check-raised by better hands (AQ, KQ, sets) or making weaker hands fold. Checking wins at showdown against villain\'s bluffs and missed draws.',
    keyConcept: 'Check back with medium showdown value',
    tags: ['river', 'check', 'pot-control', 'showdown-value'],
  },
];

export default scenarios;
