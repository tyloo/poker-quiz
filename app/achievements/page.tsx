'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePlayerProgressHydrated, useStoreHydration } from '@/lib/hooks/use-game-store';
import { ACHIEVEMENTS } from '@/lib/game/achievements';
import { ArrowLeft, Lock, Trophy, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Achievement } from '@/lib/types';

type AchievementCategory = Achievement['category'] | 'all';

const CATEGORY_LABELS: Record<AchievementCategory, string> = {
  all: 'All',
  accuracy: 'Accuracy',
  streaks: 'Streaks',
  volume: 'Volume',
  milestones: 'Milestones',
};

export default function AchievementsPage() {
  const isHydrated = useStoreHydration();
  const progress = usePlayerProgressHydrated();
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory>('all');

  if (!isHydrated) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-emerald-900 to-emerald-950 flex items-center justify-center">
        <div className="animate-pulse text-white">Loading...</div>
      </main>
    );
  }

  const earnedIds = new Set(progress.achievements);
  const earnedCount = earnedIds.size;
  const totalCount = ACHIEVEMENTS.length;

  const filteredAchievements =
    selectedCategory === 'all'
      ? ACHIEVEMENTS
      : ACHIEVEMENTS.filter((a) => a.category === selectedCategory);

  // Get progress for an achievement
  const getAchievementProgress = (achievement: typeof ACHIEVEMENTS[number]) => {
    return achievement.getProgress(progress.stats, progress);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-900 to-emerald-950">
      <div className="container max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">Achievements</h1>
            <p className="text-emerald-200 text-sm">
              {earnedCount} of {totalCount} unlocked
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span className="text-xl font-bold text-white">{earnedCount}</span>
          </div>
        </header>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4">
          {(Object.keys(CATEGORY_LABELS) as AchievementCategory[]).map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              className={cn(
                'whitespace-nowrap',
                selectedCategory === category
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              )}
              onClick={() => setSelectedCategory(category)}
            >
              {CATEGORY_LABELS[category]}
            </Button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="space-y-3">
          {filteredAchievements.map((achievement) => {
            const isEarned = earnedIds.has(achievement.id);
            const currentProgress = getAchievementProgress(achievement);
            const progressPercent = Math.min(
              (currentProgress / achievement.requirement) * 100,
              100
            );

            return (
              <Card
                key={achievement.id}
                className={cn(
                  'border transition-all',
                  isEarned
                    ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30'
                    : 'bg-white/5 border-white/10'
                )}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div
                      className={cn(
                        'shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl',
                        isEarned
                          ? 'bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg'
                          : 'bg-white/10'
                      )}
                    >
                      {isEarned ? (
                        achievement.icon
                      ) : (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3
                            className={cn(
                              'font-semibold',
                              isEarned ? 'text-yellow-200' : 'text-white/60'
                            )}
                          >
                            {achievement.title}
                          </h3>
                          <p
                            className={cn(
                              'text-sm',
                              isEarned ? 'text-yellow-100/70' : 'text-white/40'
                            )}
                          >
                            {achievement.description}
                          </p>
                        </div>
                        {isEarned && (
                          <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0" />
                        )}
                      </div>

                      {/* Progress bar for unearned achievements */}
                      {!isEarned && (
                        <div className="mt-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-white/40">Progress</span>
                            <span className="text-xs text-white/60">
                              {currentProgress}/{achievement.requirement}
                            </span>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full transition-all"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Category badge */}
                      <Badge
                        variant="secondary"
                        className={cn(
                          'mt-2 text-xs',
                          isEarned
                            ? 'bg-yellow-500/20 text-yellow-300'
                            : 'bg-white/10 text-white/50'
                        )}
                      >
                        {CATEGORY_LABELS[achievement.category]}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/40">No achievements in this category</p>
          </div>
        )}

        {/* Back Button */}
        <Link href="/" className="block mt-6">
          <Button
            variant="outline"
            className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Menu
          </Button>
        </Link>
      </div>
    </main>
  );
}
