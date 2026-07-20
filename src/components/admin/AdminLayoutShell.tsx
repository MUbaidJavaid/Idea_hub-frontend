'use client';

import { AdminSidebar } from '@/components/layout/AdminSidebar';

import { AdminThemeProvider } from './AdminThemeContext';
import { AdminTopBar } from './AdminTopBar';

function ShellInner({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full min-w-0 bg-[var(--lh-bg)] text-[var(--lh-ink)] antialiased transition-colors duration-300">
      <AdminTopBar />
      <div className="min-h-0 min-w-0 pt-14">
        <AdminSidebar />
        <main className="min-h-[calc(100dvh-3.5rem)] w-full min-w-0 max-w-full bg-[var(--lh-bg)] pl-0 md:pl-72">
          <div className="mx-auto h-full w-full min-w-0 max-w-[min(100%,1920px)] px-4 py-5 sm:px-5 md:px-8 md:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export function AdminLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminThemeProvider>
      <ShellInner>{children}</ShellInner>
    </AdminThemeProvider>
  );
}
