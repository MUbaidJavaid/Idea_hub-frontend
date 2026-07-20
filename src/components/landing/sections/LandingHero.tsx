'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { LANDING_LOTTIE } from '@/data/landing-lottie';

import { LandingButton } from '../LandingButton';
import { LottiePlayer } from '../LottiePlayer';

export function LandingHero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden pt-24 md:pt-28"
      aria-labelledby="landing-hero-heading"
    >
      {/* Soft atmospheric wash — not a gradient explosion */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 70% 20%, var(--lh-accent-soft), transparent 60%), radial-gradient(ellipse 60% 40% at 10% 80%, rgba(10,10,10,0.03), transparent 55%)',
        }}
      />

      <div className="landing-container relative grid min-h-[calc(100svh-6rem)] items-center gap-10 pb-16 lg:grid-cols-[0.95fr_1.15fr] lg:gap-6 lg:pb-24">
        <div className="max-w-2xl">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="landing-display text-[clamp(2.75rem,8vw,5.5rem)] font-bold text-[var(--lh-ink)]"
          >
            Idea Hub
          </motion.p>

          <motion.h1
            id="landing-hero-heading"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="landing-display mt-6 max-w-[14ch] text-[clamp(1.75rem,4.2vw,3rem)] font-semibold text-[var(--lh-ink)]"
          >
            Where serious ideas become accountable products.
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="landing-lede mt-6"
          >
            Share privately or publicly. Collect structured feedback. Match with
            collaborators. Launch with a narrative investors trust.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <LandingButton href="/register">Start free</LandingButton>
            <LandingButton href="/feed" variant="secondary">
              Explore the feed
            </LandingButton>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--lh-muted)]"
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lh-accent)]" aria-hidden />
              Trusted by 12,000+ builders
            </span>
            <span>Free to start · No credit card</span>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex w-full items-center justify-center lg:justify-end lg:scale-110 lg:origin-center"
        >
          <LottiePlayer
            src={LANDING_LOTTIE.hero}
            className="aspect-square w-full max-w-[640px] md:max-w-[720px] lg:max-w-[780px]"
            aria-label="Abstract animation of ideas forming and connecting"
          />
        </motion.div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--lh-muted)]">
          Scroll
        </span>
        <motion.span
          className="h-8 w-px bg-[var(--lh-line)]"
          animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4], originY: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
