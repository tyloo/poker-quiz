'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { PlayingCard, CardSlot } from './playing-card';
import { PlayerSeat } from './player-seat';
import type { Scenario, Position, Card } from '@/lib/types';

interface PokerTableProps {
  scenario: Scenario;
  showHeroCards?: boolean;
  className?: string;
}

// Position layout for 6-max table (clockwise from BTN at bottom)
const POSITION_LAYOUT: Record<Position, { x: string; y: string }> = {
  BTN: { x: '50%', y: '95%' },
  SB: { x: '15%', y: '75%' },
  BB: { x: '15%', y: '35%' },
  UTG: { x: '50%', y: '5%' },
  MP: { x: '85%', y: '35%' },
  CO: { x: '85%', y: '75%' },
};

const STREET_LABELS = {
  preflop: 'Preflop',
  flop: 'Flop',
  turn: 'Turn',
  river: 'River',
};

export function PokerTable({ scenario, showHeroCards = true, className }: PokerTableProps) {
  const communityCards = getCommunityCards(scenario);

  return (
    <div className={cn('relative w-full max-w-md mx-auto', className)}>
      {/* Table felt */}
      <div className="relative aspect-[4/3] w-full">
        {/* Outer border */}
        <div className="absolute inset-0 rounded-[50%] bg-gradient-to-b from-poker-rail to-poker-rail-dark p-2">
          {/* Inner felt */}
          <div className="relative w-full h-full rounded-[50%] bg-gradient-to-b from-poker-table-light to-poker-table shadow-inner overflow-hidden">
            {/* Felt texture overlay */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

            {/* Center area */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              {/* Street indicator */}
              <Badge variant="secondary" className="text-xs font-semibold">
                {STREET_LABELS[scenario.street]}
              </Badge>

              {/* Community cards */}
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className="animate-in fade-in zoom-in-95 duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {communityCards[index] ? (
                      <PlayingCard card={communityCards[index]} size="sm" animate />
                    ) : (
                      <CardSlot size="sm" />
                    )}
                  </div>
                ))}
              </div>

              {/* Pot */}
              <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-full">
                <div className="w-4 h-4 rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 border border-yellow-500 shadow" />
                <span className="text-white font-bold text-sm">{scenario.pot}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Player seats */}
        {scenario.players.map((player) => {
          const position = POSITION_LAYOUT[player.position];
          const heroCards = player.isHero ? scenario.heroCards : undefined;

          return (
            <div
              key={player.position}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: position.x,
                top: position.y,
              }}
            >
              <PlayerSeat
                player={player}
                cards={heroCards}
                showCards={showHeroCards && player.isHero}
              />
            </div>
          );
        })}
      </div>

      {/* Hero position indicator */}
      <div className="text-center mt-2">
        <Badge variant="outline" className="text-xs">
          You are {scenario.heroPosition}
        </Badge>
      </div>
    </div>
  );
}

function getCommunityCards(scenario: Scenario): (Card | undefined)[] {
  const cards: (Card | undefined)[] = [];

  switch (scenario.street) {
    case 'preflop':
      // No community cards
      break;
    case 'flop':
      cards.push(...scenario.communityCards.slice(0, 3));
      break;
    case 'turn':
      cards.push(...scenario.communityCards.slice(0, 4));
      break;
    case 'river':
      cards.push(...scenario.communityCards.slice(0, 5));
      break;
  }

  // Pad with undefined to always have 5 slots
  while (cards.length < 5) {
    cards.push(undefined);
  }

  return cards;
}

export default PokerTable;
