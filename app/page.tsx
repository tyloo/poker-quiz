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

const DIFFICULTY_INFO: Record<Difficulty, { color: string; bgColor: string; gradient: string; iconBg: string }> = {
  beginner: {
    color: 'text-emerald-600',
    bgColor: 'bg-white border-emerald-200',
    gradient: 'from-emerald-500 to-emerald-600',
    iconBg: 'bg-emerald-100'
  },
  intermediate: {
    color: 'text-blue-600',
    bgColor: 'bg-white border-blue-200',
    gradient: 'from-blue-500 to-blue-600',
    iconBg: 'bg-blue-100'
  },
  advanced: {
    color: 'text-amber-600',
    bgColor: 'bg-white border-amber-200',
    gradient: 'from-amber-500 to-amber-600',
    iconBg: 'bg-amber-100'
  },
  expert: {
    color: 'text-red-600',
    bgColor: 'bg-white border-red-200',
    gradient: 'from-red-500 to-red-600',
    iconBg: 'bg-red-100'
  },
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
      <main className="min-h-screen bg-gradient-to-b from-poker-felt to-poker-felt-dark flex items-center justify-center">
        <div className="animate-pulse text-white">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-poker-felt to-poker-felt-dark">
      <div className="container max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Poker Quiz</h1>
          <p className="text-primary-foreground/70 text-sm">Master your poker decisions</p>
        </header>

        {/* XP Bar */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-6">
          <XPBar level={progress.level} xp={progress.xp} size="md" animate />
        </div>

        {/* Quick Play Button */}
        <Button
          onClick={handleQuickPlay}
          size="lg"
          className="w-full h-14 text-lg font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
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
                      'relative overflow-hidden transition-all duration-200 border-2',
                      isUnlocked
                        ? cn(info.bgColor, 'cursor-pointer hover:shadow-lg hover:scale-[1.02]')
                        : 'bg-gray-100 border-gray-200 cursor-not-allowed',
                      isSelected && 'ring-2 ring-offset-2 ring-emerald-500 shadow-lg'
                    )}
                    onClick={() => handleDifficultySelect(difficulty)}
                  >
                    {/* Colored accent bar at top */}
                    <div className={cn(
                      'absolute top-0 left-0 right-0 h-1',
                      isUnlocked ? `bg-gradient-to-r ${info.gradient}` : 'bg-gray-300'
                    )} />

                    <CardHeader className="p-3 pb-1 pt-4">
                      <CardTitle className={cn(
                        'text-sm font-bold capitalize flex items-center justify-between',
                        isUnlocked ? info.color : 'text-gray-400'
                      )}>
                        {difficulty}
                        {!isUnlocked && (
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200">
                            <Lock className="w-3.5 h-3.5 text-gray-500" />
                          </div>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      {isUnlocked ? (
                        <CardDescription className="text-xs text-gray-600 line-clamp-2">
                          {DIFFICULTY_DESCRIPTIONS[difficulty]}
                        </CardDescription>
                      ) : (
                        <CardDescription className="text-xs text-gray-400 font-medium">
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
