'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { LANDING_IMAGES } from '@/data/landing-media';

import { LandingImage } from './LandingImage';

function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 36 }).map((_, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-indigo-400/25 dark:bg-indigo-300/20"
          style={{
            left: `${(i * 13.7) % 100}%`,
            top: `${(i * 17.3) % 100}%`,
            animation: `landing-float ${8 + (i % 5)}s ease-in-out infinite`,
            animationDelay: `${(i % 10) * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}

export function LandingHeroPro() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 56]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.5], [1, 0.35]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 pb-20 pt-8 md:px-6 md:pb-28 md:pt-12 lg:pb-36"
      aria-labelledby="landing-hero-heading"
    >
      {/* Photography layer: low opacity so headline stays readable */}
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden>
        <Image
          src={LANDING_IMAGES.heroTeam}
          alt=""
          fill
          priority
          className="object-cover opacity-[0.14] saturate-[1.05] dark:opacity-[0.09]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/93 via-white/88 to-slate-50 dark:from-slate-950/96 dark:via-slate-950/94 dark:to-slate-950" />
      </div>

      <motion.div
        style={{ opacity: opacityBg }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-30%,rgba(99,102,241,0.22),transparent_55%),radial-gradient(ellipse_80%_50%_at_100%_0%,rgba(16,185,129,0.08),transparent)] dark:bg-[radial-gradient(ellipse_120%_80%_at_50%_-30%,rgba(129,140,248,0.18),transparent_55%),radial-gradient(ellipse_80%_50%_at_100%_0%,rgba(52,211,153,0.08),transparent)]"
      />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-35 dark:opacity-20"
        animate={
          reduce
            ? undefined
            : {
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage:
            'linear-gradient(120deg, rgba(79,70,229,0.12) 0%, transparent 45%, rgba(16,185,129,0.08) 100%)',
          backgroundSize: '200% 200%',
        }}
      />
      <Particles />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <div className="max-w-xl lg:max-w-none">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center rounded-full border border-indigo-500/25 bg-white/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-800 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-indigo-200 md:text-xs"
          >
            Social platform · Ideas · Collaboration
          </motion.p>
          <motion.h1
            id="landing-hero-heading"
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 dark:text-white sm:text-5xl xl:text-[3.5rem] xl:leading-[1.05]"
          >
            Turn Your Spark Into a{' '}
            <span className="bg-gradient-to-r from-indigo-700 via-violet-700 to-emerald-700 bg-clip-text text-transparent dark:from-indigo-300 dark:via-violet-300 dark:to-emerald-300">
              Movement
            </span>
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300 md:text-xl"
          >
            Join <strong className="font-semibold text-slate-900 dark:text-white">12,000+</strong>{' '}
            innovators sharing, refining, and launching ideas daily. Idea Hub is where raw concepts
            meet constructive feedback, aligned collaborators, and the signal you need before you
            bet the quarter on the wrong build. Public feeds, private workspaces, collaboration
            requests, and marketplace listings live in one place so your story does not fragment
            across tools.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Link
              href="/register"
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-gradient-to-r from-brand-600 to-violet-600 px-8 py-3.5 text-center text-sm font-bold text-white ring-1 ring-indigo-500/30 transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:ring-indigo-400/30"
            >
              Start Sharing
            </Link>
            <Link
              href="/feed"
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-slate-300/90 bg-white/90 px-8 py-3.5 text-center text-sm font-semibold text-slate-900 backdrop-blur-sm transition hover:border-indigo-400/50 hover:bg-white dark:border-white/15 dark:bg-slate-900/60 dark:text-white dark:hover:bg-slate-900/80"
            >
              Explore Ideas
            </Link>
          </motion.div>
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-6 text-sm text-slate-600 dark:text-slate-400"
          >
            Free to start · No credit card · Built for founders, researchers, and operators who
            think in public
          </motion.p>
        </div>

        <motion.div
          style={{ y }}
          className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200/80 ring-1 ring-slate-900/5 dark:border-white/10 dark:ring-white/10"
          >
            <LandingImage
              src={LANDING_IMAGES.heroTeam}
              alt="Diverse product team collaborating around a table in a modern office"
              className="absolute inset-0 h-full w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent dark:from-slate-950/55" />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/25 bg-black/35 p-4 backdrop-blur-md">
              <p className="text-xs font-medium text-white/95 md:text-sm">
                “We shipped our MVP narrative in two weeks, entirely from threads on Idea Hub.”
              </p>
              <p className="mt-1 text-[10px] text-white/75 md:text-xs">
                Product lead, B2B SaaS · verified member
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
