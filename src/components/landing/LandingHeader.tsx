'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Lightbulb, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { LandingThemeToggle } from './LandingThemeToggle';

const nav = [
  { href: '/#features', label: 'Features' },
  { href: '/#how-heading', label: 'How it works' },
  { href: '/#trending-heading', label: 'Trending' },
  { href: '/#community', label: 'Stories' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
];

function LogoMark() {
  return (
    <span
      className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400/20 ring-2 ring-amber-400/50 dark:bg-amber-400/15 dark:ring-amber-300/40"
      aria-hidden
    >
      <span className="absolute inset-0 rounded-xl bg-amber-400/25 blur-md dark:bg-amber-300/20" />
      <Lightbulb
        className="relative h-[1.15rem] w-[1.15rem] text-amber-500 dark:text-amber-300"
        strokeWidth={2.25}
      />
    </span>
  );
}

export function LandingHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="landing-scrollbar sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-white/5 dark:bg-slate-950/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 transition hover:text-brand-700 dark:text-white dark:hover:text-indigo-300"
        >
          <LogoMark />
          <span>Idea Hub</span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:gap-3 lg:flex">
          <LandingThemeToggle className="h-10 w-10" />
          <Link
            href="/login"
            className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 px-4 py-2 text-sm font-bold text-white ring-1 ring-indigo-600/40 transition hover:brightness-105 dark:ring-indigo-400/35"
          >
            Sign up
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LandingThemeToggle className="h-9 w-9" />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/90 text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-950/60 backdrop-blur-sm xl:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="absolute right-0 top-0 flex h-full w-[min(100%,380px)] flex-col border-l border-white/10 bg-white dark:bg-slate-950"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-white/10">
                <span className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <LogoMark />
                  Menu
                </span>
                <button
                  type="button"
                  className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="flex-1 overflow-y-auto p-4">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-white/5"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="border-t border-slate-200 p-4 dark:border-white/10">
                <Link
                  href="/register"
                  className="flex min-h-[48px] items-center justify-center rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 font-bold text-white ring-1 ring-indigo-600/40"
                  onClick={() => setOpen(false)}
                >
                  Sign up
                </Link>
                <Link
                  href="/login"
                  className="mt-2 flex min-h-[48px] items-center justify-center rounded-xl border border-slate-200 font-semibold text-slate-800 dark:border-white/15 dark:text-white"
                  onClick={() => setOpen(false)}
                >
                  Log in
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
