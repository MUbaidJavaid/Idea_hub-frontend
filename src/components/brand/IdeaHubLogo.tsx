import { cn } from '@/components/ui/cn';

type IdeaHubLogoProps = {
  className?: string;
  withWordmark?: boolean;
  size?: number;
  inverted?: boolean;
};

/**
 * Idea Hub mark — “Orbit”
 * An open orbital path around a teal hub: ideas drawn into the center,
 * yet left open — precision geometry that holds at 16px and 128px.
 */
export function IdeaHubMark({
  className,
  size = 32,
  inverted = false,
}: {
  className?: string;
  size?: number;
  inverted?: boolean;
}) {
  const bg = inverted ? '#F4F4F2' : '#0A0A0A';
  const orbit = inverted ? '#0A0A0A' : '#EDEDEB';
  const hub = '#0F766E';
  const core = inverted ? '#0A0A0A' : '#FAFAF9';
  const node = inverted ? '#0A0A0A' : '#FAFAF9';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      className={className}
      aria-hidden
    >
      <rect width="48" height="48" rx="14" fill={bg} />

      {/* Open orbit — invitation, not a closed loop */}
      <path
        d="M24 9.75C31.87 9.75 38.25 16.13 38.25 24C38.25 31.87 31.87 38.25 24 38.25C18.55 38.25 13.82 35.2 11.4 30.6"
        stroke={orbit}
        strokeWidth="2.1"
        strokeLinecap="round"
      />

      {/* Satellite — the incoming idea */}
      <circle cx="24" cy="9.75" r="2.65" fill={node} />

      {/* Hub core */}
      <circle cx="24" cy="24" r="7.25" fill={hub} />
      <circle cx="24" cy="24" r="2.35" fill={core} />
    </svg>
  );
}

export function IdeaHubLogo({
  className,
  withWordmark = true,
  size = 32,
  inverted = false,
}: IdeaHubLogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <IdeaHubMark size={size} inverted={inverted} />
      {withWordmark ? (
        <span
          className={cn(
            'landing-display text-[1.15rem] font-semibold tracking-tight',
            inverted ? 'text-white' : 'text-[var(--lh-ink)]'
          )}
        >
          Idea Hub
        </span>
      ) : null}
    </span>
  );
}
