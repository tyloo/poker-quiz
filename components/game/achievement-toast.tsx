'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { Trophy } from 'lucide-react';
import { useGameStore } from '@/lib/hooks/use-game-store';
import type { Achievement } from '@/lib/types';

/**
 * Hook to show achievement toast notifications
 */
export function useAchievementToasts() {
  const pendingAchievements = useGameStore((state) => state.pendingAchievements);
  const clearPendingAchievements = useGameStore(
    (state) => state.clearPendingAchievements
  );

  useEffect(() => {
    if (pendingAchievements.length > 0) {
      // Show each achievement with a slight delay between them
      pendingAchievements.forEach((achievement, index) => {
        setTimeout(() => {
          showAchievementToast(achievement);
        }, index * 500);
      });

      // Clear pending after showing
      const totalDelay = pendingAchievements.length * 500 + 100;
      setTimeout(() => {
        clearPendingAchievements();
      }, totalDelay);
    }
  }, [pendingAchievements, clearPendingAchievements]);
}

/**
 * Show a single achievement toast
 */
export function showAchievementToast(achievement: Achievement) {
  toast.custom(
    (t) => (
      <div
        className="flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/50 dark:to-amber-950/50 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 shadow-lg animate-in slide-in-from-right-full duration-300"
        onClick={() => toast.dismiss(t)}
      >
        {/* Icon */}
        <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-2xl shadow-lg">
          {achievement.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300 uppercase tracking-wide">
              Achievement Unlocked!
            </span>
          </div>
          <p className="font-bold text-gray-900 dark:text-gray-100 truncate">
            {achievement.title}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {achievement.description}
          </p>
        </div>
      </div>
    ),
    {
      duration: 4000,
      position: 'top-center',
    }
  );
}

/**
 * Achievement notification component for manual triggering
 */
interface AchievementNotificationProps {
  achievement: Achievement;
  onDismiss?: () => void;
}

export function AchievementNotification({
  achievement,
  onDismiss,
}: AchievementNotificationProps) {
  return (
    <div
      className="flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/50 dark:to-amber-950/50 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 shadow-lg cursor-pointer animate-in slide-in-from-top duration-300"
      onClick={onDismiss}
    >
      {/* Celebration background effect */}
      <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 via-amber-400/20 to-yellow-400/20 blur-xl animate-pulse" />
      </div>

      {/* Icon */}
      <div className="relative shrink-0 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-3xl shadow-lg">
        {achievement.icon}
      </div>

      {/* Content */}
      <div className="relative flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Trophy className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
          <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300 uppercase tracking-wide">
            Achievement Unlocked!
          </span>
        </div>
        <p className="font-bold text-lg text-gray-900 dark:text-gray-100">
          {achievement.title}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {achievement.description}
        </p>
      </div>
    </div>
  );
}

export default useAchievementToasts;
