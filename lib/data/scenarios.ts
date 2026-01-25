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
    id: 'beginner-1',
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
];

export default scenarios;
