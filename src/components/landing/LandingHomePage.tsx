'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuthStore } from '@/store/authStore';

import { LandingFeaturesPro } from './LandingFeaturesPro';
import { LandingGallery } from './LandingGallery';
import { LandingHeroPro } from './LandingHeroPro';
import { LandingHowItWorks } from './LandingHowItWorks';
import { LandingStatsBar } from './LandingStatsBar';
import { LandingTrendingIdeas } from './LandingTrendingIdeas';
import { LandingWaitlistCta } from './LandingWaitlistCta';
import { TestimonialsPro } from './TestimonialsPro';

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
      <div className="flex min-h-[40vh] items-center justify-center px-4 text-sm text-slate-500 dark:text-slate-400">
        Redirecting to your feed…
      </div>
    );
  }

  return (
    <>
      <LandingHeroPro />
      <LandingStatsBar />
      <LandingFeaturesPro />
      <LandingHowItWorks />
      <LandingTrendingIdeas />
      <TestimonialsPro />
      <LandingGallery />
      <LandingWaitlistCta />
    </>
  );
}
