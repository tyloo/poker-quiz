'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PokerTable } from '@/components/poker/poker-table';
import { ActionHistory } from '@/components/poker/action-history';
import { QuizActionButtons } from '@/components/poker/action-buttons';
import { SessionProgress } from '@/components/game/session-progress';
import { FeedbackPanel } from '@/components/game/feedback-panel';
import { useAchievementToasts } from '@/components/game/achievement-toast';
import { useGameStore, useStoreHydration } from '@/lib/hooks/use-game-store';
import { getRandomScenario, createSessionResult, getCallAmount } from '@/lib/game/quiz-engine';
import { calculateXPEarned, checkLevelUp, calculateLevel } from '@/lib/game/leveling';
import { checkNewAchievements, toAchievement } from '@/lib/game/achievements';
import { ArrowLeft, X } from 'lucide-react';
import type { ActionType } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function QuizPage() {
  const router = useRouter();
  const isHydrated = useStoreHydration();

  // Store state and actions
  const session = useGameStore((state) => state.session);
  const currentScenario = useGameStore((state) => state.currentScenario);
  const isAnswered = useGameStore((state) => state.isAnswered);
  const selectedAction = useGameStore((state) => state.selectedAction);
  const isCorrect = useGameStore((state) => state.isCorrect);
  const progress = useGameStore((state) => state.progress);

  const setScenario = useGameStore((state) => state.setScenario);
  const submitAnswer = useGameStore((state) => state.submitAnswer);
  const nextQuestion = useGameStore((state) => state.nextQuestion);
  const recordResult = useGameStore((state) => state.recordResult);
  const endSession = useGameStore((state) => state.endSession);
  const addXP = useGameStore((state) => state.addXP);
  const updateStats = useGameStore((state) => state.updateStats);
  const unlockAchievement = useGameStore((state) => state.unlockAchievement);
  const unlockDifficulty = useGameStore((state) => state.unlockDifficulty);

  // Local state
  const [showQuitDialog, setShowQuitDialog] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const usedScenarioIdsRef = useRef<string[]>([]);

  // Achievement toasts
  useAchievementToasts();

  // Load first scenario
  useEffect(() => {
    if (isHydrated && session && !currentScenario) {
      const scenario = getRandomScenario(session.config, usedScenarioIdsRef.current);
      if (scenario) {
        setScenario(scenario);
        usedScenarioIdsRef.current = [scenario.id];
      }
    }
  }, [isHydrated, session, currentScenario, setScenario]);

  // Redirect if no session
  useEffect(() => {
    if (isHydrated && !session) {
      router.push('/');
    }
  }, [isHydrated, session, router]);

  const handleAction = useCallback((action: ActionType) => {
    if (!currentScenario || !session || isAnswered) return;

    submitAnswer(action);

    // Calculate XP
    const streak = isCorrect === null ? session.streak : (action === currentScenario.optimalAction ? session.streak + 1 : 0);
    const earned = calculateXPEarned(
      action === currentScenario.optimalAction,
      currentScenario.difficulty,
      streak
    );
    setXpEarned(earned);

    // Record result
    const result = createSessionResult(currentScenario, action, session.streak);
    recordResult(result);

    // Update stats
    updateStats(
      currentScenario.difficulty,
      currentScenario.street,
      currentScenario.optimalAction,
      action === currentScenario.optimalAction
    );

    // Add XP
    const previousXP = progress.xp;
    addXP(earned);

    // Check level up and unlock new difficulties
    const newXP = previousXP + earned;
    const newLevel = calculateLevel(newXP);
    if (checkLevelUp(previousXP, newXP)) {
      // Unlock difficulties based on new level
      if (newLevel >= 2) unlockDifficulty('intermediate');
      if (newLevel >= 4) unlockDifficulty('advanced');
      if (newLevel >= 7) unlockDifficulty('expert');
    }

    // Check achievements
    const newStats = {
      ...progress.stats,
      totalQuestionsAnswered: progress.stats.totalQuestionsAnswered + 1,
      totalCorrect: progress.stats.totalCorrect + (action === currentScenario.optimalAction ? 1 : 0),
      bestStreak: Math.max(progress.stats.bestStreak, action === currentScenario.optimalAction ? session.streak + 1 : 0),
    };
    const newProgress = { ...progress, xp: newXP, level: newLevel, stats: newStats };
    const newAchievements = checkNewAchievements(newStats, newProgress, progress.achievements);
    newAchievements.forEach((achievement) => {
      unlockAchievement(toAchievement(achievement, new Date()), achievement.xpReward);
    });
  }, [currentScenario, session, isAnswered, submitAnswer, recordResult, updateStats, addXP, unlockDifficulty, unlockAchievement, progress, isCorrect]);

  const handleContinue = useCallback(() => {
    if (!session) return;

    const nextIndex = session.currentQuestionIndex;
    const totalQuestions = session.config.questionCount;

    if (nextIndex >= totalQuestions) {
      // End session
      endSession();
      router.push('/quiz/summary');
    } else {
      // Load next scenario
      let scenario = getRandomScenario(session.config, usedScenarioIdsRef.current);

      // If we run out of unique scenarios, allow repeats
      if (!scenario) {
        scenario = getRandomScenario(session.config, []);
      }

      if (scenario) {
        nextQuestion(scenario);
        usedScenarioIdsRef.current = [...usedScenarioIdsRef.current, scenario.id];
      }
    }
  }, [session, endSession, nextQuestion, router]);

  const handleQuit = () => {
    endSession();
    router.push('/');
  };

  if (!isHydrated || !session) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-poker-felt to-poker-felt-dark flex items-center justify-center">
        <div className="animate-pulse text-white">Loading...</div>
      </main>
    );
  }

  if (!currentScenario) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-poker-felt to-poker-felt-dark flex items-center justify-center">
        <div className="animate-pulse text-white">Loading scenario...</div>
      </main>
    );
  }

  const correctCount = session.results.filter((r) => r.isCorrect).length;
  const sessionScore = session.results.reduce((sum, r) => sum + r.xpEarned, 0);
  const callAmount = getCallAmount(currentScenario);

  return (
    <main className="min-h-screen bg-gradient-to-b from-poker-felt to-poker-felt-dark flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-black/20">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={() => setShowQuitDialog(true)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <SessionProgress
          currentQuestion={session.currentQuestionIndex}
          totalQuestions={session.config.questionCount}
          correctCount={correctCount}
          streak={session.streak}
          sessionScore={sessionScore}
          className="flex-1 mx-4"
        />

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={() => setShowQuitDialog(true)}
        >
          <X className="w-5 h-5" />
        </Button>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-4 py-4">
        {/* Poker Table */}
        <PokerTable scenario={currentScenario} showHeroCards className="mb-4" />

        {/* Action History */}
        <div className="bg-white/95 dark:bg-zinc-900/95 rounded-xl p-3 mb-4 shadow-lg">
          <ActionHistory
            actions={currentScenario.actionHistory}
            heroPosition={currentScenario.heroPosition}
          />
        </div>
      </div>

      {/* Action Buttons (fixed at bottom) */}
      {!isAnswered && (
        <div className="bg-black/30 backdrop-blur-lg border-t border-white/10 p-4">
          <QuizActionButtons
            validActions={currentScenario.validActions}
            callAmount={callAmount}
            onAction={handleAction}
            disabled={isAnswered}
          />
        </div>
      )}

      {/* Feedback Panel */}
      {isAnswered && selectedAction && (
        <FeedbackPanel
          isCorrect={isCorrect ?? false}
          playerAction={selectedAction}
          optimalAction={currentScenario.optimalAction}
          explanation={currentScenario.explanation}
          keyConcept={currentScenario.keyConcept}
          xpEarned={xpEarned}
          onContinue={handleContinue}
        />
      )}

      {/* Quit Confirmation Dialog */}
      <AlertDialog open={showQuitDialog} onOpenChange={setShowQuitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Quit Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              Your progress in this session will be saved, but you won&apos;t see the summary.
              Are you sure you want to quit?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Playing</AlertDialogCancel>
            <AlertDialogAction onClick={handleQuit}>Quit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
