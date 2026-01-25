# PRD: Poker Quiz Mobile Application

## Introduction

A mobile-first single-page poker training application built with Next.js 16, shadcn, and Tailwind v4. The app presents players with realistic No-Limit Texas Hold'em scenarios and challenges them to make optimal decisions (raise, call, check, fold). Players receive detailed feedback on their choices, track their progress through a gamification system with levels and achievements, and improve their poker skills from beginner to advanced levels.

## Goals

- Provide an engaging, educational poker training experience on mobile devices
- Present realistic poker scenarios covering all streets (preflop, flop, turn, river)
- Offer difficulty progression from basic hand rankings to GTO concepts
- Give detailed, educational feedback explaining optimal decisions
- Implement gamification (levels, achievements, streaks) to encourage continued learning
- Deliver a smooth, modern, highly reactive user experience
- Support session-based play with progressive unlockable content

## User Stories

### US-001: View poker table with current scenario
**Description:** As a player, I want to see a visually appealing poker table showing my cards, position, community cards, and action history so I can assess the situation.

**Acceptance Criteria:**
- [ ] Semi-realistic top-down poker table renders with 6 or 9 player positions
- [ ] Player avatars/placeholders shown at each position
- [ ] Hero's position clearly highlighted (e.g., "You are BTN")
- [ ] Hero's hole cards displayed prominently
- [ ] Community cards shown in center (based on street)
- [ ] Pot size displayed clearly
- [ ] Stack sizes shown for relevant players
- [ ] Current street indicator (Preflop/Flop/Turn/River)
- [ ] Table renders correctly on mobile viewports (375px+)
- [ ] npm run typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-002: View action history for current hand
**Description:** As a player, I want to see what actions have occurred before my decision so I can make an informed choice.

**Acceptance Criteria:**
- [ ] Action timeline/log shows previous actions in order
- [ ] Each action shows: position, action type, amount (if applicable)
- [ ] Current action prompt clearly indicates it's hero's turn
- [ ] Preflop actions distinguished from postflop actions
- [ ] Actions color-coded by type (fold=gray, call=blue, raise=red, check=green)
- [ ] npm run typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-003: Submit decision for current scenario
**Description:** As a player, I want to select my action (fold, check, call, raise) so I can answer the quiz question.

**Acceptance Criteria:**
- [ ] Action buttons displayed prominently at bottom of screen
- [ ] Only valid actions shown (e.g., no "check" when facing a bet)
- [ ] Raise option includes amount selection when applicable
- [ ] Buttons are large enough for mobile touch (min 44px tap target)
- [ ] Visual feedback on button press (haptic optional)
- [ ] Submitting action triggers answer evaluation
- [ ] npm run typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-004: Receive feedback after answering
**Description:** As a player, I want to see whether my answer was correct and understand why the optimal play is best.

**Acceptance Criteria:**
- [ ] Immediate visual feedback (correct=green, incorrect=red)
- [ ] Optimal action clearly displayed
- [ ] Explanation panel shows reasoning (pot odds, position, hand strength, etc.)
- [ ] EV (expected value) comparison when relevant
- [ ] "Key concept" highlighted for learning
- [ ] Option to continue to next question
- [ ] Points/XP awarded displayed
- [ ] npm run typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-005: Track session progress
**Description:** As a player, I want to see my progress through a quiz session so I know how I'm doing.

**Acceptance Criteria:**
- [ ] Session progress indicator (e.g., "Question 5/10")
- [ ] Running accuracy percentage displayed
- [ ] Current streak counter (consecutive correct)
- [ ] Points earned this session
- [ ] Session summary screen at end with stats
- [ ] Option to start new session or return to menu
- [ ] npm run typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-006: Select difficulty level
**Description:** As a player, I want to choose my difficulty level so scenarios match my skill level.

**Acceptance Criteria:**
- [ ] Difficulty selector on home/menu screen
- [ ] Three+ levels: Beginner, Intermediate, Advanced (optionally Expert/GTO)
- [ ] Brief description of what each level covers
- [ ] Locked levels show unlock requirements
- [ ] Selected difficulty persists in local storage
- [ ] npm run typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-007: View and earn achievements
**Description:** As a player, I want to earn achievements for milestones so I feel rewarded for my progress.

