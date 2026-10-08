import type { FeatureIcon } from '../../content/home';

/** Line icons drawn for this site on a 24px grid, 1.6px stroke. */
const PATHS: Record<FeatureIcon | 'mail' | 'copy' | 'check' | 'arrow' | 'device' | 'shield', string> = {
  brain:
    'M9 4.5a2.5 2.5 0 0 0-4.6 1.4A3 3 0 0 0 3 10.5a3 3 0 0 0 1.2 4.4A3 3 0 0 0 9 18.5V4.5Zm6 0a2.5 2.5 0 0 1 4.6 1.4 3 3 0 0 1 1.4 4.6 3 3 0 0 1-1.2 4.4A3 3 0 0 1 15 18.5V4.5ZM9 4.5a3 3 0 0 1 6 0M9 18.5a3 3 0 0 0 6 0M9 9h2m2 3h2M9 14h2',
  masks:
    'M4 5h8v5a4 4 0 0 1-8 0V5Zm2.3 3.5h.01M9.7 8.5h.01M6.5 11.5c.8.7 2.2.7 3 0M12 9h8v5a4 4 0 0 1-8 0m2.3-1.5h.01m3.4 0h.01M14.5 16.3c.8-.7 2.2-.7 3 0',
  offline: 'M3 3l18 18M8.5 8.6A7.8 7.8 0 0 0 5 10.8M2 7.8a13 13 0 0 1 4-2.6m4.6-.9A13 13 0 0 1 22 7.8M16.8 11.4a8 8 0 0 1 2.2 1.4M8.5 14.2a5 5 0 0 1 7 0M12 18h.01',
  tables: 'M3 9.5C3 7 7 5 12 5s9 2 9 4.5S17 14 12 14s-9-2-9-4.5ZM3 9.5v3C3 15 7 17 12 17s9-2 9-4.5v-3M12 17v3M8 20h8',
  coins: 'M8.5 7.5c3.6 0 6.5-1.1 6.5-2.5S12.1 2.5 8.5 2.5 2 3.6 2 5s2.9 2.5 6.5 2.5ZM2 5v4c0 1.4 2.9 2.5 6.5 2.5M2 9v4c0 1.4 2.9 2.5 6.5 2.5M15.5 13.5c3.6 0 6.5-1.1 6.5-2.5s-2.9-2.5-6.5-2.5S9 9.6 9 11s2.9 2.5 6.5 2.5ZM9 11v4c0 1.4 2.9 2.5 6.5 2.5S22 16.4 22 15v-4M9 15v4c0 1.4 2.9 2.5 6.5 2.5S22 20.4 22 19v-4',
  timer: 'M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM12 9v4l2.5 2M9.5 2.5h5M12 2.5V5',
  haath: 'M5 7h6a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Zm8-1.5 5.8 1.6a1 1 0 0 1 .7 1.2l-2.9 10.6M15 3h3m-1.5-1.5v3',
  sound: 'M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4ZM15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11',
  mail: 'M3.5 6h17v12h-17V6Zm0 .5 8.5 6.5 8.5-6.5',
  copy: 'M9 9h10v11H9V9ZM5 15H4V4h11v1',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  arrow: 'M5 12h14m-5-5 5 5-5 5',
  device: 'M3 7.5A1.5 1.5 0 0 1 4.5 6h15A1.5 1.5 0 0 1 21 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 16.5v-9ZM6 6v12M18.5 12h.01',
  shield: 'M12 3 4.5 6v5.5c0 4.5 3.2 8.2 7.5 9.5 4.3-1.3 7.5-5 7.5-9.5V6L12 3Zm-3 9 2 2 4-4',
};

export type IconName = keyof typeof PATHS;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
