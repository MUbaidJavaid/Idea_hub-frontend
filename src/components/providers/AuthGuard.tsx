'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';

import { Spinner } from '@/components/ui/Spinner';
import { useAuthStore } from '@/store/authStore';

export function AuthGuard({
  children,
  roles,
}: {
  children: ReactNode;
  roles?: Array<'user' | 'collaborator' | 'moderator' | 'super_admin'>;
}) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    if (roles?.length && user && !roles.includes(user.role)) {
      router.replace('/feed');
    }
  }, [isAuthenticated, roles, router, user]);

  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (roles?.length && !roles.includes(user.role)) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-[var(--text-muted)]">
        Access denied
      </div>
    );
  }

  return <>{children}</>;
}
