'use client';

import { format } from 'date-fns';
import { RotateCw } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import { AdminDashboardCharts } from '@/components/admin/AdminDashboardCharts';
import { useAdminTheme } from '@/components/admin/AdminThemeContext';
import { cn } from '@/components/ui/cn';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { adminApi } from '@/lib/api/admin.api';
import { extractApiError } from '@/lib/api/errors';

export default function AdminDashboardPage() {
  const { isLight } = useAdminTheme();
  const statsQ = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => adminApi.getStats(),
    staleTime: 30_000,
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
  });

  const sk = isLight ? 'bg-slate-200/80' : 'bg-cyan-500/10';
  const now = new Date();

  if (statsQ.isLoading) {
    return (
      <div className="w-full min-w-0 space-y-2">
        <Skeleton className={cn('h-7 w-48 rounded-md', sk)} />
        <div className="grid min-w-0 grid-cols-2 gap-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className={cn('h-[100px] rounded-xl', sk)} />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-5">
          <Skeleton className={cn('h-[280px] rounded-xl lg:col-span-3', sk)} />
          <Skeleton className={cn('h-[280px] rounded-xl lg:col-span-2', sk)} />
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-2 lg:grid-cols-2">
          <Skeleton className={cn('h-[220px] rounded-xl', sk)} />
          <Skeleton className={cn('h-[220px] rounded-xl', sk)} />
        </div>
      </div>
    );
  }

  if (statsQ.isError || !statsQ.data) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6 text-center text-sm text-red-200">
        <p>{extractApiError(statsQ.error)}</p>
        <Button
          className="mt-3 border-cyan-500/30 bg-cyan-500/10 text-xs text-cyan-200 hover:bg-cyan-500/20"
          onClick={() => void statsQ.refetch()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 max-w-full">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p
            className={cn(
              'mb-1 text-[10px] font-semibold uppercase tracking-[0.2em]',
              isLight ? 'text-slate-500' : 'text-slate-500'
            )}
          >
            Admin dashboard · Idea Hub
          </p>
          <h1
            className={cn(
              'text-xl font-bold tracking-tight md:text-2xl',
              isLight ? 'text-slate-900' : 'text-white'
            )}
          >
            Overview
          </h1>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
            <span>
              Last updated:{' '}
              {statsQ.dataUpdatedAt
                ? format(new Date(statsQ.dataUpdatedAt), 'h:mm:ss a')
                : '—'}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 gap-1 px-2 text-[11px]"
              disabled={statsQ.isFetching}
              onClick={() => void statsQ.refetch()}
            >
              <RotateCw
                className={cn('h-3.5 w-3.5', statsQ.isFetching && 'animate-spin')}
              />
              Refresh
            </Button>
          </div>
        </div>
        <p
          className={cn(
            'text-xs tabular-nums',
            isLight ? 'text-slate-500' : 'text-slate-400'
          )}
        >
          {format(now, 'EEEE, MMM d, yyyy · h:mm a')}
        </p>
      </div>
      <AdminDashboardCharts stats={statsQ.data} />
    </div>
  );
}
