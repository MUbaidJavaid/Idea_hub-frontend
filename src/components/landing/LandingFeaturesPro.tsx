'use client';

import { LayoutGrid, Lock, Sparkles, Users } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { LANDING_IMAGES } from '@/data/landing-media';

import { LandingImage } from './LandingImage';

const cards = [
  {
    title: 'Collaborative feedback',
    body: 'Structured threads, mentions, and visibility controls so critique stays actionable, not performative. Your early drafts deserve the same rigor as your launch posts.',
    icon: Users,
    image: LANDING_IMAGES.featureWhiteboard,
    alt: 'Team at a whiteboard during a product planning session',
  },
  {
    title: 'AI validation score',
    body: 'Multi-modal scanning surfaces risk, clarity, and policy flags before you go wide. Use it as a compass, not a verdict: your judgment still leads.',
    icon: Sparkles,
    image: LANDING_IMAGES.featureAi,
    alt: 'Abstract visualization suggesting AI analysis and data',
  },
  {
    title: 'Founder matching',
    body: 'Collaboration requests, investor-facing profiles, and discovery tuned for intent, not vanity metrics. Find people who want the problem you are solving.',
    icon: LayoutGrid,
    image: LANDING_IMAGES.featureNetwork,
    alt: 'Professionals networking at a conference',
  },
  {
    title: 'Public & private workspaces',
    body: 'Draft in private, share with collaborators only, or publish to the open feed. One workspace; clear boundaries for IP, experiments, and launch timing.',
    icon: Lock,
    image: LANDING_IMAGES.featureWorkspace,
    alt: 'Laptop on a desk showing a dashboard interface',
  },
] as const;

export function LandingFeaturesPro() {
  const reduce = useReducedMotion();

  return (
    <section
      id="features"
      className="scroll-mt-24 px-4 py-20 md:px-6 md:py-28"
      aria-labelledby="features-pro-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2
            id="features-pro-heading"
            className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl lg:text-5xl"
          >
            Infrastructure for serious ideation
          </h2>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-400">
            Four capabilities that separate a hobby board from a platform you can run a company on:
            feedback, validation signal, matching, and governance at every visibility level.
          </p>
        </motion.div>

        <ul className="mt-16 grid gap-8 md:grid-cols-2 lg:gap-10">
          {cards.map((card, i) => (
            <motion.li
              key={card.title}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/60 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-brand-400/50 dark:border-white/10 dark:bg-slate-900/45 dark:hover:border-indigo-400/40"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <LandingImage
                  src={card.image}
                  alt={card.alt}
                  className="absolute inset-0 h-full w-full"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
              </div>
              <div className="relative p-6 md:p-8">
                <div className="mb-4 inline-flex rounded-xl border border-brand-500/15 bg-brand-500/10 p-3 text-brand-700 dark:border-indigo-400/20 dark:bg-indigo-500/15 dark:text-indigo-200">
                  <card.icon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white md:text-2xl">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
                  {card.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
