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
  fold: 'bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-400/30',
  check: 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30',
  call: 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30',
  raise: 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30',
  bet: 'bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-500/30',
  'all-in': 'bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-500/30',
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
      <div className={cn('text-center text-muted-foreground text-sm py-2', className)}>
        No actions yet
      </div>
    );
  }

  return (
    <div className={cn('space-y-1', className)}>
      <div className="text-xs font-medium text-muted-foreground mb-2">Action History</div>

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
      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-sm font-medium">Your turn</span>
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
