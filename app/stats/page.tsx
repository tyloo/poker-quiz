'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePlayerProgressHydrated, useStoreHydration } from '@/lib/hooks/use-game-store';
import {
  ArrowLeft,
  Target,
  Flame,
  BarChart3,
  TrendingUp,
  Layers,
  Hand,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Difficulty, Street, ActionType } from '@/lib/types';

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  beginner: 'bg-green-500',
  intermediate: 'bg-blue-500',
  advanced: 'bg-orange-500',
  expert: 'bg-red-500',
};

const STREET_LABELS: Record<Street, string> = {
  preflop: 'Preflop',
  flop: 'Flop',
  turn: 'Turn',
  river: 'River',
};

const ACTION_LABELS: Record<ActionType, string> = {
  fold: 'Fold',
  check: 'Check',
  call: 'Call',
  bet: 'Bet',
  raise: 'Raise',
  'all-in': 'All-in',
};

export default function StatsPage() {
  const isHydrated = useStoreHydration();
  const progress = usePlayerProgressHydrated();

  if (!isHydrated) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-emerald-900 to-emerald-950 flex items-center justify-center">
        <div className="animate-pulse text-white">Loading...</div>
      </main>
    );
  }

  const { stats } = progress;
  const overallAccuracy =
    stats.totalQuestionsAnswered > 0
      ? Math.round((stats.totalCorrect / stats.totalQuestionsAnswered) * 100)
      : 0;

  const getAccuracy = (answered: number, correct: number) =>
    answered > 0 ? Math.round((correct / answered) * 100) : 0;

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
          <div>
            <h1 className="text-2xl font-bold text-white">Your Statistics</h1>
            <p className="text-emerald-200 text-sm">Track your progress</p>
          </div>
        </header>

        {/* Overview Stats */}
        <Card className="bg-white/10 border-white/20 mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {/* Total Questions */}
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-emerald-200">Total Questions</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {stats.totalQuestionsAnswered}
                </div>
              </div>

              {/* Overall Accuracy */}
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-emerald-200">Accuracy</span>
                </div>
                <div className="text-2xl font-bold text-white">{overallAccuracy}%</div>
              </div>

              {/* Best Streak */}
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="text-xs text-emerald-200">Best Streak</span>
                </div>
                <div className="text-2xl font-bold text-white">{stats.bestStreak}</div>
              </div>

              {/* Total Sessions */}
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-emerald-200">Sessions</span>
                </div>
                <div className="text-2xl font-bold text-white">{stats.totalSessions}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats by Difficulty */}
        <Card className="bg-white/10 border-white/20 mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm">By Difficulty</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(['beginner', 'intermediate', 'advanced', 'expert'] as Difficulty[]).map(
              (difficulty) => {
                const stat = stats.statsByDifficulty[difficulty];
                const accuracy = getAccuracy(stat.answered, stat.correct);
                return (
                  <div key={difficulty}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-white capitalize">{difficulty}</span>
                      <span className="text-xs text-emerald-200">
                        {stat.correct}/{stat.answered} ({accuracy}%)
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={cn('h-full rounded-full transition-all', DIFFICULTY_COLORS[difficulty])}
                        style={{ width: `${accuracy}%` }}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </CardContent>
        </Card>

        {/* Stats by Street */}
        <Card className="bg-white/10 border-white/20 mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm">By Street</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(['preflop', 'flop', 'turn', 'river'] as Street[]).map((street) => {
              const stat = stats.statsByStreet[street];
              const accuracy = getAccuracy(stat.answered, stat.correct);
              return (
                <div key={street}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-white">{STREET_LABELS[street]}</span>
                    <span className="text-xs text-emerald-200">
                      {stat.correct}/{stat.answered} ({accuracy}%)
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all bg-emerald-500"
                      style={{ width: `${accuracy}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Stats by Action */}
        <Card className="bg-white/10 border-white/20 mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm flex items-center gap-2">
              <Hand className="w-4 h-4" />
              By Decision
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(['fold', 'check', 'call', 'bet', 'raise', 'all-in'] as ActionType[]).map(
              (action) => {
                const stat = stats.statsByAction[action];
                const accuracy = getAccuracy(stat.answered, stat.correct);
                return (
                  <div key={action}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-white">{ACTION_LABELS[action]}</span>
                      <span className="text-xs text-emerald-200">
                        {stat.correct}/{stat.answered} ({accuracy}%)
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all bg-blue-500"
                        style={{ width: `${accuracy}%` }}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </CardContent>
        </Card>

        {/* Back Button */}
        <Link href="/" className="block">
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
