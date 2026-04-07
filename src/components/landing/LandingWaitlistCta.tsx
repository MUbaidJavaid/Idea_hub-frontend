'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function LandingWaitlistCta() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error('Enter a valid work email.');
      return;
    }
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setEmail('');
      toast.success('You are on the list. We will only email product and launch updates.');
    }, 600);
  }

  return (
    <section
      className="px-4 pb-24 pt-4 md:px-6 md:pb-32"
      aria-labelledby="waitlist-heading"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/25 bg-gradient-to-br from-slate-900 via-brand-900 to-violet-950 p-px dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950"
      >
        <div className="rounded-[calc(2rem-1px)] bg-gradient-to-br from-brand-600/90 via-violet-700/95 to-indigo-900 px-6 py-12 text-center md:px-12 md:py-16">
          <h2
            id="waitlist-heading"
            className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl"
          >
            Ready to shape the future?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/85 md:text-base">
            Get early access to enterprise workspaces, investor digests, and API hooks, reserved for
            teams scaling on Idea Hub.
          </p>
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row sm:items-stretch"
            noValidate
          >
            <label htmlFor="waitlist-email" className="sr-only">
              Work email
            </label>
            <input
              id="waitlist-email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="min-h-[52px] flex-1 rounded-xl border border-white/25 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 backdrop-blur-md focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
              type="submit"
              disabled={busy}
              className="min-h-[52px] rounded-xl bg-white px-8 text-sm font-bold text-brand-800 ring-1 ring-white/20 transition hover:bg-slate-50 disabled:opacity-60"
            >
              {busy ? 'Joining…' : 'Join waitlist'}
            </button>
          </form>
          <p className="mt-4 text-xs text-white/70">No spam, only launch and roadmap updates.</p>
        </div>
      </motion.div>
    </section>
  );
}
