'use client';

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { useReducedMotion } from 'framer-motion';

type LottiePlayerProps = {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  /** When true, pause until in view via parent control */
  play?: boolean;
  'aria-label'?: string;
};

export function LottiePlayer({
  src,
  className,
  loop = true,
  autoplay = true,
  play = true,
  'aria-label': ariaLabel = 'Decorative animation',
}: LottiePlayerProps) {
  const reduce = useReducedMotion();
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load ${src}`);
        return r.json();
      })
      .then((json: object) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!data) {
    return (
      <div
        className={className}
        aria-hidden
        style={{ minHeight: 120 }}
      />
    );
  }

  if (reduce) {
    return (
      <div
        className={className}
        role="img"
        aria-label={ariaLabel}
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(15,118,110,0.06), transparent 70%)',
        }}
      />
    );
  }

  return (
    <div className={className} role="img" aria-label={ariaLabel}>
      <Lottie
        animationData={data}
        loop={loop}
        autoplay={autoplay && play}
        style={{ width: '100%', height: '100%' }}
        rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
      />
    </div>
  );
}