**Acceptance Criteria:**
- [ ] Achievement notification appears when earned (non-blocking toast)
- [ ] Achievements page lists all achievements (earned and locked)
- [ ] Categories: accuracy, streaks, volume, level completion
- [ ] Each achievement shows: icon, title, description, earned date (if earned)
- [ ] Progress shown for incremental achievements (e.g., "47/100 correct answers")
- [ ] Achievements persist in local storage
- [ ] npm run typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-008: Track player level and XP
**Description:** As a player, I want to level up as I play so I can see my overall progress.

**Acceptance Criteria:**
- [ ] XP bar shown on main menu/header
- [ ] Current level displayed prominently
- [ ] XP earned per correct answer (bonus for streaks, difficulty)
- [ ] Level-up animation/notification when threshold reached
- [ ] Levels unlock new content (harder scenarios, new achievements)
- [ ] Progress persists in local storage
- [ ] npm run typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-009: Configure quiz session settings
**Description:** As a player, I want to customize my session (number of questions, specific topics) so I can focus my practice.

**Acceptance Criteria:**
- [ ] Session length selector (5, 10, 15, 20 questions)
- [ ] Topic filter: position play, preflop ranges, postflop play, bluffing, value betting
- [ ] Street filter: preflop only, postflop only, all streets
- [ ] Settings saved as preferences
- [ ] Quick play option with default settings
- [ ] npm run typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-010: Create scenario data structure and curated bank
**Description:** As a developer, I need a data model for scenarios and an initial bank of curated key situations.

**Acceptance Criteria:**
- [ ] TypeScript types defined for Scenario, Player, Action, Card, Position
- [ ] Scenario includes: hero cards, position, street, community cards, action history, valid actions, optimal action, explanation, difficulty, tags
- [ ] JSON/TS file with 20+ curated scenarios covering all difficulties
- [ ] Scenarios cover key situations: open-raise spots, 3-bet pots, continuation bets, draws, value/bluff rivers
- [ ] Scenario validation utility ensures data integrity
- [ ] npm run typecheck passes

### US-011: Implement scenario randomization logic
**Description:** As a developer, I need logic to generate varied scenarios based on curated templates.

**Acceptance Criteria:**
- [ ] Function to randomize hero hole cards within defined ranges
- [ ] Function to randomize stack sizes within realistic bounds
- [ ] Function to vary bet sizes within logical ranges
- [ ] Randomization preserves scenario validity (correct optimal answer)
- [ ] Weighted selection based on difficulty and player level
- [ ] npm run typecheck passes

### US-012: Display player statistics
**Description:** As a player, I want to see my overall stats so I can track improvement over time.

**Acceptance Criteria:**
- [ ] Stats page accessible from main menu
- [ ] Total questions answered
- [ ] Overall accuracy percentage
- [ ] Accuracy by difficulty level
- [ ] Accuracy by street (preflop/flop/turn/river)
- [ ] Accuracy by decision type (fold/check/call/raise)
- [ ] Best streak record
- [ ] Stats persist in local storage
- [ ] npm run typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-013: Implement smooth animations and transitions
**Description:** As a player, I want smooth animations so the app feels polished and reactive.

**Acceptance Criteria:**
- [ ] Card dealing animation when scenario loads
- [ ] Action button press feedback (scale/color)
- [ ] Slide transition between question and feedback
- [ ] Progress bar animations (XP, session progress)
- [ ] Achievement unlock animation
- [ ] Page transitions are smooth (no layout shift)
- [ ] Animations respect reduced-motion preferences
- [ ] npm run typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-014: Implement responsive mobile-first layout
**Description:** As a player, I want the app to work perfectly on my phone so I can practice anywhere.

**Acceptance Criteria:**
- [ ] Full functionality on 375px viewport width
- [ ] Touch-friendly tap targets (minimum 44x44px)
- [ ] No horizontal scrolling required
- [ ] Poker table scales appropriately to screen size
- [ ] Bottom navigation/actions within thumb reach
- [ ] Works in both portrait and landscape
- [ ] npm run typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-015: Persist game state locally
**Description:** As a player, I want my progress saved so I don't lose it when I close the app.

**Acceptance Criteria:**
- [ ] Player level and XP saved to localStorage
- [ ] Achievements saved to localStorage
- [ ] Statistics saved to localStorage
- [ ] Settings/preferences saved to localStorage
- [ ] In-progress session can be resumed (optional)
- [ ] Data loads correctly on app restart
- [ ] npm run typecheck passes

