'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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
      <div
        className={cn(
          'rounded-t-3xl rounded-b-none border-t-4 shadow-2xl',
          'bg-white dark:bg-zinc-900',
          isCorrect
            ? 'border-t-green-500'
            : 'border-t-red-500'
        )}
      >
        <div className="px-6 pt-5 pb-3">
          <div className="flex items-center justify-between">
            {/* Result indicator */}
            <div className="flex items-center gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              ) : (
                <XCircle className="w-8 h-8 text-red-600" />
              )}
              <div>
                <h3
                  className={cn(
                    'text-xl font-semibold',
                    isCorrect ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </h3>
                {!isCorrect && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
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
                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
              )}
            >
              <Sparkles className="w-4 h-4" />
              +{xpEarned} XP
            </Badge>
          </div>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {/* Optimal action */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Optimal play:</span>
            <Badge
              variant="default"
              className="bg-emerald-600 text-white font-bold"
            >
              {ACTION_LABELS[optimalAction]}
            </Badge>
          </div>

          {/* Explanation */}
          <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-4 border border-gray-200 dark:border-zinc-700">
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">{explanation}</p>
          </div>

          {/* Key concept */}
          <div className="flex items-start gap-2 text-sm">
            <Lightbulb className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" />
            <div>
              <span className="font-medium text-gray-900 dark:text-white">Key Concept: </span>
              <span className="text-gray-600 dark:text-gray-300">{keyConcept}</span>
            </div>
          </div>

          {/* Continue button */}
          <Button
            onClick={onContinue}
            className="w-full h-12 text-lg font-semibold gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
            size="lg"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
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
        isCorrect ? 'bg-success/10' : 'bg-error/10',
        className
      )}
    >
      {isCorrect ? (
        <CheckCircle2 className="w-5 h-5 text-success" />
      ) : (
        <XCircle className="w-5 h-5 text-error" />
      )}
      <span
        className={cn(
          'text-sm font-medium',
          isCorrect ? 'text-success' : 'text-error'
        )}
      >
        {isCorrect ? 'Correct!' : `Optimal: ${ACTION_LABELS[optimalAction]}`}
      </span>
    </div>
  );
}

export default FeedbackPanel;
