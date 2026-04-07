'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { useAnimatedCounter } from './useAnimatedCounter';

const stats = [
  { label: 'Ideas shared', value: 24891, suffix: '+' },
  { label: 'Active members', value: 8432, suffix: '' },
  { label: 'Successfully launched', value: 1204, suffix: '' },
] as const;

export function LandingStatsBar() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative border-y border-white/10 bg-white/40 px-4 py-10 backdrop-blur-md dark:border-white/5 dark:bg-slate-950/40 md:px-6"
      aria-label="Platform statistics"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
        {stats.map((s, i) => (
          <StatItem key={s.label} target={s.value} suffix={s.suffix} label={s.label} index={i} reduce={reduce} />
        ))}
      </div>
    </section>
  );
}

function StatItem({
  target,
  suffix,
  label,
  index,
  reduce,
}: {
  target: number;
  suffix: string;
  label: string;
  index: number;
  reduce: boolean | null;
}) {
  const { ref, value } = useAnimatedCounter(target, { duration: 2.4 });

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="text-center"
    >
      <p
        ref={ref}
        className="text-4xl font-bold tabular-nums tracking-tight text-slate-900 dark:text-white md:text-5xl"
      >
        {value.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <div className="mx-auto mt-4 h-px max-w-[120px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent dark:via-indigo-400/40" />
    </motion.div>
  );
}
