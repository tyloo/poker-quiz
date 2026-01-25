'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  usePlayerSettingsHydrated,
  useStoreHydration,
  useGameStore,
} from '@/lib/hooks/use-game-store';
import { ArrowLeft, Settings, RotateCcw, Volume2, VolumeX, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Difficulty, Street } from '@/lib/types';

const SESSION_LENGTHS = [5, 10, 15, 20] as const;

const STREET_OPTIONS: { value: Street | 'all' | 'postflop'; label: string }[] = [
  { value: 'all', label: 'All Streets' },
  { value: 'preflop', label: 'Preflop Only' },
  { value: 'postflop', label: 'Postflop Only' },
  { value: 'flop', label: 'Flop Only' },
  { value: 'turn', label: 'Turn Only' },
  { value: 'river', label: 'River Only' },
];

const DIFFICULTY_OPTIONS: { value: Difficulty | 'all'; label: string }[] = [
  { value: 'all', label: 'All Difficulties' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' },
];

export default function SettingsPage() {
  const isHydrated = useStoreHydration();
  const settings = usePlayerSettingsHydrated();
  const updateSettings = useGameStore((state) => state.updateSettings);
  const resetProgress = useGameStore((state) => state.resetProgress);
  const [showResetDialog, setShowResetDialog] = useState(false);

  if (!isHydrated) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-emerald-900 to-emerald-950 flex items-center justify-center">
        <div className="animate-pulse text-white">Loading...</div>
      </main>
    );
  }

  const handleSessionLengthChange = (value: string) => {
    updateSettings({ defaultSessionLength: parseInt(value, 10) });
  };

  const handleDifficultyChange = (value: string) => {
    updateSettings({ defaultDifficulty: value as Difficulty | 'all' });
  };

  const handleStreetFilterChange = (value: string) => {
    updateSettings({ streetFilter: value as Street | 'all' | 'postflop' });
  };

  const handleSoundToggle = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
  };

  const handleReducedMotionToggle = () => {
    updateSettings({ reducedMotion: !settings.reducedMotion });
  };

  const handleResetProgress = () => {
    resetProgress();
    setShowResetDialog(false);
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
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Settings className="w-6 h-6" />
              Settings
            </h1>
            <p className="text-emerald-200 text-sm">Customize your experience</p>
          </div>
        </header>

        {/* Session Settings */}
        <Card className="bg-white/10 border-white/20 mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Session Defaults
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Session Length */}
            <div className="space-y-2">
              <Label className="text-emerald-200 text-sm">Questions per Session</Label>
              <Select
                value={settings.defaultSessionLength.toString()}
                onValueChange={handleSessionLengthChange}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SESSION_LENGTHS.map((length) => (
                    <SelectItem key={length} value={length.toString()}>
                      {length} questions
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Default Difficulty */}
            <div className="space-y-2">
              <Label className="text-emerald-200 text-sm">Default Difficulty</Label>
              <Select
                value={settings.defaultDifficulty}
                onValueChange={handleDifficultyChange}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DIFFICULTY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Street Filter */}
            <div className="space-y-2">
              <Label className="text-emerald-200 text-sm">Street Filter</Label>
              <Select
                value={settings.streetFilter}
                onValueChange={handleStreetFilterChange}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STREET_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Accessibility Settings */}
        <Card className="bg-white/10 border-white/20 mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Accessibility
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Sound Toggle */}
            <button
              onClick={handleSoundToggle}
              className={cn(
                'w-full flex items-center justify-between p-3 rounded-lg transition-colors',
                settings.soundEnabled ? 'bg-emerald-500/20' : 'bg-white/5'
              )}
            >
              <div className="flex items-center gap-3">
                {settings.soundEnabled ? (
                  <Volume2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <VolumeX className="w-5 h-5 text-gray-400" />
                )}
                <span className="text-white text-sm">Sound Effects</span>
              </div>
              <div
                className={cn(
                  'w-10 h-6 rounded-full transition-colors relative',
                  settings.soundEnabled ? 'bg-emerald-500' : 'bg-white/20'
                )}
              >
                <div
                  className={cn(
                    'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                    settings.soundEnabled ? 'translate-x-5' : 'translate-x-1'
                  )}
                />
              </div>
            </button>

            {/* Reduced Motion Toggle */}
            <button
              onClick={handleReducedMotionToggle}
              className={cn(
                'w-full flex items-center justify-between p-3 rounded-lg transition-colors',
                settings.reducedMotion ? 'bg-emerald-500/20' : 'bg-white/5'
              )}
            >
              <div className="flex items-center gap-3">
                <Sparkles className={cn('w-5 h-5', settings.reducedMotion ? 'text-gray-400' : 'text-emerald-400')} />
                <span className="text-white text-sm">Reduced Motion</span>
              </div>
              <div
                className={cn(
                  'w-10 h-6 rounded-full transition-colors relative',
                  settings.reducedMotion ? 'bg-emerald-500' : 'bg-white/20'
                )}
              >
                <div
                  className={cn(
                    'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                    settings.reducedMotion ? 'translate-x-5' : 'translate-x-1'
                  )}
                />
              </div>
            </button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="bg-red-500/10 border-red-500/30 mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-red-300 text-sm flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-200/70 text-sm mb-3">
              Reset all progress including XP, achievements, and statistics. This action cannot be
              undone.
            </p>
            <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-red-500/50 text-red-300 hover:bg-red-500/20 hover:text-red-200"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset All Progress
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your progress, including your level, XP,
                    achievements, and statistics. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleResetProgress}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Yes, Reset Everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
