'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { ActionType } from '@/lib/types';

interface ActionButtonsProps {
  validActions: ActionType[];
  callAmount?: number;
  onAction: (action: ActionType, amount?: number) => void;
  disabled?: boolean;
  className?: string;
}

const ACTION_CONFIG: Record<
  ActionType,
  {
    label: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
    className: string;
  }
> = {
  fold: {
    label: 'Fold',
    variant: 'secondary',
    className: 'bg-action-fold hover:bg-action-fold-hover text-white',
  },
  check: {
    label: 'Check',
    variant: 'secondary',
    className: 'bg-action-check hover:bg-action-check-hover text-white',
  },
  call: {
    label: 'Call',
    variant: 'default',
    className: 'bg-action-call hover:bg-action-call-hover text-white',
  },
  raise: {
    label: 'Raise',
    variant: 'default',
    className: 'bg-action-raise hover:bg-action-raise-hover text-white',
  },
  bet: {
    label: 'Bet',
    variant: 'default',
    className: 'bg-action-bet hover:bg-action-bet-hover text-white',
  },
  'all-in': {
    label: 'All-In',
    variant: 'destructive',
    className: 'bg-action-allin hover:bg-action-allin-hover text-white',
  },
};

export function ActionButtons({
  validActions,
  callAmount,
  onAction,
  disabled = false,
  className,
}: ActionButtonsProps) {
  // Sort actions in a logical order
  const orderedActions = sortActions(validActions);

  return (
    <div className={cn('w-full', className)}>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-center sm:gap-3">
        {orderedActions.map((action) => {
          const config = ACTION_CONFIG[action];
          const showAmount = action === 'call' && callAmount !== undefined;

          return (
            <Button
              key={action}
              onClick={() => onAction(action)}
              disabled={disabled}
              className={cn(
                'min-h-[52px] text-base font-bold transition-all',
                'active:scale-95',
                config.className,
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {config.label}
              {showAmount && (
                <span className="ml-1 font-normal">({callAmount})</span>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

function sortActions(actions: ActionType[]): ActionType[] {
  const order: ActionType[] = ['fold', 'check', 'call', 'bet', 'raise', 'all-in'];
  return actions.sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

// Simplified action buttons for quiz (fold, check/call, raise only)
interface QuizActionButtonsProps {
  validActions: ActionType[];
  callAmount?: number;
  onAction: (action: ActionType) => void;
  disabled?: boolean;
  className?: string;
}

export function QuizActionButtons({
  validActions,
  callAmount,
  onAction,
  disabled = false,
  className,
}: QuizActionButtonsProps) {
  // Determine which simplified actions to show
  const showFold = validActions.includes('fold');
  const showCheck = validActions.includes('check');
  const showCall = validActions.includes('call');
  const showRaise = validActions.includes('raise') || validActions.includes('bet');

  return (
    <div className={cn('w-full px-4 pb-4', className)}>
      <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
        {/* Fold */}
        {showFold && (
          <Button
            onClick={() => onAction('fold')}
            disabled={disabled}
            className={cn(
              'min-h-[56px] text-lg font-bold',
              'bg-action-fold hover:bg-action-fold-hover text-white',
              'active:scale-95 transition-transform',
              disabled && 'opacity-50'
            )}
          >
            Fold
          </Button>
        )}

        {/* Check or Call */}
        {showCheck && (
          <Button
            onClick={() => onAction('check')}
            disabled={disabled}
            className={cn(
              'min-h-[56px] text-lg font-bold',
              'bg-action-check hover:bg-action-check-hover text-white',
              'active:scale-95 transition-transform',
              disabled && 'opacity-50'
            )}
          >
            Check
          </Button>
        )}
        {showCall && (
          <Button
            onClick={() => onAction('call')}
            disabled={disabled}
            className={cn(
              'min-h-[56px] text-lg font-bold flex flex-col',
              'bg-action-call hover:bg-action-call-hover text-white',
              'active:scale-95 transition-transform',
              disabled && 'opacity-50'
            )}
          >
            <span>Call</span>
            {callAmount !== undefined && (
              <span className="text-sm font-normal opacity-90">{callAmount}</span>
            )}
          </Button>
        )}

        {/* Raise/Bet */}
        {showRaise && (
          <Button
            onClick={() => onAction(validActions.includes('raise') ? 'raise' : 'bet')}
            disabled={disabled}
            className={cn(
              'min-h-[56px] text-lg font-bold',
              'bg-action-raise hover:bg-action-raise-hover text-white',
              'active:scale-95 transition-transform',
              disabled && 'opacity-50'
            )}
          >
            {validActions.includes('raise') ? 'Raise' : 'Bet'}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ActionButtons;
