'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Lightbulb, ArrowRight, Sparkles } from 'lucide-react';
import type { ActionType } from '@/lib/types';

const ACTION_LABELS: Record<ActionType, string> = {
  fold: 'Fold',
  check: 'Check',
  call: 'Call',
  raise: 'Raise',
  bet: 'Bet',
  'all-in': 'All-In',
};

interface FeedbackPanelProps {
  isCorrect: boolean;
  playerAction: ActionType;
  optimalAction: ActionType;
  explanation: string;
  keyConcept: string;
  xpEarned: number;
  onContinue: () => void;
  className?: string;
}

export function FeedbackPanel({
  isCorrect,
  playerAction,
  optimalAction,
  explanation,
  keyConcept,
  xpEarned,
  onContinue,
  className,
}: FeedbackPanelProps) {
  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40',
        'animate-in slide-in-from-bottom duration-300',
        className
      )}
    >
      <Card
        className={cn(
          'rounded-t-3xl rounded-b-none border-t-4 shadow-2xl',
          isCorrect
            ? 'border-t-green-500 bg-green-50/50 dark:bg-green-950/20'
            : 'border-t-red-500 bg-red-50/50 dark:bg-red-950/20'
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            {/* Result indicator */}
            <div className="flex items-center gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              ) : (
                <XCircle className="w-8 h-8 text-red-500" />
              )}
              <div>
                <CardTitle
                  className={cn(
                    'text-xl',
                    isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                  )}
                >
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </CardTitle>
                {!isCorrect && (
                  <p className="text-sm text-muted-foreground">
                    You chose {ACTION_LABELS[playerAction]}
                  </p>
                )}
              </div>
            </div>

            {/* XP earned */}
            <Badge
              variant="secondary"
              className={cn(
                'text-sm font-bold gap-1 py-1',
                isCorrect
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              )}
            >
              <Sparkles className="w-4 h-4" />
              +{xpEarned} XP
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pb-6">
          {/* Optimal action */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Optimal play:</span>
            <Badge
              variant="default"
              className="bg-primary text-primary-foreground font-bold"
            >
              {ACTION_LABELS[optimalAction]}
            </Badge>
          </div>

          {/* Explanation */}
          <div className="bg-background/80 rounded-lg p-4 border">
            <p className="text-sm leading-relaxed">{explanation}</p>
          </div>

          {/* Key concept */}
          <div className="flex items-start gap-2 text-sm">
            <Lightbulb className="w-4 h-4 mt-0.5 text-yellow-500 shrink-0" />
            <div>
              <span className="font-medium">Key Concept: </span>
              <span className="text-muted-foreground">{keyConcept}</span>
            </div>
          </div>

          {/* Continue button */}
          <Button
            onClick={onContinue}
            className="w-full h-12 text-lg font-semibold gap-2"
            size="lg"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Compact inline feedback for tight spaces
interface InlineFeedbackProps {
  isCorrect: boolean;
  optimalAction: ActionType;
  className?: string;
}

export function InlineFeedback({ isCorrect, optimalAction, className }: InlineFeedbackProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg',
        isCorrect ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30',
        className
      )}
    >
      {isCorrect ? (
        <CheckCircle2 className="w-5 h-5 text-green-500" />
      ) : (
        <XCircle className="w-5 h-5 text-red-500" />
      )}
      <span
        className={cn(
          'text-sm font-medium',
          isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
        )}
      >
        {isCorrect ? 'Correct!' : `Optimal: ${ACTION_LABELS[optimalAction]}`}
      </span>
    </div>
  );
}

export default FeedbackPanel;
