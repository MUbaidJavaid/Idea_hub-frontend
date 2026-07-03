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
    <div className="landing-scrollbar relative min-h-screen overflow-x-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <LandingHeader />
      <main>{children}</main>
      <LandingFooter />
    </div>
  );
}
