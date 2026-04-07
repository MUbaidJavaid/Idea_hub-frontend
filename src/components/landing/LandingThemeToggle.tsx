'use client';

import { Moon, Sun } from 'lucide-react';

import { cn } from '@/components/ui/cn';
import { useLandingTheme } from '@/hooks/useLandingTheme';

export function LandingThemeToggle({ className }: { className?: string }) {
  const { toggle, mounted, isDark } = useLandingTheme();

  return (
    <button
      type="button"
      onClick={() => toggle()}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-slate-800 shadow-sm backdrop-blur-md transition hover:scale-105 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:border-white/10 dark:bg-white/5 dark:text-amber-100 dark:hover:bg-white/10',
        className
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {!mounted ? (
        <span className="h-5 w-5 rounded-full bg-slate-300/50 dark:bg-slate-600/50" />
      ) : isDark ? (
        <Sun className="h-5 w-5" aria-hidden />
      ) : (
        <Moon className="h-5 w-5" aria-hidden />
      )}
    </button>
  );
}
