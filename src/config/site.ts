/** Single source of truth for brand facts. Everything here is taken from the Android project. */
export const site = {
  name: 'Bhabhi Thulla',
  /** Official tagline, from AccountScreen.kt. */
  tagline: "Four seats. One deck. Don't be the Bhabhi.",
  /** Account screen headline in the app. */
  enterLine: 'Enter the card room',
  email: 'bushramanzoor502@gmail.com',
  packageId: 'utiledge.game.bhabhi.thulla.cardgame.rummy',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=utiledge.game.bhabhi.thulla.cardgame.rummy',
  url: 'https://bushramanzoor502-sketch.github.io/BhabhiThulla',
  minAndroid: 'Android 11',
  legalUpdated: '8 October 2026',
} as const;

export type ThemeId = 'emerald' | 'walnut' | 'graphite' | 'royal';
export type SkinId = 'classic_blue' | 'classic_red' | 'emerald' | 'onyx' | 'spider' | 'royal' | 'filigree' | 'faces';

export interface TableTier {
  id: string;
  name: string;
  entry: number;
  prize: number;
  minLevel: number;
  theme: ThemeId;
  skin: SkinId;
}

/** Mirrors app/src/main/assets/game/tables.json. */
export const tables: TableTier[] = [
  { id: 'casual', name: 'Casual', entry: 500, prize: 2000, minLevel: 1, theme: 'emerald', skin: 'classic_blue' },
  { id: 'classic', name: 'Classic', entry: 1000, prize: 4000, minLevel: 1, theme: 'emerald', skin: 'classic_red' },
  { id: 'getaway', name: 'Getaway', entry: 2500, prize: 10000, minLevel: 2, theme: 'walnut', skin: 'emerald' },
  { id: 'laad', name: 'Laad', entry: 5000, prize: 20000, minLevel: 4, theme: 'walnut', skin: 'onyx' },
  { id: 'tochoo', name: 'Tochoo', entry: 10000, prize: 40000, minLevel: 6, theme: 'graphite', skin: 'spider' },
  { id: 'royal', name: 'Royal', entry: 25000, prize: 100000, minLevel: 10, theme: 'royal', skin: 'royal' },
  { id: 'elite', name: 'Elite', entry: 100000, prize: 400000, minLevel: 15, theme: 'royal', skin: 'filigree' },
];

export const navLinks = [
  { to: '/', label: 'Home', suit: 'S' },
  { to: '/about', label: 'About', suit: 'H' },
  { to: '/faqs', label: 'FAQs', suit: 'C' },
  { to: '/contact', label: 'Contact', suit: 'D' },
  { to: '/privacy', label: 'Privacy Policy', suit: 'S' },
  { to: '/delete-account', label: 'Delete Account', suit: 'H' },
] as const;

export const legalLinks = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/delete-account', label: 'Delete Account' },
  { to: '/terms', label: 'Terms of Use' },
] as const;

/** Email split at the @ so it can wrap there instead of mid-word. */
export const emailParts = site.email.split('@') as [string, string];

export const formatCoins = (n: number) => n.toLocaleString('en-US');
