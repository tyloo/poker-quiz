'use client';

import { cn } from '@/lib/utils';
import type { Card, Suit } from '@/lib/types';

const SUIT_SYMBOLS: Record<Suit, string> = {
  spades: '♠',
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
};

const SUIT_COLORS: Record<Suit, string> = {
  spades: 'text-gray-900 dark:text-gray-100',
  hearts: 'text-red-600 dark:text-red-500',
  diamonds: 'text-red-600 dark:text-red-500',
  clubs: 'text-gray-900 dark:text-gray-100',
};

interface PlayingCardProps {
  card?: Card;
  faceDown?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
}

const SIZE_CLASSES = {
  sm: 'w-10 h-14 text-sm',
  md: 'w-14 h-20 text-base',
  lg: 'w-20 h-28 text-xl',
};

const RANK_SIZE_CLASSES = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-4xl',
};

const SUIT_SIZE_CLASSES = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-3xl',
};

export function PlayingCard({
  card,
  faceDown = false,
  size = 'md',
  className,
  animate = false,
}: PlayingCardProps) {
  const showBack = faceDown || !card;

  return (
    <div
      className={cn(
        'relative rounded-lg shadow-md transition-transform',
        SIZE_CLASSES[size],
        animate && 'animate-in fade-in slide-in-from-bottom-2 duration-300',
        className
      )}
    >
      {showBack ? (
        <CardBack size={size} />
      ) : (
        <CardFace card={card} size={size} />
      )}
    </div>
  );
}

function CardBack(_props: { size: 'sm' | 'md' | 'lg' }) {
  return (
    <div
      className={cn(
        'w-full h-full rounded-lg border-2 border-gray-300 dark:border-gray-600',
        'bg-gradient-to-br from-blue-600 to-blue-800',
        'flex items-center justify-center overflow-hidden'
      )}
    >
      <div className="w-3/4 h-3/4 rounded border-2 border-blue-400/50 bg-blue-700/50" />
    </div>
  );
}

function CardFace({ card, size }: { card: Card; size: 'sm' | 'md' | 'lg' }) {
  const suitSymbol = SUIT_SYMBOLS[card.suit];
  const suitColor = SUIT_COLORS[card.suit];

  return (
    <div
      className={cn(
        'w-full h-full rounded-lg border-2 border-gray-200 dark:border-gray-700',
        'bg-white dark:bg-gray-800',
        'flex flex-col items-center justify-between p-0.5 overflow-hidden'
      )}
    >
      {/* Top left corner */}
      <div className={cn('self-start flex flex-col items-center leading-none', suitColor)}>
        <span className={cn('font-bold', size === 'sm' ? 'text-xs' : RANK_SIZE_CLASSES[size])}>{card.rank}</span>
        <span className={size === 'sm' ? 'text-xs' : SUIT_SIZE_CLASSES[size]}>{suitSymbol}</span>
      </div>

      {/* Center suit */}
      <div className={cn('flex items-center justify-center', suitColor)}>
        <span className={cn(
          size === 'sm' && 'text-base',
          size === 'md' && 'text-4xl',
          size === 'lg' && 'text-6xl'
        )}>
          {suitSymbol}
        </span>
      </div>

      {/* Bottom right corner (rotated) */}
      <div className={cn('self-end flex flex-col items-center leading-none rotate-180', suitColor)}>
        <span className={cn('font-bold', size === 'sm' ? 'text-xs' : RANK_SIZE_CLASSES[size])}>{card.rank}</span>
        <span className={size === 'sm' ? 'text-xs' : SUIT_SIZE_CLASSES[size]}>{suitSymbol}</span>
      </div>
    </div>
  );
}

// Empty card slot placeholder
export function CardSlot({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600',
        'bg-gray-100/50 dark:bg-gray-800/50',
        SIZE_CLASSES[size],
        className
      )}
    />
  );
}

export default PlayingCard;
