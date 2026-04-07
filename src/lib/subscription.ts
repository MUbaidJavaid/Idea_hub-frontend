import type { IUser } from '@/types/api';

/** Mirrors `api.ideahub.com/src/lib/subscription.ts` getEffectivePlan — keep in sync. */
export type EffectivePlan = 'free' | 'pro' | 'investor';

export function getEffectivePlan(user: IUser | null | undefined): EffectivePlan {
  if (!user) return 'free';
  if (user.role === 'moderator' || user.role === 'super_admin') {
    return 'investor';
  }
  const sub = user.subscription;
  if (!sub || sub.plan === 'free') return 'free';
  if (sub.status === 'expired') return 'free';
  const end = sub.currentPeriodEnd;
  if (!end || new Date(end).getTime() <= Date.now()) return 'free';
  if (sub.plan === 'pro' || sub.plan === 'investor') return sub.plan;
  return 'free';
}

export function canCreateMarketplaceListing(
  user: IUser | null | undefined
): boolean {
  const p = getEffectivePlan(user);
  return p === 'pro' || p === 'investor';
}
