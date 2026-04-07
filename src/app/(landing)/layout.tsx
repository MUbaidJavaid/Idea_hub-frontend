import type { Metadata } from 'next';

import { LandingFooter } from '@/components/landing/LandingFooter';
import { LandingHeader } from '@/components/landing/LandingHeader';

export const metadata: Metadata = {
  title: 'Idea Hub | Share ideas that matter',
  description:
    'The social platform for ideas: share concepts, collaborate, and grow with a community of builders and innovators.',
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="landing-scrollbar min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 transition-colors duration-300 dark:from-slate-950 dark:via-slate-950 dark:to-black dark:text-slate-100">
      <LandingHeader />
      <main>{children}</main>
      <LandingFooter />
    </div>
  );
}
