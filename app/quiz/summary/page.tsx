'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { XPBar } from '@/components/game/xp-bar';
import { useGameStore, useStoreHydration } from '@/lib/hooks/use-game-store';
import { ACHIEVEMENTS } from '@/lib/game/achievements';
import {
  Trophy,
  Target,
  Flame,
  Star,
  Home,
  RotateCcw,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SummaryPage() {
  const router = useRouter();
  const isHydrated = useStoreHydration();

  const session = useGameStore((state) => state.session);
  const progress = useGameStore((state) => state.progress);
  const startSession = useGameStore((state) => state.startSession);

  // Redirect if no completed session
  useEffect(() => {
    if (isHydrated && (!session || !session.completed)) {
      router.push('/');
    }
  }, [isHydrated, session, router]);

  if (!isHydrated || !session || !session.completed) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-poker-felt to-poker-felt-dark flex items-center justify-center">
        <div className="animate-pulse text-white">Loading...</div>
      </main>
    );
  }

  // Calculate stats
  const totalQuestions = session.results.length;
  const correctCount = session.results.filter((r) => r.isCorrect).length;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const totalXP = session.results.reduce((sum, r) => sum + r.xpEarned, 0);
  const bestStreak = Math.max(...session.results.map((_, i) => {
    let streak = 0;
    for (let j = i; j < session.results.length; j++) {
      if (session.results[j].isCorrect) streak++;
      else break;
    }
    return streak;
  }), 0);

  // Performance rating
  const getPerformanceRating = () => {
    if (accuracy >= 90) return { label: 'Excellent!', color: 'text-yellow-400', emoji: '🏆' };
    if (accuracy >= 75) return { label: 'Great Job!', color: 'text-primary', emoji: '⭐' };
    if (accuracy >= 60) return { label: 'Good Work!', color: 'text-blue-400', emoji: '👍' };
    if (accuracy >= 40) return { label: 'Keep Practicing!', color: 'text-orange-400', emoji: '💪' };
    return { label: 'Room to Grow', color: 'text-gray-400', emoji: '📚' };
  };

  const performance = getPerformanceRating();
  const isGreatPerformance = accuracy >= 75;

  const handlePlayAgain = () => {
    startSession(session.config);
    router.push('/quiz');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-poker-felt to-poker-felt-dark relative overflow-hidden">
      {/* Celebratory background for great performance */}
      {isGreatPerformance && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="absolute top-10 right-1/4 w-3 h-3 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="absolute top-20 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          <div className="absolute top-5 right-1/3 w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }} />
        </div>
      )}

      <div className="container max-w-md mx-auto px-4 py-6 relative">
        {/* Header */}
        <header className="text-center mb-6">
          <div className="text-5xl mb-3">{performance.emoji}</div>
          <h1 className={cn('text-3xl font-bold mb-1', performance.color)}>
            {performance.label}
          </h1>
          <p className="text-primary-foreground/70 text-sm">Session Complete</p>
        </header>

        {/* Main Stats */}
        <Card className="bg-white/10 border-white/20 mb-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              {/* Accuracy */}
              <div>
                <div className="flex items-center justify-center mb-1">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl font-bold text-white">{accuracy}%</div>
                <div className="text-xs text-primary-foreground/70">Accuracy</div>
              </div>

              {/* Score */}
              <div>
                <div className="flex items-center justify-center mb-1">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-white">
                  {correctCount}/{totalQuestions}
                </div>
                <div className="text-xs text-primary-foreground/70">Correct</div>
              </div>

              {/* Streak */}
              <div>
                <div className="flex items-center justify-center mb-1">
                  <Flame className="w-5 h-5 text-orange-400" />
                </div>
                <div className="text-2xl font-bold text-white">{bestStreak}</div>
                <div className="text-xs text-primary-foreground/70">Best Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* XP Earned */}
        <Card className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30 mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500/30 flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <div className="text-sm text-yellow-200">XP Earned</div>
                  <div className="text-2xl font-bold text-yellow-400">+{totalXP}</div>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-400/50" />
            </div>
          </CardContent>
        </Card>

        {/* Level Progress */}
        <Card className="bg-white/10 border-white/20 mb-4">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm text-primary-foreground/70 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Level Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <XPBar level={progress.level} xp={progress.xp} size="md" animate />
          </CardContent>
        </Card>

        {/* Results Breakdown */}
        <Card className="bg-white/10 border-white/20 mb-6">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm text-primary-foreground/70">Results Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-2">
              {session.results.map((result, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-center justify-between p-2 rounded-lg',
                    result.isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'
                  )}
                >
                  <div className="flex items-center gap-2">
                    {result.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                    <span className="text-white text-sm">Question {index + 1}</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn(
                      'text-xs',
                      result.isCorrect
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-red-500/20 text-red-300'
                    )}
                  >
                    +{result.xpEarned} XP
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements (if any this session) */}
        {progress.achievements.length > 0 && (
          <Card className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-yellow-500/30 mb-6">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm text-yellow-200 flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Your Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="flex flex-wrap gap-2">
                {progress.achievements.slice(0, 5).map((achievementId) => {
                  const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
                  if (!achievement) return null;
                  return (
                    <Badge
                      key={achievementId}
                      variant="secondary"
                      className="bg-yellow-500/20 text-yellow-300 gap-1"
                    >
                      {achievement.icon} {achievement.title}
                    </Badge>
                  );
                })}
                {progress.achievements.length > 5 && (
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    +{progress.achievements.length - 5} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handlePlayAgain}
            size="lg"
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </Button>

          <Link href="/" className="block">
            <Button
              variant="outline"
              size="lg"
              className="w-full h-12 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Menu
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
