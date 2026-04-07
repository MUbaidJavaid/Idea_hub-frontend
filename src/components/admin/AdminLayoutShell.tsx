'use client';

import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { cn } from '@/components/ui/cn';

import { AdminThemeProvider, useAdminTheme } from './AdminThemeContext';
import { AdminTopBar } from './AdminTopBar';

function ShellInner({ children }: { children: React.ReactNode }) {
  const { isLight } = useAdminTheme();

  return (
    <div
      className={cn(
        'min-h-screen w-full min-w-0 antialiased transition-colors duration-300',
        isLight
          ? 'bg-[#f0f4fa] text-slate-900'
          : 'bg-[#070d16] text-slate-100'
      )}
    >
      <AdminTopBar />
      <div className="min-h-0 min-w-0 pt-14">
        <AdminSidebar />
        <main
          className={cn(
            'min-h-[calc(100dvh-3.5rem)] w-full min-w-0 max-w-full pl-0 md:pl-72',
            isLight ? 'bg-[#f0f4fa]' : 'bg-[#070d16]'
          )}
        >
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
