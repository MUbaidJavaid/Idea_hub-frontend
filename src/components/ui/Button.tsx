'use client';

import { Slot } from '@radix-ui/react-slot';
import { Loader2 } from 'lucide-react';
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';

import { cn } from '@/components/ui/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-white shadow-sm hover:bg-brand-700 focus-visible:ring-brand-300',
  secondary:
    'border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] hover:bg-[var(--color-border-light)] focus-visible:ring-brand-200 dark:border-gray-600 dark:hover:bg-gray-700/50',
  ghost:
    'text-[var(--color-text-secondary)] hover:bg-[var(--color-border-light)] hover:text-[var(--color-text-primary)] dark:hover:bg-gray-700/40',
  danger:
    'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-300',
};

const sizes: Record<Size, string> = {
  sm: 'min-h-10 px-3 py-1.5 text-xs',
  md: 'min-h-11 px-4 py-2 text-sm',
  lg: 'min-h-12 px-6 py-3 text-base',
};

const base =
  'inline-flex select-none items-center justify-center gap-2 rounded-btn font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-bg)] disabled:pointer-events-none disabled:opacity-50 active:scale-95 dark:focus-visible:ring-offset-[var(--color-bg)]';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = 'primary',
      size = 'md',
      loading,
      fullWidth,
      disabled,
      leftIcon,
      rightIcon,
      asChild = false,
      children,
      ...props
    },
    ref
  ) {
    const loaderClass =
      variant === 'primary' || variant === 'danger'
        ? 'text-white'
        : 'text-brand';

    if (asChild) {
      return (
        <Slot
          ref={ref as never}
          className={cn(
            base,
            variants[variant],
            sizes[size],
            fullWidth && 'w-full',
            className
          )}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || loading}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2
            className={cn('size-4 shrink-0 animate-spin', loaderClass)}
            strokeWidth={1.5}
            aria-hidden
          />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);
