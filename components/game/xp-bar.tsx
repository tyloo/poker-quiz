'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { levelProgress, xpForLevel, formatXP } from '@/lib/game/leveling';

interface XPBarProps {
  level: number;
  xp: number;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
}

export function XPBar({
  level,
  xp,
  showDetails = true,
  size = 'md',
  className,
  animate = false,
}: XPBarProps) {
  const progress = levelProgress(xp);
  const currentLevelXP = xpForLevel(level);
  const nextLevelXP = xpForLevel(level + 1);
  const xpInLevel = xp - currentLevelXP;
  const xpNeeded = nextLevelXP - currentLevelXP;

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center gap-3">
        {/* Level badge */}
        <Badge
          variant="default"
          className={cn(
            'shrink-0 gap-1 font-bold',
            size === 'sm' && 'text-xs px-1.5 py-0',
            size === 'md' && 'text-sm px-2 py-0.5',
            size === 'lg' && 'text-base px-3 py-1'
          )}
        >
          <Star className={cn(
            'text-yellow-400',
            size === 'sm' && 'w-3 h-3',
            size === 'md' && 'w-4 h-4',
            size === 'lg' && 'w-5 h-5'
          )} />
          <span>{level}</span>
        </Badge>

        {/* XP bar container */}
        <div className="flex-1">
          {/* Progress bar */}
          <div
            className={cn(
              'relative w-full bg-muted rounded-full overflow-hidden',
              sizeClasses[size]
            )}
          >
            <div
              className={cn(
                'absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/80 rounded-full',
                animate && 'transition-all duration-700 ease-out'
              )}
              style={{ width: `${progress}%` }}
            />
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* XP details */}
          {showDetails && (
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>{formatXP(xpInLevel)} XP</span>
              <span>{formatXP(xpNeeded)} needed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Compact inline version
export function XPBadge({
  level,
  xp,
  className,
}: Pick<XPBarProps, 'level' | 'xp' | 'className'>) {
  const progress = levelProgress(xp);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Badge variant="default" className="gap-1 font-bold">
        <Star className="w-3 h-3 text-yellow-400" />
        <span>{level}</span>
      </Badge>
      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// Level up celebration component
interface LevelUpProps {
  newLevel: number;
  onComplete?: () => void;
}

export function LevelUpCelebration({ newLevel, onComplete }: LevelUpProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-300"
      onClick={onComplete}
    >
      <div className="text-center animate-in zoom-in-95 duration-500">
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full scale-150" />

          {/* Content */}
          <div className="relative bg-card p-8 rounded-2xl shadow-2xl border">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">Level Up!</h2>
            <div className="flex items-center justify-center gap-2 text-4xl font-bold text-primary">
              <Star className="w-10 h-10 text-yellow-400" />
              <span>{newLevel}</span>
            </div>
            <p className="text-muted-foreground mt-4">Tap to continue</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default XPBar;
