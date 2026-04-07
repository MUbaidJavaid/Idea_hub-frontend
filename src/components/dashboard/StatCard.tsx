'use client';

import type { LucideIcon } from 'lucide-react';

import { cn } from '@/components/ui/cn';

const ACCENTS: Record<
  'blue' | 'purple' | 'amber' | 'green' | 'red',
  { light: string; dark: string }
> = {
  blue: {
    light: 'bg-blue-50 text-blue-700',
    dark: 'bg-blue-500/15 text-blue-200',
  },
  purple: {
    light: 'bg-violet-50 text-violet-700',
    dark: 'bg-violet-500/15 text-violet-200',
  },
  amber: {
    light: 'bg-amber-50 text-amber-800',
    dark: 'bg-amber-500/15 text-amber-200',
  },
  green: {
    light: 'bg-emerald-50 text-emerald-700',
    dark: 'bg-emerald-500/15 text-emerald-200',
  },
  red: {
    light: 'bg-red-50 text-red-700',
    dark: 'bg-red-500/15 text-red-200',
  },
};

export function StatCard({
  label,
  value,
  subLabel,
  icon: Icon,
  accent,
  trendPct,
  isLight,
}: {
  label: string;
  value: number | string;
  subLabel?: string;
  icon: LucideIcon;
  accent: keyof typeof ACCENTS;
  trendPct?: number;
  isLight: boolean;
}) {
  const ring = ACCENTS[accent];
  const up = trendPct === undefined ? null : trendPct >= 0;
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border p-5 shadow-sm',
        isLight
          ? 'border-[var(--color-border)] bg-[var(--color-surface)]'
          : 'border-cyan-500/30 bg-[#0d1520] shadow-[0_0_28px_rgba(0,242,255,0.07)]'
      )}
      style={
        isLight
          ? { boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }
          : undefined
      }
    >
      <div className="flex items-start justify-between gap-2">
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full',
            isLight ? ring.light : ring.dark
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </div>
        {trendPct !== undefined ? (
          <span
            className={cn(
              'rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums',
              up
                ? isLight
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-emerald-500/15 text-emerald-300'
                : isLight
                  ? 'bg-red-50 text-red-700'
                  : 'bg-red-500/15 text-red-300'
            )}
          >
            {up ? '↑' : '↓'} {Math.abs(trendPct)}%
          </span>
        ) : null}
      </div>
      <p
        className={cn(
          'mt-3 text-3xl font-bold tabular-nums tracking-tight',
          isLight ? 'text-slate-900' : 'text-white'
        )}
      >
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      <p
        className={cn(
          'text-xs font-medium',
          isLight ? 'text-slate-500' : 'text-slate-400'
        )}
      >
        {label}
      </p>
      {subLabel ? (
        <div
          className={cn(
            'mt-2 border-t pt-2 text-[11px]',
            isLight ? 'border-slate-100 text-slate-600' : 'border-white/5 text-slate-500'
          )}
        >
          {subLabel}
        </div>
      ) : null}
    </div>
  );
}
