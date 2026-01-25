'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Flame, Target, Trophy } from 'lucide-react';

interface SessionProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  correctCount: number;
  streak: number;
  sessionScore: number;
  className?: string;
}

export function SessionProgress({
  currentQuestion,
  totalQuestions,
  correctCount,
  streak,
  sessionScore,
  className,
}: SessionProgressProps) {
  const accuracy =
    currentQuestion > 0 ? Math.round((correctCount / currentQuestion) * 100) : 0;
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className={cn('w-full', className)}>
      {/* Progress bar */}
      <div className="relative h-2 bg-muted rounded-full overflow-hidden mb-3">
        <div
          className="absolute inset-y-0 left-0 bg-primary transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between text-sm">
        {/* Question counter */}
        <div className="flex items-center gap-1.5 text-white">
          <span>Question</span>
          <span className="font-bold">
            {currentQuestion}/{totalQuestions}
          </span>
        </div>

        {/* Stats badges */}
        <div className="flex items-center gap-2">
          {/* Accuracy */}
          <Badge variant="secondary" className="gap-1">
            <Target className="w-3 h-3" />
            <span>{accuracy}%</span>
          </Badge>

          {/* Streak */}
          {streak > 0 && (
            <Badge
              variant="secondary"
              className={cn(
                'gap-1',
                streak >= 5 && 'bg-orange-500/20 text-orange-600 dark:text-orange-400',
                streak >= 10 && 'bg-red-500/20 text-red-600 dark:text-red-400 animate-pulse'
              )}
            >
              <Flame className="w-3 h-3" />
              <span>{streak}</span>
            </Badge>
          )}

          {/* Score */}
          <Badge variant="outline" className="gap-1">
            <Trophy className="w-3 h-3 text-yellow-500" />
            <span className='text-white'>{sessionScore}</span>
          </Badge>
        </div>
      </div>
    </div>
  );
}

// Compact version for tight spaces
export function SessionProgressCompact({
  currentQuestion,
  totalQuestions,
  streak,
  className,
}: Pick<SessionProgressProps, 'currentQuestion' | 'totalQuestions' | 'streak' | 'className'>) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Progress indicator */}
      <div className="flex items-center gap-2">
        <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {currentQuestion}/{totalQuestions}
        </span>
      </div>

      {/* Streak */}
      {streak > 0 && (
        <Badge variant="secondary" className="gap-1 text-xs py-0">
          <Flame className="w-3 h-3" />
          {streak}
        </Badge>
      )}
    </div>
  );
}

export default SessionProgress;
