'use client';

import { Bell, Menu, Moon, Search, Sun } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

import { cn } from '@/components/ui/cn';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';

import { useAdminTheme } from './AdminThemeContext';

function roleLabel(role: string | undefined): string {
  if (!role) return '';
  return role
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function AdminTopBar() {
  const user = useAuthStore((s) => s.user);
  const now = new Date();
  const { isLight, toggleTheme } = useAdminTheme();
  const toggleAdminSidebar = useUiStore((s) => s.toggleAdminSidebar);

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 w-full min-w-0 border-b backdrop-blur-md',
        isLight
          ? 'border-slate-200/80 bg-white/90 shadow-sm'
          : 'border-cyan-500/15 bg-[#0b111b]/90'
      )}
    >
      <div className="mx-auto flex min-h-14 w-full min-w-0 max-w-[min(100%,1920px)] flex-col gap-2 px-3 py-2 sm:gap-0 md:h-14 md:flex-row md:items-center md:gap-4 md:px-5 md:py-0">
        {/* Row 1: brand (left) · center search (md+) · actions (right) */}
        <div className="flex w-full min-w-0 items-center gap-3">
          <div className="flex min-w-0 shrink-0 items-center gap-2 md:min-w-[200px] lg:min-w-[240px]">
            <button
              type="button"
              onClick={toggleAdminSidebar}
              className={cn(
                'rounded-lg p-2.5 transition md:hidden',
                isLight
                  ? 'text-slate-700 hover:bg-slate-100'
                  : 'text-cyan-300 hover:bg-cyan-500/10'
              )}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link
              href="/admin/dashboard"
              className={cn(
                'min-w-0 truncate text-base font-bold tracking-tight sm:text-lg',
                isLight ? 'text-slate-900' : 'text-white drop-shadow-[0_0_12px_rgba(0,242,255,0.25)]'
              )}
            >
              Idea Hub Admin
            </Link>
          </div>

          <div className="hidden min-w-0 flex-1 justify-center px-2 md:flex">
            <div className="relative w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl">
              <Search
                className={cn(
                  'pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2',
                  isLight ? 'text-slate-400' : 'text-cyan-500/55'
                )}
              />
              <input
                type="search"
                placeholder="Search projects, ideas, users, reports…"
                className={cn(
                  'h-10 w-full rounded-xl border py-2 pl-10 pr-4 text-sm placeholder:opacity-70 focus:outline-none focus:ring-2',
                  isLight
                    ? 'border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-cyan-500/40 focus:ring-cyan-500/15'
                    : 'border-cyan-500/25 bg-[#070d16]/90 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400/45 focus:ring-cyan-400/20'
                )}
                readOnly
                aria-readonly
              />
            </div>
          </div>

          <div className="ml-auto flex min-w-0 shrink-0 items-center justify-end gap-2 sm:gap-2.5">
        <span
          className={cn(
            'hidden text-[10px] tabular-nums sm:block',
            isLight ? 'text-slate-500' : 'text-slate-400'
          )}
        >
          {format(now, 'MMM d, yyyy | h:mm a')}
        </span>
        <button
          type="button"
          onClick={toggleTheme}
          className={cn(
            'rounded-md p-1.5 transition',
            isLight
              ? 'text-amber-600 hover:bg-amber-50'
              : 'text-amber-200/80 hover:bg-cyan-500/10'
          )}
          aria-label={isLight ? 'Dark mode' : 'Light mode'}
        >
          {isLight ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </button>
        <button
          type="button"
          className={cn(
            'relative rounded-md p-1.5 transition',
            isLight
              ? 'text-cyan-700 hover:bg-cyan-50'
              : 'text-cyan-400/70 hover:bg-cyan-500/10 hover:text-[#00f2ff]'
          )}
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span
            className={cn(
              'absolute right-1 top-1 h-1.5 w-1.5 rounded-full shadow-[0_0_6px_currentColor]',
              isLight ? 'bg-cyan-500 text-cyan-500' : 'bg-cyan-400 text-cyan-400'
            )}
          />
        </button>
        <div
          className={cn(
            'hidden h-6 w-px sm:block',
            isLight ? 'bg-slate-200' : 'bg-cyan-500/20'
          )}
        />
        <div className="flex min-w-0 items-center gap-1.5">
          <span
            className={cn(
              'max-w-[5.5rem] truncate text-xs font-medium sm:max-w-[8rem] lg:max-w-[12rem] xl:max-w-none',
              isLight ? 'text-slate-800' : 'text-slate-300'
            )}
            title={user?.fullName ?? 'Admin'}
          >
            {user?.fullName ?? 'Admin'}
          </span>
          <span
            className={cn(
              'shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide',
              isLight
                ? 'border border-cyan-400/50 bg-gradient-to-r from-cyan-50 to-emerald-50 text-cyan-800 shadow-sm'
                : 'border border-cyan-400/35 bg-gradient-to-r from-cyan-500/20 via-emerald-500/15 to-blue-500/20 text-[#a5f3fc] shadow-[0_0_12px_rgba(34,211,238,0.25)]'
            )}
          >
            {roleLabel(user?.role)}
          </span>
        </div>
            <Link
              href="/"
              className={cn(
                'hidden text-xs sm:inline',
                isLight ? 'text-slate-500 hover:text-cyan-700' : 'text-slate-400 hover:text-cyan-300'
              )}
            >
              Main site
            </Link>
          </div>
        </div>

        {/* Mobile: full-width search under title row */}
        <div className="relative w-full md:hidden">
          <Search
            className={cn(
              'pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2',
              isLight ? 'text-slate-400' : 'text-cyan-500/55'
            )}
          />
          <input
            type="search"
            placeholder="Search ideas, users…"
            className={cn(
              'h-10 w-full rounded-xl border py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-2',
              isLight
                ? 'border-slate-200 bg-white focus:ring-cyan-500/15'
                : 'border-cyan-500/25 bg-[#070d16]/90 focus:ring-cyan-400/20'
            )}
            readOnly
            aria-readonly
          />
        </div>
      </div>
    </header>
  );
}
