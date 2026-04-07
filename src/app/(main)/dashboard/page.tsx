'use client';

import { format, formatDistanceToNow, parseISO } from 'date-fns';
import {
  ArrowUpRight,
  Bell,
  Bookmark,
  Eye,
  Handshake,
  Heart,
  LayoutGrid,
  Lightbulb,
  MessageCircle,
  Plus,
  Settings,
  Share2,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { AuthGuard } from '@/components/providers/AuthGuard';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/components/ui/cn';
import { extractApiError } from '@/lib/api/errors';
import { usersApi } from '@/lib/api/users.api';
import { getEffectivePlan } from '@/lib/subscription';
import { useAuthStore } from '@/store/authStore';

function firstName(fullName: string): string {
  const p = fullName.trim().split(/\s+/)[0];
  return p ?? fullName;
}

export default function UserDashboardPage() {
  return (
    <AuthGuard>
      <UserDashboardInner />
    </AuthGuard>
  );
}

function UserDashboardInner() {
  const user = useAuthStore((s) => s.user);
  const q = useQuery({
    queryKey: ['users', 'me', 'dashboard'],
    queryFn: () => usersApi.getMyDashboard(),
  });

  if (q.isLoading || !user) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 px-3 py-6 md:px-6">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-72 rounded-2xl lg:col-span-2" />
          <Skeleton className="h-72 rounded-2xl" />
        </div>
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (q.isError || !q.data) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-sm text-red-600 dark:text-red-400">
          {extractApiError(q.error)}
        </p>
        <Button className="mt-4" onClick={() => void q.refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  const d = q.data;
  const profile = d.profile;
  const effPlan = getEffectivePlan(profile);
  const barData = d.weeklyViews.map((row) => ({
    ...row,
    label: format(parseISO(`${row.date}T12:00:00.000Z`), 'EEE'),
  }));
  const gm = profile.gamification;

  const profileScore =
    (profile.avatarUrl ? 1 : 0) +
    (profile.bio?.trim() ? 1 : 0) +
    (profile.skills?.length ? 1 : 0);
  const profilePct = Math.round((profileScore / 3) * 100);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-3 py-6 md:px-6 md:py-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-surface)] to-[var(--color-brand-light)]/30 p-6 shadow-sm dark:to-indigo-950/20 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-md">
              {profile.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.avatarUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-[var(--color-brand)]">
                  {profile.fullName.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
                  Welcome back, {firstName(profile.fullName)}
                </h1>
                {gm ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-semibold text-amber-800 dark:text-amber-200">
                    <Trophy className="h-3.5 w-3.5" />
                    Lv.{gm.level} {gm.levelTitle}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                @{profile.username} · Your creator overview
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span
                  className={cn(
                    'rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide',
                    effPlan === 'free' &&
                      'bg-slate-500/15 text-slate-700 dark:text-slate-300',
                    effPlan === 'pro' &&
                      'bg-indigo-500/15 text-indigo-800 dark:text-indigo-200',
                    effPlan === 'investor' &&
                      'bg-violet-500/15 text-violet-800 dark:text-violet-200'
                  )}
                >
                  {effPlan} plan
                </span>
                {profile.verifiedInnovator ? (
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:text-emerald-200">
                    Verified innovator
                  </span>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex flex-shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
            <Button asChild className="justify-center">
              <Link href="/ideas/new">
                <Plus className="h-4 w-4" />
                New idea
              </Link>
            </Button>
            <Button asChild variant="secondary" className="justify-center">
              <Link href="/my-ideas">
                <Lightbulb className="h-4 w-4" />
                My ideas
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* KPI row — all API stats */}
      <section aria-label="Your stats">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          Performance
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <MiniStat
            icon={Lightbulb}
            label="Ideas"
            value={d.stats.totalIdeas}
            accent="text-violet-600 dark:text-violet-300"
            bg="bg-violet-500/10"
          />
          <MiniStat
            icon={Heart}
            label="Likes received"
            value={d.stats.totalLikes}
            accent="text-red-600 dark:text-red-300"
            bg="bg-red-500/10"
          />
          <MiniStat
            icon={Eye}
            label="Views"
            value={d.stats.totalViews}
            accent="text-blue-600 dark:text-blue-300"
            bg="bg-blue-500/10"
          />
          <MiniStat
            icon={MessageCircle}
            label="Comments"
            value={d.stats.totalComments}
            accent="text-cyan-600 dark:text-cyan-300"
            bg="bg-cyan-500/10"
          />
          <MiniStat
            icon={Handshake}
            label="Collabs on ideas"
            value={d.stats.totalCollaborators}
            accent="text-amber-600 dark:text-amber-300"
            bg="bg-amber-500/10"
          />
          <MiniStat
            icon={Users}
            label="Followers"
            value={d.stats.totalFollowers}
            accent="text-emerald-600 dark:text-emerald-300"
            bg="bg-emerald-500/10"
          />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm dark:border-gray-700/80">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
                  Idea pipeline
                </h2>
                <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                  Status counts for ideas you own
                </p>
              </div>
              <Link
                href="/my-ideas"
                className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-brand)] hover:underline"
              >
                Manage
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <StatusPill label="Published" value={d.ideas.published} ok />
              <StatusPill label="Pending" value={d.ideas.pending} warn />
              <StatusPill label="Draft" value={d.ideas.draft} />
              <StatusPill label="Rejected" value={d.ideas.rejected} danger />
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm dark:border-gray-700/80">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
                  Weekly views
                </h2>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Unique view events on your ideas · last 7 days
                </p>
              </div>
              <TrendingUp className="h-5 w-5 text-[var(--color-text-muted)] opacity-60" />
            </div>
            <div className="h-56 w-full md:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 6"
                    className="stroke-[var(--color-border)] opacity-50"
                  />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
                    width={36}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'var(--color-brand-light)', opacity: 0.3 }}
                    contentStyle={{
                      borderRadius: 8,
                      fontSize: 12,
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-surface-elevated)',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                  <Bar
                    dataKey="views"
                    fill="var(--color-brand)"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {d.ideas.topIdea ? (
            <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm dark:border-gray-700/80">
              <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
                Top performing idea
              </h2>
              <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                Highest engagement among your published ideas
              </p>
              <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                <div className="h-28 w-full shrink-0 overflow-hidden rounded-xl bg-slate-200 sm:h-28 sm:w-36 dark:bg-slate-700">
                  {d.ideas.topIdea.media?.[0]?.thumbnailUrl ||
                  d.ideas.topIdea.media?.[0]?.cdnUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={
                        d.ideas.topIdea.media[0].thumbnailUrl ||
                        d.ideas.topIdea.media[0].cdnUrl ||
                        ''
                      }
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[var(--color-text-muted)]">
                      <Lightbulb className="h-10 w-10 opacity-40" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[var(--color-text-primary)]">
                    {d.ideas.topIdea.title}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {d.ideas.topIdea.category} · {d.ideas.topIdea.status}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-[var(--color-text-secondary)]">
                    <span className="inline-flex items-center gap-1.5">
                      <Heart className="h-4 w-4 text-red-500/90" />{' '}
                      {d.ideas.topIdea.likeCount}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Eye className="h-4 w-4 text-blue-500/90" />{' '}
                      {d.ideas.topIdea.viewCount}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MessageCircle className="h-4 w-4 text-cyan-500/90" />{' '}
                      {d.ideas.topIdea.commentCount}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[10px] text-[var(--color-text-muted)]">
                      <span>Validation score</span>
                      <span className="font-medium tabular-nums text-[var(--color-text-primary)]">
                        {Math.round(
                          Number(d.ideas.topIdea.contentScanScore ?? 0) * 100
                        )}
                        /100
                      </span>
                    </div>
                    <div className="mt-1 h-2 w-full max-w-md overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                      <div
                        className="h-full rounded-full bg-[var(--color-brand)] transition-all"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.round(
                              Number(d.ideas.topIdea.contentScanScore ?? 0) * 100
                            )
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button asChild size="sm">
                      <Link href={`/ideas/${d.ideas.topIdea._id}`}>
                        View idea
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="secondary">
                      <Link href="/my-ideas">Edit in My ideas</Link>
                    </Button>
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/ideas/${d.ideas.topIdea._id}`}>
                        <Share2 className="h-4 w-4" />
                        Share
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]/80 p-8 text-center dark:border-gray-700">
              <Lightbulb className="mx-auto h-10 w-10 text-[var(--color-text-muted)] opacity-50" />
              <p className="mt-3 font-medium text-[var(--color-text-primary)]">
                No published ideas yet
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                Publish your first idea to see performance and validation scores
                here.
              </p>
              <Button asChild className="mt-4">
                <Link href="/ideas/new">
                  <Plus className="h-4 w-4" />
                  Create an idea
                </Link>
              </Button>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm dark:border-gray-700/80">
            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
              Shortcuts
            </h2>
            <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
              Jump to key areas
            </p>
            <ul className="mt-4 space-y-1">
              <Shortcut href="/feed" icon={LayoutGrid} label="Feed" />
              <Shortcut href="/marketplace" icon={ShoppingBag} label="Marketplace" />
              <Shortcut href="/collaborations" icon={Handshake} label="Collaborations" />
              <Shortcut href="/saved" icon={Bookmark} label="Saved" />
              <Shortcut href="/notifications" icon={Bell} label="Notifications" />
              <Shortcut href="/leaderboard" icon={Trophy} label="Leaderboard" />
              <Shortcut href="/account/settings" icon={Settings} label="Account settings" />
              <Shortcut href="/pricing" icon={Sparkles} label="Plans & pricing" />
            </ul>
          </section>

          <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm dark:border-gray-700/80">
            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
              Profile
            </h2>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                <span>Profile strength</span>
                <span className="font-semibold text-[var(--color-text-primary)]">
                  {profilePct}%
                </span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${profilePct}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                {!profile.avatarUrl && 'Add an avatar. '}
                {!profile.bio?.trim() && 'Write a short bio. '}
                {!profile.skills?.length && 'Add skills. '}
                {profileScore === 3 && 'Profile looks complete.'}
              </p>
              <Link
                href="/account/settings"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-brand)] hover:underline"
              >
                <Settings className="h-4 w-4" />
                Edit profile
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm dark:border-gray-700/80">
            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
              Subscription
            </h2>
            <p className="mt-2 text-2xl font-bold capitalize text-[var(--color-text-primary)]">
              {effPlan}
            </p>
            {effPlan === 'free' ? (
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                Upgrade for unlimited ideas, marketplace listings, and more.
              </p>
            ) : (
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                {profile.subscription?.currentPeriodEnd ? (
                  <>
                    Renews{' '}
                    {format(
                      parseISO(profile.subscription.currentPeriodEnd),
                      'MMM d, yyyy'
                    )}{' '}
                    (
                    {formatDistanceToNow(
                      parseISO(profile.subscription.currentPeriodEnd),
                      { addSuffix: true }
                    )}
                    )
                  </>
                ) : (
                  'Active subscription'
                )}
              </p>
            )}
            <Button asChild variant="secondary" className="mt-4 w-full" size="sm">
              <Link href="/pricing">View plans</Link>
            </Button>
          </section>
        </aside>
      </div>

      {/* Activity + collabs */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm dark:border-gray-700/80">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
              Recent activity
            </h2>
            <Link
              href="/notifications"
              className="text-xs font-medium text-[var(--color-brand)] hover:underline"
            >
              See all
            </Link>
          </div>
          <ul className="space-y-0 divide-y divide-[var(--color-border)] dark:divide-gray-700/80">
            {d.recentActivity.length === 0 ? (
              <li className="py-8 text-center text-sm text-[var(--color-text-muted)]">
                No likes, comments, or follows yet. Keep publishing!
              </li>
            ) : (
              d.recentActivity.slice(0, 8).map((a, i) => (
                <li key={`${a.type}-${i}-${a.createdAt}`} className="flex gap-3 py-3 first:pt-0">
                  <ActivityIcon type={a.type} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-[var(--color-text-primary)]">
                      <span className="font-medium">
                        @
                        {typeof a.from === 'object' ? a.from.username : 'user'}
                      </span>{' '}
                      {a.type === 'like' && 'liked'}
                      {a.type === 'comment' && 'commented on'}
                      {a.type === 'collab' && 'sent a collaboration request for'}
                      {a.type === 'follow' && 'started following you'}
                      {a.idea
                        ? ` “${a.idea.title.slice(0, 48)}${a.idea.title.length > 48 ? '…' : ''}”`
                        : ''}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {format(new Date(a.createdAt), 'MMM d · h:mm a')}
                    </p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm dark:border-gray-700/80">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
              Collaborations
            </h2>
            <Link
              href="/collaborations"
              className="text-xs font-medium text-[var(--color-brand)] hover:underline"
            >
              Open hub
            </Link>
          </div>
          {d.collaborations.length === 0 ? (
            <p className="py-4 text-sm text-[var(--color-text-muted)]">
              No accepted collaborations yet. Send requests from idea pages or
              explore the community.
            </p>
          ) : (
            <ul className="space-y-2">
              {d.collaborations.slice(0, 6).map((c) => (
                <li key={c.idea._id}>
                  <Link
                    href={`/ideas/${c.idea._id}`}
                    className="font-medium text-[var(--color-text-primary)] hover:text-[var(--color-brand)] hover:underline"
                  >
                    {c.idea.title}
                  </Link>
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {' '}
                    · {c.role}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {d.pendingCollabRequests.length > 0 ? (
            <div className="mt-4 border-t border-[var(--color-border)] pt-4 dark:border-gray-700/80">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                Pending outgoing
              </p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {d.pendingCollabRequests.slice(0, 5).map((p) => (
                  <li key={p.idea._id + p.createdAt}>
                    <span className="text-[var(--color-text-primary)]">
                      {p.idea.title}
                    </span>{' '}
                    <span className="text-amber-600 dark:text-amber-400">
                      ({p.status})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}

function Shortcut({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof Lightbulb;
  label: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-border-light)] dark:hover:bg-white/5"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-brand-light)]/50 text-[var(--color-brand)] dark:bg-indigo-500/15 dark:text-indigo-300">
          <Icon className="h-4 w-4" />
        </span>
        <span className="font-medium">{label}</span>
        <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 opacity-40" />
      </Link>
    </li>
  );
}

function ActivityIcon({ type }: { type: string }) {
  const wrap =
    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)]';
  if (type === 'like')
    return (
      <div className={wrap}>
        <Heart className="h-4 w-4 text-red-500" />
      </div>
    );
  if (type === 'comment')
    return (
      <div className={wrap}>
        <MessageCircle className="h-4 w-4 text-cyan-500" />
      </div>
    );
  if (type === 'collab')
    return (
      <div className={wrap}>
        <Handshake className="h-4 w-4 text-amber-500" />
      </div>
    );
  return (
    <div className={wrap}>
      <Users className="h-4 w-4 text-emerald-500" />
    </div>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
  accent,
  bg,
}: {
  icon: typeof Lightbulb;
  label: string;
  value: number;
  accent: string;
  bg: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-sm dark:border-gray-700/80 sm:p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xl font-bold tabular-nums text-[var(--color-text-primary)] sm:text-2xl">
            {value.toLocaleString()}
          </p>
          <p className="truncate text-[11px] text-[var(--color-text-muted)] sm:text-xs">
            {label}
          </p>
        </div>
        <div className={cn('rounded-full p-2', bg)}>
          <Icon className={cn('h-4 w-4 sm:h-5 sm:w-5', accent)} />
        </div>
      </div>
    </div>
  );
}

function StatusPill({
  label,
  value,
  ok,
  warn,
  danger,
}: {
  label: string;
  value: number;
  ok?: boolean;
  warn?: boolean;
  danger?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-lg border px-3 py-2.5 text-center text-xs font-medium',
        ok &&
          'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950/50 dark:text-green-300',
        warn &&
          'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200',
        danger &&
          'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300',
        !ok &&
          !warn &&
          !danger &&
          'border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)]'
      )}
    >
      <div className="text-[10px] opacity-80">{label}</div>
      <div className="text-lg font-bold tabular-nums">{value}</div>
    </div>
  );
}
