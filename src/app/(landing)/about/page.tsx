import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { LegalDocument } from '@/components/landing/LegalDocument';
import { LANDING_IMAGES } from '@/data/landing-media';

export const metadata: Metadata = {
  title: 'About | Idea Hub',
  description:
    'Mission, vision, team, and roadmap: how Idea Hub democratizes innovation for builders worldwide.',
};

const team = [
  {
    name: 'Daniel Okoro',
    role: 'CEO & Co-founder',
    bio: 'Former product lead at two B2B unicorns; obsessed with feedback loops between builders and capital.',
    photo: LANDING_IMAGES.aboutTeam1,
  },
  {
    name: 'Sarah Lindqvist',
    role: 'CTO & Co-founder',
    bio: 'Distributed systems and trust & safety background; previously scaled realtime infra to 50M MAU.',
    photo: LANDING_IMAGES.aboutTeam2,
  },
  {
    name: 'Michael Torres',
    role: 'Head of Community',
    bio: 'Built creator programs at major platforms; ensures Idea Hub stays constructive under growth.',
    photo: LANDING_IMAGES.aboutTeam3,
  },
  {
    name: 'Yuki Tanaka',
    role: 'Head of Design',
    bio: 'Information architecture for complex workflows; led design systems for global SaaS products.',
    photo: LANDING_IMAGES.aboutTeam4,
  },
] as const;

const timeline = [
  {
    year: '2022',
    title: 'Prototype & closed alpha',
    detail:
      'Interviewed hundreds of founders and researchers. Ran a closed alpha with design partners to validate posting, commenting, and lightweight validation workflows before opening the network.',
  },
  {
    year: '2023',
    title: 'Public beta',
    detail:
      'Launched the public feed, collaboration requests, reputation signals, and a first-pass moderation stack so conversations stayed high-signal as volume grew.',
  },
  {
    year: '2024',
    title: 'Enterprise pilots',
    detail:
      'SOC 2 readiness, private workspaces for innovation labs, and APIs for portfolio review, without turning the consumer product into a clunky enterprise suite.',
  },
  {
    year: '2025',
    title: 'Scale & marketplace',
    detail:
      'Expanded payouts for the creator economy, regional hosting options, and tooling for investors and accelerators to discover ideas with consent-based visibility.',
  },
  {
    year: '2026',
    title: 'Global expansion',
    detail:
      'Localized policy packs, deeper integrations with design and dev tools, and a partner ecosystem for education and nonprofit innovation programs.',
  },
] as const;

export default function AboutPage() {
  return (
    <LegalDocument
      title="About Idea Hub"
      updated="April 6, 2026"
      heroImage={LANDING_IMAGES.legalHeroAbout}
      currentPage="about"
      heroDescription="We are building the place where rough concepts meet honest feedback, aligned collaborators, and launch-ready clarity, before a slide deck locks you in."
    >
      <h2>Mission</h2>
      <p className="!mt-0 text-lg font-medium leading-relaxed text-slate-800 dark:text-slate-100 md:text-xl">
        Democratize innovation by connecting raw ideas with real builders, capital, and accountability, without
        forcing every concept into a pitch deck before its time.
      </p>
      <p>
        Most ideas fail quietly: not because they were bad, but because the right people never saw them at
        the right moment. Idea Hub exists to shorten that distance, publicly or privately, so momentum can
        compound while you still have room to pivot.
      </p>

      <h2>Vision</h2>
      <p>
        A world where no great idea dies unnoticed—not because every idea succeeds, but because the right
        people can find it, stress-test it, and carry it forward while the window of opportunity is still
        open.
      </p>
      <p>
        We imagine a network that feels as serious as LinkedIn for careers and as alive as the best creative
        communities, without the noise of generic social feeds or the gatekeeping of closed innovation silos.
      </p>

      <h2>Who we serve</h2>
      <ul>
        <li>
          <strong>Founders &amp; indie builders</strong> who want structured feedback before they commit
          runway, hire, or raise.
        </li>
        <li>
          <strong>Product designers, engineers, and researchers</strong> who enjoy sharpening concepts and
          spotting patterns across domains.
        </li>
        <li>
          <strong>Accelerators, studios, and enterprise innovation teams</strong> who need visibility into
          early thinking—with permissions and workspaces that match how they already work (
          <Link href="/contact">talk to us</Link> about pilots).
        </li>
      </ul>

      <h2>What we believe</h2>
      <ul>
        <li>Transparency beats stealth when you are hunting for aligned collaborators.</li>
        <li>Moderation and clear rules beat growth-at-all-costs when you want institutional trust.</li>
        <li>Founders deserve signal, not vanity metrics, before they commit runway.</li>
        <li>
          Your ideas stay yours: we design defaults so visibility is intentional, and{' '}
          <Link href="/privacy">privacy</Link> is explainable in plain language.
        </li>
      </ul>

      <h2>How we are different</h2>
      <p>
        Idea Hub is not a generic forum and not a slide repository. Posts are structured for critique:
        context, constraints, and “what would change your mind” prompts, so feedback is actionable, not
        performative. Matching and validation tools sit on top of that signal, instead of replacing it with
        opaque scores alone.
      </p>

      <h2>Leadership</h2>
      <p>
        We are a distributed company with hubs in North America and Europe. Below are representative
        leaders; full org charts are shared with enterprise customers under NDA.
      </p>
      <ul className="not-prose mt-8 grid gap-6 sm:grid-cols-2">
        {team.map((m) => (
          <li
            key={m.name}
            className="flex gap-4 rounded-xl border border-slate-200/80 bg-white/50 p-5 dark:border-white/10 dark:bg-slate-900/25"
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
              <Image src={m.photo} alt={m.name} fill className="object-cover" sizes="80px" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-slate-900 dark:text-white">{m.name}</p>
              <p className="text-sm text-brand-700 dark:text-indigo-300">{m.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{m.bio}</p>
            </div>
          </li>
        ))}
      </ul>

      <h2>Roadmap snapshot</h2>
      <p>
        Dates are directional; we ship in slices and publish changelog-style updates to the product. See
        also our <Link href="/terms">Terms</Link> for how features may evolve.
      </p>
      <ol className="not-prose mt-10 space-y-10 border-l border-slate-200 pl-8 dark:border-white/10">
        {timeline.map((t) => (
          <li key={t.year} className="relative -ml-px">
            <span
              className="absolute -left-[33px] top-1.5 h-3 w-3 rounded-full border-2 border-brand-500 bg-white dark:border-indigo-400 dark:bg-slate-950"
              aria-hidden
            />
            <p className="text-sm font-bold text-brand-700 dark:text-indigo-300">{t.year}</p>
            <p className="font-semibold text-slate-900 dark:text-white">{t.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{t.detail}</p>
          </li>
        ))}
      </ol>

      <h2>Contact</h2>
      <p>
        Press, partnerships, and enterprise procurement:{' '}
        <a href="mailto:hello@ideahub.com">hello@ideahub.com</a>
        <br />
        Privacy requests: <a href="mailto:privacy@ideahub.com">privacy@ideahub.com</a>
        <br />
        General questions: <Link href="/contact">Contact page</Link>
      </p>
    </LegalDocument>
  );
}
