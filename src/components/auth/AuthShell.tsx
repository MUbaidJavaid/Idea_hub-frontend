'use client';

import { Check } from 'lucide-react';
import type { ReactNode } from 'react';

import { LANDING_IMAGES } from '@/data/landing-media';
import { LandingImage } from '@/components/landing/LandingImage';

const PANEL_COPY = {
  login: {
    kicker: 'Welcome back',
    title: 'Sign in to',
    titleAccent: 'Idea Hub',
    subtitle: 'Access your feed, workspaces, and saved ideas.',
    image: LANDING_IMAGES.featureWorkspace,
    imageAlt: 'Idea Hub workspace for organizing and refining ideas',
    bullets: [
      'Pick up where you left off on drafts and collaborations',
      'See feedback and engagement on your published ideas',
      'Manage marketplace listings and team workspaces',
    ],
  },
  register: {
    kicker: 'Get started',
    title: 'Create your',
    titleAccent: 'account',
    subtitle: 'Join innovators sharing, refining, and launching ideas.',
    image: LANDING_IMAGES.featureNetwork,
    imageAlt: 'Idea Hub community network of builders and innovators',
    bullets: [
      'Publish ideas to the public feed or keep them private',
      'Request collaboration and grow your builder network',
      'Free to start — no credit card required',
    ],
  },
} as const;

type Variant = keyof typeof PANEL_COPY;

type Props = {
  variant: Variant;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthShell({ variant, children, footer }: Props) {
  const copy = PANEL_COPY[variant];

  return (
    <section
      className="landing-hero-mesh border-b border-slate-200/80 dark:border-slate-800"
      aria-labelledby="auth-heading"
    >
      <div className="mx-auto grid max-w-7xl lg:min-h-[calc(100vh-8rem)] lg:grid-cols-2">
        <div className="hidden flex-col justify-between border-r border-slate-200/80 bg-slate-50 p-10 dark:border-slate-800 dark:bg-slate-900/20 lg:flex xl:p-14">
          <div>
            <p className="landing-pill">Idea Hub</p>
            <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white xl:text-4xl">
              {copy.title}{' '}
              <span className="bg-gradient-to-r from-indigo-700 via-violet-700 to-emerald-700 bg-clip-text text-transparent dark:from-indigo-300 dark:via-violet-300 dark:to-emerald-300">
                {copy.titleAccent}
              </span>
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-400">
              {copy.subtitle}
            </p>
            <ul className="mt-8 space-y-3">
              {copy.bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600/10 text-brand-700 dark:bg-brand-400/15 dark:text-brand-300"
                    aria-hidden
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700/60">
            <LandingImage
              src={copy.image}
              alt={copy.imageAlt}
              className="absolute inset-0 h-full w-full"
              sizes="(max-width: 1024px) 0vw, 40vw"
            />
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 md:px-8 lg:py-14">
          <div className="w-full max-w-md">
            <p className="landing-pill">{copy.kicker}</p>
            <h1
              id="auth-heading"
              className="mt-5 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
            >
              {variant === 'login' ? 'Sign in' : 'Create account'}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {variant === 'login'
                ? 'Enter your credentials to continue.'
                : 'Fill in your details to join the community.'}
            </p>

            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700/60 dark:bg-slate-900/40 sm:p-8">
              {children}
            </div>

            <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
              {footer}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
