import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import { SUIT_PATH, type Suit } from '../cards/suits';
import './SectionHeader.css';

interface Props {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  suit?: Suit;
  align?: 'left' | 'center';
  id?: string;
  as?: 'h1' | 'h2';
}

export function SuitMark({ suit, className }: { suit: Suit; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1 1" aria-hidden="true" focusable="false">
      <path d={SUIT_PATH[suit]} fill="currentColor" />
    </svg>
  );
}

/** Eyebrow label with a suit pip, display title and an optional lead paragraph. */
export function SectionHeader({ eyebrow, title, lead, suit = 'S', align = 'left', id, as: H = 'h2' }: Props) {
  return (
    <header className={`sh sh--${align}`}>
      <Reveal>
        <p className="sh__eyebrow label">
          <SuitMark suit={suit} className={`sh__pip ${suit === 'H' || suit === 'D' ? 'red' : ''}`} />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal index={1}>
        <H className="sh__title" id={id}>
          {title}
        </H>
      </Reveal>
      {lead && (
        <Reveal index={2}>
          <p className="sh__lead">{lead}</p>
        </Reveal>
      )}
    </header>
  );
}
