'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuthStore } from '@/store/authStore';

import { LandingHero } from './sections/LandingHero';

const sectionFallback = () => (
  <div className="landing-section min-h-[12rem]" aria-hidden />
);

const LandingTrustedBy = dynamic(
  () =>
    import('./sections/LandingTrustedBy').then((m) => ({
      default: m.LandingTrustedBy,
    })),
  { loading: sectionFallback }
);
const LandingProblem = dynamic(
  () =>
    import('./sections/LandingProblem').then((m) => ({
      default: m.LandingProblem,
    })),
  { loading: sectionFallback }
);
const LandingSolution = dynamic(
  () =>
    import('./sections/LandingSolution').then((m) => ({
      default: m.LandingSolution,
    })),
  { loading: sectionFallback }
);
const LandingWorkflow = dynamic(
  () =>
    import('./sections/LandingWorkflow').then((m) => ({
      default: m.LandingWorkflow,
    })),
  { loading: sectionFallback }
);
const LandingFeatures = dynamic(
  () =>
    import('./sections/LandingFeatures').then((m) => ({
      default: m.LandingFeatures,
    })),
  { loading: sectionFallback }
);
const LandingAiCapabilities = dynamic(
  () =>
    import('./sections/LandingAiCapabilities').then((m) => ({
      default: m.LandingAiCapabilities,
    })),
  { loading: sectionFallback }
);
const LandingProductPreview = dynamic(
  () =>
    import('./sections/LandingProductPreview').then((m) => ({
      default: m.LandingProductPreview,
    })),
  { loading: sectionFallback }
);
const LandingStats = dynamic(
  () =>
    import('./sections/LandingStats').then((m) => ({
      default: m.LandingStats,
    })),
  { loading: sectionFallback }
);
const LandingTestimonials = dynamic(
  () =>
    import('./sections/LandingTestimonials').then((m) => ({
      default: m.LandingTestimonials,
    })),
  { loading: sectionFallback }
);
const LandingPricing = dynamic(
  () =>
    import('./sections/LandingPricing').then((m) => ({
      default: m.LandingPricing,
    })),
  { loading: sectionFallback }
);
const LandingFaq = dynamic(
  () =>
    import('./sections/LandingFaq').then((m) => ({ default: m.LandingFaq })),
  { loading: sectionFallback }
);
const LandingFinalCta = dynamic(
  () =>
    import('./sections/LandingFinalCta').then((m) => ({
      default: m.LandingFinalCta,
    })),
  { loading: sectionFallback }
);

export function LandingHomePage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/feed');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4 text-sm text-[var(--lh-muted)]">
        Redirecting to your feed…
      </div>
    );
  }

  return (
    <>
      <LandingHero />
      <LandingTrustedBy />
      <LandingProblem />
      <LandingSolution />
      <LandingWorkflow />
      <LandingFeatures />
      <LandingAiCapabilities />
      <LandingProductPreview />
      <LandingStats />
      <LandingTestimonials />
      <LandingPricing />
      <LandingFaq />
      <LandingFinalCta />
    </>
  );
}
