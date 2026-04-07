'use client';

import { MessageCircle, Rocket, Send } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { LANDING_IMAGES } from '@/data/landing-media';

import { LandingImage } from './LandingImage';

const steps = [
  {
    step: '01',
    title: 'Post your idea',
    body: 'Capture the problem, hypothesis, and constraints in one place. Attach media, set visibility, and publish when you are ready. Drafts never leave your control.',
    icon: Send,
    image: LANDING_IMAGES.stepPost,
    alt: 'Person working on a laptop in a bright workspace',
  },
  {
    step: '02',
    title: 'Get structured feedback',
    body: 'Comments, reactions, and collaboration requests roll into a single timeline. Filter noise, invite reviewers, and iterate without losing context.',
    icon: MessageCircle,
    image: LANDING_IMAGES.stepFeedback,
    alt: 'Team reviewing code and product feedback on monitors',
  },
  {
    step: '03',
    title: 'Build & launch',
    body: 'Promote validated concepts to your network, marketplace, or investor pipeline. Track engagement and double down where the signal compounds.',
    icon: Rocket,
    image: LANDING_IMAGES.stepLaunch,
    alt: 'Team celebrating success in an office environment',
  },
] as const;

export function LandingHowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section
      className="border-y border-white/10 bg-gradient-to-b from-transparent via-slate-50/80 to-transparent px-4 py-20 dark:border-white/5 dark:via-slate-950/50 md:px-6 md:py-28"
      aria-labelledby="how-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2
            id="how-heading"
            className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl"
          >
            How it works
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Three disciplined steps from first post to launch-ready narrative, designed for teams
            who cannot afford to lose the thread.
          </p>
        </motion.div>

        <ol className="mt-16 space-y-16 md:space-y-24">
          {steps.map((item, i) => (
            <motion.li
              key={item.step}
              initial={reduce ? false : { opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55 }}
              className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${i % 2 === 1 ? 'md:[&>div:first-child]:order-2' : ''}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200/80 dark:border-white/10">
                <LandingImage
                  src={item.image}
                  alt={item.alt}
                  className="absolute inset-0"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-800 dark:text-indigo-200">
                  <item.icon className="h-4 w-4" aria-hidden />
                  Step {item.step}
                </span>
                <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-slate-600 dark:text-slate-400 md:text-lg">{item.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
