'use client';

import { ArrowUpRight, MessageCircle, ThumbsUp } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { LANDING_IMAGES } from '@/data/landing-media';

import { LandingImage } from './LandingImage';

const ideas = [
  {
    title: 'Closed-loop battery recovery for urban grids',
    description:
      'Hardware-agnostic diagnostics plus a marketplace for second-life cells, targeting EU CSRD reporting gaps.',
    upvotes: 842,
    comments: 126,
    image: LANDING_IMAGES.trendGreen,
    alt: 'Wind turbines and sustainable energy landscape',
  },
  {
    title: 'Copilot for compliance-heavy API docs',
    description:
      'LLM layer that diffs your OpenAPI spec against SOC2 control language: fewer security review cycles.',
    upvotes: 1203,
    comments: 89,
    image: LANDING_IMAGES.trendAi,
    alt: 'Futuristic technology and AI concept',
  },
  {
    title: 'Revenue share for micro-creator collectives',
    description:
      'Transparent splits, dispute resolution, and tax reporting for 5–50 person creator pods.',
    upvotes: 567,
    comments: 214,
    image: LANDING_IMAGES.trendCreator,
    alt: 'Creator workspace with content production tools',
  },
] as const;

export function LandingTrendingIdeas() {
  const reduce = useReducedMotion();

  return (
    <section
      className="px-4 py-20 md:px-6 md:py-28"
      aria-labelledby="trending-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <h2
              id="trending-heading"
              className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl"
            >
              Trending on Idea Hub
            </h2>
            <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-400">
              Representative snapshots from the feed: real categories our community discusses:
              climate, AI infrastructure, and the creator economy.
            </p>
          </div>
          <a
            href="/feed"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline dark:text-indigo-400"
          >
            Open full feed
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>

        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {ideas.map((idea, i) => (
            <motion.li
              key={idea.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={reduce ? undefined : { y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-md transition-colors duration-300 hover:border-brand-400/50 dark:border-white/10 dark:bg-slate-900/55 dark:hover:border-indigo-400/45"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <LandingImage
                  src={idea.image}
                  alt={idea.alt}
                  className="absolute inset-0"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-90 transition group-hover:opacity-100" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold leading-snug text-slate-900 dark:text-white">
                  {idea.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
                  {idea.description}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <ThumbsUp className="h-3.5 w-3.5 text-brand-500" aria-hidden />
                    {idea.upvotes.toLocaleString()}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MessageCircle className="h-3.5 w-3.5 text-slate-400" aria-hidden />
                    {idea.comments}
                  </span>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
