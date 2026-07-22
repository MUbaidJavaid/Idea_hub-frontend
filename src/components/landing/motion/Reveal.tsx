'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealAs = 'div' | 'li';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  /** Use `li` when Reveal is a direct child of `ul`/`ol` so list structure stays valid. */
  as?: RevealAs;
} & Omit<HTMLMotionProps<'div'>, 'children'>;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  as = 'div',
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = as === 'li' ? motion.li : motion.div;
  const StaticTag = as === 'li' ? 'li' : 'div';

  if (reduce) {
    const Tag = StaticTag;
    return (
      <Tag className={className} {...(rest as object)}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-8% 0px -8% 0px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
