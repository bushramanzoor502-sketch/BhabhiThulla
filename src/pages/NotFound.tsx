import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayingCard } from '../components/cards/PlayingCard';
import { CardBack } from '../components/cards/CardBack';
import { Button } from '../components/ui/Button';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import './NotFound.css';

/** A misdeal: three face-down cards, and turning any of them over reveals the 4-0-4. */
export default function NotFound() {
  useDocumentMeta({ title: 'Page not found', description: 'This page is not on the table.', path: '/404', noindex: true });
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);
  const cards = [
    { rank: '4' as const, suit: 'H' as const },
    { rank: 'A' as const, suit: 'S' as const },
    { rank: '4' as const, suit: 'D' as const },
  ];
  return (
    <section className="nf felt">
      <div className="container nf__inner">
        <div className="nf__cards">
          {cards.map((c, i) => (
            <motion.button
              key={i}
              type="button"
              className={`nf__card ${flipped[i] ? 'is-flipped' : ''}`}
              aria-label={flipped[i] ? 'Card turned over' : 'Turn this card over'}
              aria-pressed={flipped[i]}
              onClick={() => setFlipped((f) => f.map((v, k) => (k === i ? !v : v)))}
              initial={{ opacity: 0, y: -80, rotate: (i - 1) * 20 }}
              animate={{ opacity: 1, y: 0, rotate: (i - 1) * 8, transition: { delay: 0.4 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
            >
              <span className="nf__flip">
                <span className="nf__back card">
                  <CardBack skin="classic_red" />
                </span>
                <span className="nf__face card">
                  <PlayingCard rank={c.rank} suit={c.suit} decorative />
                </span>
              </span>
            </motion.button>
          ))}
        </div>
        <p className="label gold">Error 404 · Misdeal</p>
        <h1 className="nf__title">This card isn’t in the deck.</h1>
        <p className="nf__lead">The page you were looking for has been picked up, played or never dealt. Let’s get you back to the table.</p>
        <div className="nf__actions">
          <Button to="/">Back to the table</Button>
          <Button to="/faqs" variant="ghost">
            Read the FAQs
          </Button>
        </div>
      </div>
    </section>
  );
}
