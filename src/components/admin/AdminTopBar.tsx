'use client';

import { Bell, Menu, Moon, Search, Sun } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

import { IdeaHubMark } from '@/components/brand/IdeaHubLogo';
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
    <header className="fixed left-0 right-0 top-0 z-50 w-full min-w-0 border-b border-[var(--lh-line)] bg-[var(--lh-bg)]/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-14 w-full min-w-0 max-w-[min(100%,1920px)] flex-col gap-2 px-3 py-2 sm:gap-0 md:h-14 md:flex-row md:items-center md:gap-4 md:px-5 md:py-0">
        <div className="flex w-full min-w-0 items-center gap-3">
          <div className="flex min-w-0 shrink-0 items-center gap-2 md:min-w-[220px] lg:min-w-[260px]">
            <button
              type="button"
              onClick={toggleAdminSidebar}
              className="rounded-lg p-2.5 text-[var(--lh-ink)] transition hover:bg-[var(--lh-surface)] md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link
              href="/admin/dashboard"
              className="flex min-w-0 items-center gap-2.5"
            >
              <IdeaHubMark size={28} inverted={!isLight} />
              <span className="landing-display min-w-0 truncate text-base font-semibold tracking-tight text-[var(--lh-ink)] sm:text-lg">
                Idea Hub Admin
              </span>
            </Link>
          </div>

          <div className="hidden min-w-0 flex-1 justify-center px-2 md:flex">
            <div className="relative w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--lh-muted)]" />
              <input
                type="search"
                placeholder="Search projects, ideas, users, reports…"
                className="h-10 w-full rounded-full border border-[var(--lh-line)] bg-[var(--lh-surface)] py-2 pl-10 pr-4 text-sm text-[var(--lh-ink)] placeholder:text-[var(--lh-muted)] focus:border-[var(--lh-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--lh-accent-soft)]"
                readOnly
                aria-readonly
              />
            </div>
          </div>

          <div className="ml-auto flex min-w-0 shrink-0 items-center justify-end gap-2 sm:gap-2.5">
            <span className="hidden text-[10px] tabular-nums text-[var(--lh-muted)] sm:block">
              {format(now, 'MMM d, yyyy | h:mm a')}
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full p-1.5 text-[var(--lh-muted)] transition hover:bg-[var(--lh-surface)] hover:text-[var(--lh-ink)]"
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
              className="relative rounded-full p-1.5 text-[var(--lh-muted)] transition hover:bg-[var(--lh-surface)] hover:text-[var(--lh-ink)]"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[var(--lh-accent)]" />
            </button>
            <div className="hidden h-6 w-px bg-[var(--lh-line)] sm:block" />
            <div className="flex min-w-0 items-center gap-1.5">
              <span
                className="max-w-[5.5rem] truncate text-xs font-medium text-[var(--lh-ink)] sm:max-w-[8rem] lg:max-w-[12rem] xl:max-w-none"
                title={user?.fullName ?? 'Admin'}
              >
                {user?.fullName ?? 'Admin'}
              </span>
              <span className="shrink-0 rounded-full border border-[var(--lh-line)] bg-[var(--lh-accent-soft)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[var(--lh-accent)]">
                {roleLabel(user?.role)}
              </span>
            </div>
            <Link
              href="/"
              className="hidden text-xs text-[var(--lh-muted)] transition hover:text-[var(--lh-accent)] sm:inline"
            >
              Main site
            </Link>
          </div>
        </div>

        <div className="relative w-full md:hidden">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--lh-muted)]" />
          <input
            type="search"
            placeholder="Search ideas, users…"
            className="h-10 w-full rounded-full border border-[var(--lh-line)] bg-[var(--lh-surface)] py-2 pl-10 pr-3 text-sm text-[var(--lh-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--lh-accent-soft)]"
            readOnly
            aria-readonly
          />
        </div>
      </div>
    </header>
  );
}
