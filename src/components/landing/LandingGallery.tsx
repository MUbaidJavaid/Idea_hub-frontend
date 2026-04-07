'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { LANDING_IMAGES } from '@/data/landing-media';

import { LandingImage } from './LandingImage';

const shots = [
  { src: LANDING_IMAGES.gallery1, alt: 'Hackathon participants collaborating at laptops', caption: 'Annual build weekend · Berlin' },
  { src: LANDING_IMAGES.gallery2, alt: 'Conference audience at a tech meetup', caption: 'Founder summit · Singapore' },
  { src: LANDING_IMAGES.gallery3, alt: 'Friends or teammates talking in a circle', caption: 'Community roundtable · Austin' },
  { src: LANDING_IMAGES.gallery4, alt: 'Business team celebrating in office', caption: 'Launch retrospective · Toronto' },
  { src: LANDING_IMAGES.gallery5, alt: 'Rocket launch metaphor for product release', caption: 'Release day livestream' },
  { src: LANDING_IMAGES.gallery6, alt: 'Modern open office workspace', caption: 'HQ coworking hours · Remote-first' },
] as const;

export function LandingGallery() {
  const reduce = useReducedMotion();

  return (
    <section
      className="border-t border-slate-200/70 bg-slate-50/40 px-4 py-20 dark:border-white/5 dark:bg-transparent md:px-6 md:py-28"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2
            id="gallery-heading"
            className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl"
          >
            Community in motion
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
            Meetups, sprints, and launches from the Idea Hub ecosystem: proof that distributed teams
            can still move like a single product org.
          </p>
        </motion.div>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {shots.map((shot, i) => (
            <motion.li
              key={shot.src}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.05 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/10"
            >
              <LandingImage
                src={shot.src}
                alt={shot.alt}
                className="absolute inset-0 h-full w-full"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent opacity-90 transition group-hover:opacity-100" />
              <p className="absolute bottom-0 left-0 right-0 p-3 text-[11px] font-medium text-white/95 sm:text-xs">
                {shot.caption}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
