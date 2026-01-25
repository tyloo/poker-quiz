'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { XPBar } from '@/components/game/xp-bar';
import { usePlayerProgressHydrated, usePlayerSettingsHydrated, useGameStore } from '@/lib/hooks/use-game-store';
import { useStoreHydration } from '@/lib/hooks/use-game-store';
import { isDifficultyUnlocked, DIFFICULTY_UNLOCK_LEVELS } from '@/lib/game/leveling';
import { Play, BarChart3, Trophy, Settings, Lock, Sparkles } from 'lucide-react';
import type { Difficulty } from '@/lib/types';
import { cn } from '@/lib/utils';

const DIFFICULTY_INFO: Record<Difficulty, { color: string; bgColor: string }> = {
  beginner: { color: 'text-green-600', bgColor: 'bg-green-500/10 border-green-500/30' },
  intermediate: { color: 'text-blue-600', bgColor: 'bg-blue-500/10 border-blue-500/30' },
  advanced: { color: 'text-orange-600', bgColor: 'bg-orange-500/10 border-orange-500/30' },
  expert: { color: 'text-red-600', bgColor: 'bg-red-500/10 border-red-500/30' },
};

const DIFFICULTY_DESCRIPTIONS: Record<Difficulty, string> = {
  beginner: 'Basic hand rankings and simple preflop decisions',
  intermediate: 'Position play and postflop fundamentals',
  advanced: 'Complex spots, draws, and multi-street play',
  expert: 'GTO concepts and advanced exploitation',
};

export default function HomePage() {
  const router = useRouter();
  const isHydrated = useStoreHydration();
  const progress = usePlayerProgressHydrated();
  const settings = usePlayerSettingsHydrated();
  const startSession = useGameStore((state) => state.startSession);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

  const handleQuickPlay = () => {
    startSession({
      questionCount: settings.defaultSessionLength,
      difficulty: settings.defaultDifficulty,
      streetFilter: settings.streetFilter,
      topics: settings.topics,
    });
    router.push('/quiz');
  };

  const handleDifficultySelect = (difficulty: Difficulty) => {
    if (!isDifficultyUnlocked(difficulty, progress.level)) return;
    setSelectedDifficulty(difficulty);
  };

  const handleStartWithDifficulty = () => {
    if (!selectedDifficulty) return;
    startSession({
      questionCount: settings.defaultSessionLength,
      difficulty: selectedDifficulty,
      streetFilter: settings.streetFilter,
      topics: settings.topics,
    });
    router.push('/quiz');
  };

  if (!isHydrated) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-emerald-900 to-emerald-950 flex items-center justify-center">
        <div className="animate-pulse text-white">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-900 to-emerald-950">
      <div className="container max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Poker Quiz</h1>
          <p className="text-emerald-200 text-sm">Master your poker decisions</p>
        </header>

        {/* XP Bar */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-6">
          <XPBar level={progress.level} xp={progress.xp} size="md" animate />
        </div>

        {/* Quick Play Button */}
        <Button
          onClick={handleQuickPlay}
          size="lg"
          className="w-full h-14 text-lg font-bold mb-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg"
        >
          <Play className="w-6 h-6 mr-2" />
          Quick Play
          <Badge variant="secondary" className="ml-2 text-xs">
            {settings.defaultSessionLength}Q
          </Badge>
        </Button>

        {/* Difficulty Selection */}
        <div className="mb-6">
          <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Select Difficulty
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {(['beginner', 'intermediate', 'advanced', 'expert'] as Difficulty[]).map(
              (difficulty) => {
                const isUnlocked = isDifficultyUnlocked(difficulty, progress.level);
                const info = DIFFICULTY_INFO[difficulty];
                const isSelected = selectedDifficulty === difficulty;

                return (
                  <Card
                    key={difficulty}
                    className={cn(
                      'cursor-pointer transition-all border-2',
                      isUnlocked ? info.bgColor : 'bg-gray-100/50 border-gray-300/30 opacity-60',
                      isSelected && 'ring-2 ring-primary ring-offset-2',
                      !isUnlocked && 'cursor-not-allowed'
                    )}
                    onClick={() => handleDifficultySelect(difficulty)}
                  >
                    <CardHeader className="p-3 pb-1">
                      <CardTitle className={cn('text-sm capitalize flex items-center justify-between', info.color)}>
                        {difficulty}
                        {!isUnlocked && <Lock className="w-4 h-4 text-gray-400" />}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      {isUnlocked ? (
                        <CardDescription className="text-xs line-clamp-2">
                          {DIFFICULTY_DESCRIPTIONS[difficulty]}
                        </CardDescription>
                      ) : (
                        <CardDescription className="text-xs text-gray-500">
                          Unlock at Level {DIFFICULTY_UNLOCK_LEVELS[difficulty]}
                        </CardDescription>
                      )}
                    </CardContent>
                  </Card>
                );
              }
            )}
          </div>

          {selectedDifficulty && (
            <Button
              onClick={handleStartWithDifficulty}
              className="w-full mt-3"
              variant="secondary"
            >
              Start {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)} Quiz
            </Button>
          )}
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-3 gap-3">
          <Link href="/stats">
            <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
              <CardContent className="p-4 flex flex-col items-center gap-2">
                <BarChart3 className="w-6 h-6 text-white" />
                <span className="text-white text-xs font-medium">Stats</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/achievements">
            <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
              <CardContent className="p-4 flex flex-col items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <span className="text-white text-xs font-medium">Achievements</span>
                {progress.achievements.length > 0 && (
                  <Badge variant="secondary" className="text-[10px] px-1">
                    {progress.achievements.length}
                  </Badge>
                )}
              </CardContent>
            </Card>
          </Link>

          <Link href="/settings">
            <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
              <CardContent className="p-4 flex flex-col items-center gap-2">
                <Settings className="w-6 h-6 text-white" />
                <span className="text-white text-xs font-medium">Settings</span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
}
