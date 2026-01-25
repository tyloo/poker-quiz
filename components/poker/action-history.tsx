'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { Action, Position } from '@/lib/types';

interface ActionHistoryProps {
  actions: Action[];
  heroPosition: Position;
  className?: string;
}

const ACTION_COLORS: Record<Action['type'], string> = {
  fold: 'bg-gray-200 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600',
  check: 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700',
  call: 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700',
  raise: 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700',
  bet: 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900 dark:text-orange-200 dark:border-orange-700',
  'all-in': 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700',
};

const ACTION_LABELS: Record<Action['type'], string> = {
  fold: 'Fold',
  check: 'Check',
  call: 'Call',
  raise: 'Raise',
  bet: 'Bet',
  'all-in': 'All-in',
};

export function ActionHistory({ actions, heroPosition, className }: ActionHistoryProps) {
  if (actions.length === 0) {
    return (
      <div className={cn('text-center text-gray-500 dark:text-gray-400 text-sm py-2', className)}>
        No actions yet
      </div>
    );
  }

  return (
    <div className={cn('space-y-1', className)}>
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Action History</div>

      <div className="flex flex-wrap gap-1.5">
        {actions.map((action, index) => (
          <ActionBadge
            key={index}
            action={action}
            isHero={action.position === heroPosition}
          />
        ))}
      </div>

      {/* Current turn indicator */}
      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Your turn</span>
      </div>
    </div>
  );
}

interface ActionBadgeProps {
  action: Action;
  isHero: boolean;
}

function ActionBadge({ action, isHero }: ActionBadgeProps) {
  const colorClass = ACTION_COLORS[action.type];
  const label = ACTION_LABELS[action.type];

  return (
    <Badge
      variant="outline"
      className={cn(
        'text-xs font-medium border',
        colorClass,
        isHero && 'ring-1 ring-primary ring-offset-1'
      )}
    >
      <span className="font-bold mr-1">{action.position}</span>
      <span>{label}</span>
      {action.amount !== undefined && action.amount > 0 && (
        <span className="ml-1 font-bold">{action.amount}</span>
      )}
    </Badge>
  );
}

// Compact version for inline display
export function ActionHistoryCompact({ actions, heroPosition, className }: ActionHistoryProps) {
  const recentActions = actions.slice(-5); // Show last 5 actions

  return (
    <div className={cn('flex flex-wrap gap-1', className)}>
      {recentActions.map((action, index) => (
        <ActionBadge
          key={index}
          action={action}
          isHero={action.position === heroPosition}
        />
      ))}
      {actions.length > 5 && (
        <Badge variant="secondary" className="text-xs">
          +{actions.length - 5} more
        </Badge>
      )}
    </div>
  );
}

export default ActionHistory;
