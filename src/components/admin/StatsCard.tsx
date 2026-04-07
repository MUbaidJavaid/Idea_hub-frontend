'use client';

import { cn } from '@/components/ui/cn';

export function StatsCard({
  label,
  value,
  sub,
  className,
}: {
  label: string;
  value: string | number;
  sub?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4',
        className
      )}
    >
      <p className="text-sm text-[var(--text-muted)]">{label}</p>
      <p className="mt-1 text-2xl font-bold text-[var(--text)]">{value}</p>
      {sub ? (
        <p className="mt-1 text-xs text-[var(--text-muted)]">{sub}</p>
      ) : null}
    </div>
  );
}
