'use client';

import {
  BarChart3,
  Bell,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  MessageSquare,
  ScrollText,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAdminTheme } from '@/components/admin/AdminThemeContext';
import { cn } from '@/components/ui/cn';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';

const items: Array<{
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  match?: 'exact' | 'prefix';
}> = [
  { href: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard, match: 'exact' },
  { href: '/admin/users', label: 'Users', icon: Users, match: 'prefix' },
  { href: '/admin/ideas', label: 'Ideas', icon: Lightbulb, match: 'prefix' },
  { href: '/admin/comments', label: 'Comments', icon: MessageSquare, match: 'prefix' },
  { href: '/admin/scan-queue', label: 'Review Queue', icon: ShieldCheck, match: 'prefix' },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3, match: 'prefix' },
  { href: '/admin/audit-logs', label: 'Audit Logs', icon: ScrollText, match: 'prefix' },
  { href: '/admin/notifications', label: 'Broadcasts', icon: Bell, match: 'prefix' },
  { href: '/admin/settings', label: 'Settings', icon: Settings, match: 'prefix' },
];

/** Matches AdminTopBar height (h-14 = 3.5rem) and sidebar width (w-72) */
const TOP_OFFSET = 'top-14';
const SIDEBAR_W = 'w-72';

export function AdminSidebar() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const { logout } = useAuth();
  const { isLight } = useAdminTheme();
  const adminOpen = useUiStore((s) => s.adminSidebarOpen);
  const setAdminOpen = useUiStore((s) => s.setAdminSidebarOpen);

  return (
    <>
      {adminOpen ? (
        <button
          type="button"
          className={cn(
            'fixed inset-0 z-30 bg-black/45 backdrop-blur-sm md:hidden',
            TOP_OFFSET
          )}
          aria-label="Close menu"
          onClick={() => setAdminOpen(false)}
        />
      ) : null}
      <aside
        className={cn(
          'fixed left-0 z-40 flex max-w-[100vw] flex-col overflow-hidden border-r backdrop-blur-md transition-transform duration-200 ease-out',
          SIDEBAR_W,
          TOP_OFFSET,
          'h-[calc(100dvh-3.5rem)]',
          adminOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          isLight
            ? 'border-slate-200 bg-white/95 shadow-sm'
            : 'border-cyan-500/20 bg-[#0b111e]/95'
        )}
      >
        <div
          className={cn(
            'flex shrink-0 items-center gap-3 border-b px-4 py-3',
            isLight ? 'border-slate-200' : 'border-cyan-500/15'
          )}
        >
          <div
            className={cn(
              'relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border',
              isLight
                ? 'border-amber-300/60 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-[0_0_16px_rgba(251,191,36,0.35)]'
                : 'border-amber-400/40 bg-amber-500/10 shadow-[0_0_18px_rgba(251,191,36,0.45),0_0_28px_rgba(34,211,238,0.15)]'
            )}
          >
            <Lightbulb
              className={cn(
                'relative z-[1] h-5 w-5',
                isLight ? 'text-amber-600' : 'text-amber-200'
              )}
              strokeWidth={2}
              fill={isLight ? 'rgba(251,191,36,0.35)' : 'rgba(251,191,36,0.2)'}
            />
            {!isLight ? (
              <span
                className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-cyan-400/20 to-transparent blur-[6px]"
                aria-hidden
              />
            ) : null}
          </div>
          <div className="min-w-0">
            <p
              className={cn(
                'truncate text-sm font-bold tracking-wide',
                isLight ? 'text-slate-900' : 'text-white'
              )}
            >
              {user?.fullName ?? 'Admin'}
            </p>
            <p
              className={cn(
                'text-[10px] font-medium uppercase tracking-wider',
                isLight ? 'text-cyan-700' : 'text-cyan-400/70'
              )}
            >
              Console · {user?.role === 'super_admin' ? 'Super Admin' : 'Moderator'}
            </p>
          </div>
        </div>

        <div className={cn('mx-3 my-2 h-px', isLight ? 'bg-slate-200' : 'bg-cyan-500/10')} />

        <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden overscroll-contain px-3 pb-2 pt-1">
          {items.map(({ href, label, icon: Icon, match }) => {
            const isActive =
              match === 'exact'
                ? pathname === href || pathname === `${href}/`
                : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setAdminOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition',
                  isActive
                    ? isLight
                      ? 'bg-brand/12 font-semibold text-brand shadow-sm dark:bg-cyan-400/10 dark:text-[#00f2ff]'
                      : 'border border-cyan-400/35 bg-cyan-400/10 font-semibold text-[#00f2ff] shadow-[0_0_16px_rgba(0,242,255,0.12)]'
                    : isLight
                      ? 'border border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                      : 'border border-transparent text-slate-400 hover:border-cyan-500/15 hover:bg-cyan-500/5 hover:text-slate-200'
                )}
              >
                <Icon className="h-4 w-4 shrink-0 opacity-90" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div
          className={cn(
            'mt-auto shrink-0 border-t px-3 py-3',
            isLight ? 'border-slate-200 bg-slate-50/80' : 'border-cyan-500/15 bg-[#070d16]/60'
          )}
        >
          <div
            className={cn(
              'mb-3 flex items-center gap-3 rounded-xl border p-3',
              isLight
                ? 'border-slate-200 bg-white'
                : 'border-cyan-500/15 bg-[#0b111e]/80'
            )}
          >
            <div
              className={cn(
                'relative h-10 w-10 shrink-0 overflow-hidden rounded-full border bg-slate-800',
                isLight ? 'border-cyan-200' : 'border-cyan-500/30'
              )}
            >
              {user?.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatarUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <span
                  className={cn(
                    'flex h-full w-full items-center justify-center text-sm font-bold',
                    isLight ? 'text-cyan-700' : 'text-cyan-300'
                  )}
                >
                  {(user?.fullName ?? '?').slice(0, 1).toUpperCase()}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  'truncate text-sm font-medium',
                  isLight ? 'text-slate-900' : 'text-white'
                )}
              >
                {user?.fullName ?? 'Admin'}
              </p>
              <p
                className={cn(
                  'truncate text-xs',
                  isLight ? 'text-slate-500' : 'text-cyan-200/50'
                )}
              >
                @{user?.username ?? 'admin'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => void logout()}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition',
              isLight
                ? 'border-red-200 bg-white text-red-700 hover:bg-red-50'
                : 'border-red-500/30 bg-red-500/10 text-red-200 hover:bg-red-500/20'
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Log out
          </button>

          <p
            className={cn(
              'mt-2 text-center text-[10px] leading-snug',
              isLight ? 'text-slate-400' : 'text-cyan-200/35'
            )}
          >
            Live API data · staff only
          </p>
        </div>
      </aside>
    </>
  );
}
