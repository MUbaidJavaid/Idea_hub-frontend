'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { useTrendingIdeas } from '@/hooks/useIdeas';
import { useIsDesktopModal } from '@/hooks/useMediaQuery';
import { resolveAuthor } from '@/lib/author';
import { ICONS } from '@/lib/icons';
import { pushWithViewTransition } from '@/lib/viewTransitions';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';
import type { IIdea } from '@/types/api';

function firstImage(idea: IIdea): string | null {
  for (const m of idea.media ?? []) {
    if (m.mediaType === 'image' || m.mediaType === 'video') {
      return m.thumbnailUrl || m.cdnUrl || m.firebaseUrl || null;
    }
  }
  return null;
}

export function StoriesBar() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const openCreate = useUiStore((s) => s.openCreateIdea);
  const { data: trending, isLoading } = useTrendingIdeas();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktopModal();

  const items = (trending ?? []).slice(0, 8);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 200, behavior: 'smooth' });
  };

  return (
    <div className="relative mb-4">
      {isDesktop ? (
        <>
          <button
            type="button"
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-[var(--border)] bg-[var(--surface)] p-2 shadow-md md:block dark:bg-[#18191a]"
            onClick={() => scrollBy(-1)}
          >
            <ICONS.back size={18} />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-[var(--border)] bg-[var(--surface)] p-2 shadow-md md:block dark:bg-[#18191a]"
            onClick={() => scrollBy(1)}
          >
            <ICONS.next size={18} />
          </button>
        </>
      ) : null}

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-1 py-2 md:px-10"
      >
        {user ? (
          <button
            type="button"
            className="flex w-[76px] shrink-0 flex-col items-center gap-1.5"
            onClick={() => openCreate('none')}
          >
            <div className="story-border-spin relative rounded-full p-[3px]">
              <div className="story-border-spin-inner flex h-[68px] w-[68px] items-center justify-center bg-[var(--surface)] dark:bg-[#18191a]">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand to-accent text-white shadow-inner">
                  <ICONS.post size={24} strokeWidth={2} />
                </span>
              </div>
            </div>
            <span className="max-w-[76px] truncate text-center text-[11px] font-medium text-[var(--text)]">
              Add Idea
            </span>
          </button>
        ) : null}

        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex w-[76px] shrink-0 flex-col items-center gap-1.5"
              >
                <div className="h-[68px] w-[68px] animate-skeleton-pulse rounded-full bg-surface2 dark:bg-[#242526]" />
                <div className="h-3 w-12 animate-skeleton-pulse rounded bg-surface2" />
              </div>
            ))
          : items.map((idea) => {
              const author = resolveAuthor(idea.authorId);
              const img = firstImage(idea);
              const label = (author?.username ?? 'Idea').slice(0, 10);
              return (
                <Link
                  key={idea._id}
                  href={`/ideas/${idea._id}`}
                  onClick={(e) => {
                    if (!isDesktop) {
                      e.preventDefault();
                      pushWithViewTransition(router, `/ideas/${idea._id}`);
                    }
                  }}
                  scroll={false}
                  className="flex w-[76px] shrink-0 flex-col items-center gap-1.5"
                >
                  <div className="story-border-spin rounded-full p-[3px]">
                    <div
                      className="relative h-[68px] w-[68px] overflow-hidden rounded-full bg-surface2 ring-2 ring-[var(--surface)] dark:bg-[#242526]"
                      style={
                        img
                          ? {
                              backgroundImage: `url(${img})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }
                          : undefined
                      }
                    >
                      {!img ? (
                        <div className="flex h-full items-center justify-center text-[10px] text-[var(--text-muted)]">
                          Idea
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <span className="max-w-[76px] truncate text-center text-[11px] font-medium text-[var(--text)]">
                    {label}
                  </span>
                </Link>
              );
            })}
      </div>
    </div>
  );
}
