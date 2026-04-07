import Link from 'next/link';

export function LandingFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/[0.03] dark:border-white/5 dark:bg-black/30">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">Idea Hub</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              The operating system for early ideas: feedback, validation, matching, and launch
              narratives, without diluting your IP or your attention.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Product</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/register" className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-indigo-300">
                  Sign up
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-indigo-300">
                  Log in
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-indigo-300">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/feed" className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-indigo-300">
                  Explore feed
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Company</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-indigo-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-indigo-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-indigo-300">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-indigo-300">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Social</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="https://twitter.com/ideahub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-indigo-300"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/ideahub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-indigo-300"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-slate-500 dark:border-white/5">
          © {new Date().getFullYear()} Idea Hub Inc. · All rights reserved.
        </p>
      </div>
    </footer>
  );
}
