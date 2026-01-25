'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { PlayingCard } from './playing-card';
import type { Player, Card } from '@/lib/types';

interface PlayerSeatProps {
  player: Player;
  cards?: [Card, Card];
  showCards?: boolean;
  className?: string;
}

export function PlayerSeat({ player, cards, showCards = false, className }: PlayerSeatProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-1',
        player.isFolded && 'opacity-50',
        className
      )}
    >
      {/* Avatar and position */}
      <div className="relative">
        <div
          className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold',
            'border-2 transition-all',
            player.isHero
              ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30'
              : 'bg-muted text-muted-foreground border-border'
          )}
        >
          {player.position}
        </div>

        {/* Fold indicator */}
        {player.isFolded && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center">
            <span className="text-[8px] text-destructive-foreground font-bold">X</span>
          </div>
        )}
      </div>

      {/* Stack size */}
      <Badge
        variant={player.isHero ? 'default' : 'secondary'}
        className="text-[10px] px-1.5 py-0"
      >
        {formatStack(player.stack)}
      </Badge>

      {/* Hero cards */}
      {player.isHero && cards && (
        <div className="flex gap-0.5 mt-1">
          <PlayingCard
            card={showCards ? cards[0] : undefined}
            faceDown={!showCards}
            size="sm"
          />
          <PlayingCard
            card={showCards ? cards[1] : undefined}
            faceDown={!showCards}
            size="sm"
          />
        </div>
      )}

      {/* Current bet indicator */}
      {player.currentBet > 0 && (
        <div className="flex items-center gap-1 mt-1">
          <div className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-600" />
          <span className="text-[10px] font-medium">{player.currentBet}</span>
        </div>
      )}
    </div>
  );
}

function formatStack(stack: number): string {
  if (stack >= 1000) {
    return `${(stack / 1000).toFixed(1)}k`;
  }
  return stack.toString();
}

export default PlayerSeat;