## Functional Requirements

- FR-1: The app shall display a semi-realistic poker table with 6-9 positions, avatars, and chip representations
- FR-2: The app shall show hero's hole cards, position, and stack size clearly
- FR-3: The app shall display community cards based on the current street (none for preflop, 3 for flop, 4 for turn, 5 for river)
- FR-4: The app shall show a chronological action history with position, action type, and amounts
- FR-5: The app shall present only valid action options based on the game state (e.g., cannot check when facing a bet)
- FR-6: The app shall evaluate player decisions and display correct/incorrect feedback immediately
- FR-7: The app shall provide detailed explanations for optimal plays including concepts like pot odds, position, ranges, and EV
- FR-8: The app shall track and display session progress (questions answered, accuracy, streak)
- FR-9: The app shall support multiple difficulty levels: Beginner, Intermediate, Advanced, Expert
- FR-10: The app shall award XP based on correct answers with multipliers for difficulty and streaks
- FR-11: The app shall implement a leveling system where XP thresholds unlock new content
- FR-12: The app shall track and award achievements for various milestones
- FR-13: The app shall persist all player progress in browser localStorage
- FR-14: The app shall include both curated key scenarios and randomized variations
- FR-15: The app shall be fully functional on mobile devices (375px+) with touch-friendly controls
- FR-16: The app shall implement smooth animations with respect for reduced-motion preferences

## Non-Goals (Out of Scope)

- **No multiplayer or real-time play** - This is a single-player training tool
- **No real money or gambling** - Purely educational
- **No backend/server** - All data stored locally (v1)
- **No user accounts/authentication** - Local storage only (v1)
- **No leaderboards** - Single player focus (v1)
- **No other poker variants** - NLHE only for v1
- **No hand replayer** - Focus is on decision points, not full hand replay
- **No ICM or tournament-specific scenarios** - Cash game focus for v1
- **No custom scenario creation by users** - Curated + randomized only (v1)

## Design Considerations

### Visual Design
- Semi-realistic poker table with felt texture background
- Card designs should be clean and easily readable
- Player positions shown as circular avatars with position labels
- Chips visualized near player positions
- Color scheme: felt green primary, with card whites/reds/blacks
- Dark mode support using existing design tokens

### UX Patterns
- Bottom-sheet style action panel for decision buttons
- Swipe or tap to advance between scenarios
- Pull-to-refresh style feel for "next question"
- Toast notifications for achievements (non-blocking)
- Modal for detailed explanations (dismissible)

### Existing Components to Leverage
- `Button` - action buttons, navigation
- `Card` - scenario display, stats cards, achievement cards
- `Badge` - difficulty indicators, position labels, action tags
- `AlertDialog` - session end summary, quit confirmation
- `Separator` - dividing content sections

### New Components Needed
- `PokerTable` - main table visualization
- `PlayingCard` - individual card display
- `ActionHistory` - timeline of actions
- `XPBar` - experience progress bar
- `AchievementToast` - achievement notification
- `StatCard` - individual stat display

## Technical Considerations

### State Management
- React Context or Zustand for global game state
- localStorage for persistence
- Consider `useSyncExternalStore` for storage sync

### Performance
- Lazy load scenario bank
- Memoize table rendering calculations
- Use CSS transforms for animations (GPU accelerated)
- Virtualize achievement list if large

### Data Structure
```typescript
interface Scenario {
  id: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  street: 'preflop' | 'flop' | 'turn' | 'river';
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
```

### Animations
- Use Framer Motion or CSS animations
- tw-animate-css already installed for Tailwind animations
- Ensure 60fps on mobile devices

## Success Metrics

- Players complete at least 3 sessions on average before churning
- Average session length of 10+ questions
- 70%+ of players return for a second session
- Player accuracy improves by 10%+ from first to fifth session
- App achieves 60fps animation performance on mid-range devices
- Time to interactive under 3 seconds on 4G connection

## Open Questions

1. Should we include sound effects for actions/feedback? (Accessibility considerations)
2. What specific hand ranges should define each difficulty level?
3. Should explanations include equity calculations or keep it conceptual?
4. How many curated scenarios are needed before launch (MVP)?
5. Should we track "time per decision" as a stat?
6. Consider future: API backend for syncing progress across devices?
