import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { PlayingCard, type FaceStyle, type Rank } from '../cards/PlayingCard';
import { CardBack } from '../cards/CardBack';
import type { Suit } from '../cards/suits';
import type { SkinId, ThemeId } from '../../config/site';
import { SplitText } from '../ui/SplitText';
import { SuitMark } from '../ui/SectionHeader';
import './PageHeader.css';

const EASE = [0.22, 1, 0.36, 1] as const;

export type HeaderCard =
  | { back: SkinId; x: string; y: string; r: number }
  | { rank: Rank; suit: Suit; face?: FaceStyle; x: string; y: string; r: number };

interface Props {
  eyebrow: string;
  suit: Suit;
  title: string;
  lead?: ReactNode;
  theme?: ThemeId;
  cards: HeaderCard[];
  compact?: boolean;
  children?: ReactNode;
}

/** Inner-page opener: a themed felt with its own small spread of cards dealt in from the dealer's side. */
export function PageHeader({ eyebrow, suit, title, lead, theme = 'emerald', cards, compact, children }: Props) {
  return (
    <header className={`ph felt ${theme !== 'emerald' ? `felt--${theme}` : ''} ${compact ? 'ph--compact' : ''}`}>
      <div className="ph__shade" aria-hidden="true" />
      <div className="ph__cards" aria-hidden="true">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            className="ph__card card"
            style={{ left: c.x, top: c.y }}
            initial={{ opacity: 0, x: -160, y: 120, rotate: c.r - 40, scale: 0.7 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: c.r, scale: 1, transition: { duration: 0.9, ease: EASE, delay: 0.35 + i * 0.12 } }}
          >
            {'back' in c ? <CardBack skin={c.back} /> : <PlayingCard rank={c.rank} suit={c.suit} face={c.face} decorative />}
          </motion.div>
        ))}
      </div>
      <div className="container ph__inner">
        <motion.p
          className="ph__eyebrow label"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.6, ease: EASE } }}
        >
          <SuitMark suit={suit} className={`ph__pip ${suit === 'H' || suit === 'D' ? 'red' : ''}`} />
          {eyebrow}
        </motion.p>
        <h1 className="ph__title">
          <SplitText text={title} delay={0.3} stagger={0.025} />
        </h1>
        {lead && (
          <motion.p
            className="ph__lead"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.8, ease: EASE } }}
          >
            {lead}
          </motion.p>
        )}
        {children}
      </div>
    </header>
  );
}
