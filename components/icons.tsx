type IconProps = { size?: number };

const base = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function SunIcon({ size = 17 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.9} {...base}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export function MoonIcon({ size = 16 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.9} {...base}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function MenuIcon({ size = 18 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.9} {...base}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

export function LinkedInIcon({ size = 16 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.9} {...base}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 16 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" strokeWidth={2} {...base}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export function ArrowDownIcon({ size = 15 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" strokeWidth={2} {...base}>
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  );
}

export function CropMark({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" className={`cropmark ${className}`} viewBox="0 0 18 18">
      <path d="M9 0V18M0 9H18" />
      <circle cx="9" cy="9" r="4" />
    </svg>
  );
}
