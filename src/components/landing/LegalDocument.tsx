import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

const RELATED = [
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/contact', label: 'Contact' },
] as const;

export type LegalPageId = 'about' | 'privacy' | 'terms' | 'contact';

function LegalRelatedNav({ current }: { current?: LegalPageId }) {
  const items = RELATED.filter((l) => {
    if (!current) return true;
    if (current === 'about' && l.href === '/about') return false;
    if (current === 'privacy' && l.href === '/privacy') return false;
    if (current === 'terms' && l.href === '/terms') return false;
    if (current === 'contact' && l.href === '/contact') return false;
    return true;
  });

  return (
    <nav
      className="not-prose mt-16 border-t border-slate-200/80 pt-10 dark:border-white/10"
      aria-label="Related pages"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Continue exploring
      </p>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="font-medium text-brand-600 underline-offset-4 transition hover:underline dark:text-indigo-400"
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/"
            className="font-medium text-slate-600 underline-offset-4 transition hover:text-brand-600 hover:underline dark:text-slate-400 dark:hover:text-indigo-300"
          >
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export function LegalDocument({
  title,
  updated,
  children,
  heroImage,
  heroDescription,
  currentPage,
  showRelated = true,
}: {
  title: string;
  updated: string;
  children: ReactNode;
  /** Optional Unsplash (or allowed CDN) URL, shown faintly behind the hero title. */
  heroImage?: string;
  /** One line under the title (visible in hero). */
  heroDescription?: string;
  currentPage?: LegalPageId;
  showRelated?: boolean;
}) {
  return (
    <div className="legal-doc">
      <section
        className="relative overflow-hidden border-b border-slate-200/70 dark:border-white/10"
        aria-labelledby="legal-doc-title"
      >
        {heroImage ? (
          <div className="pointer-events-none absolute inset-0 select-none" aria-hidden>
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              className="object-cover opacity-[0.2] saturate-[1.05] dark:opacity-[0.14]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50/95 via-white/93 to-slate-50 dark:from-slate-950/97 dark:via-slate-950/95 dark:to-slate-950" />
          </div>
        ) : (
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-100/90 via-white to-slate-50 dark:from-slate-900/50 dark:via-slate-950 dark:to-slate-950"
            aria-hidden
          />
        )}

        <div className="relative mx-auto max-w-3xl px-4 pb-12 pt-8 md:px-6 md:pb-16 md:pt-10">
          <Link
            href="/"
            className="inline-flex text-sm font-medium text-brand-600 transition hover:underline dark:text-indigo-400"
          >
            ← Back to home
          </Link>
          <h1
            id="legal-doc-title"
            className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl"
          >
            {title}
          </h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Last updated: {updated}</p>
          {heroDescription ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
              {heroDescription}
            </p>
          ) : null}
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <div
          className={[
            'prose prose-slate max-w-none dark:prose-invert',
            'prose-headings:scroll-mt-28 prose-headings:font-semibold prose-headings:tracking-tight',
            'prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-200/80 prose-h2:pb-3 prose-h2:text-xl dark:prose-h2:border-white/10',
            'prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-base',
            'prose-p:leading-[1.7] prose-p:text-slate-700 dark:prose-p:text-slate-300',
            'prose-li:my-1.5 prose-li:leading-relaxed',
            'prose-a:text-brand-600 prose-a:no-underline prose-a:font-medium hover:prose-a:underline dark:prose-a:text-indigo-400',
            'prose-strong:text-slate-900 dark:prose-strong:text-white',
          ].join(' ')}
        >
          {children}
        </div>
        {showRelated ? <LegalRelatedNav current={currentPage} /> : null}
      </article>
    </div>
  );
}
