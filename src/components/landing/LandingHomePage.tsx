'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuthStore } from '@/store/authStore';

import { LandingAiCapabilities } from './sections/LandingAiCapabilities';
import { LandingFaq } from './sections/LandingFaq';
import { LandingFeatures } from './sections/LandingFeatures';
import { LandingFinalCta } from './sections/LandingFinalCta';
import { LandingHero } from './sections/LandingHero';
import { LandingPricing } from './sections/LandingPricing';
import { LandingProblem } from './sections/LandingProblem';
import { LandingProductPreview } from './sections/LandingProductPreview';
import { LandingSolution } from './sections/LandingSolution';
import { LandingStats } from './sections/LandingStats';
import { LandingTestimonials } from './sections/LandingTestimonials';
import { LandingTrustedBy } from './sections/LandingTrustedBy';
import { LandingWorkflow } from './sections/LandingWorkflow';

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
