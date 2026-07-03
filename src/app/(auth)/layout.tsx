import { LandingFooter } from '@/components/landing/LandingFooter';
import { LandingHeader } from '@/components/landing/LandingHeader';

export default function AuthLayout({
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
