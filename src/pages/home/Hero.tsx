import { useCallback, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { site } from '../../config/site';
import { PlayingCard, type Rank } from '../../components/cards/PlayingCard';
import { CardBack } from '../../components/cards/CardBack';
import type { Suit } from '../../components/cards/suits';
import { GooglePlayButton } from '../../components/ui/GooglePlayButton';
import { SplitText } from '../../components/ui/SplitText';
import './Hero.css';

const EASE = [0.22, 1, 0.36, 1] as const;

type Seat = 'left' | 'top' | 'right';
// Seat personalities are fixed in the game (BotManager.cpp); names are drawn at random from the bot roster.
const SEATS: { seat: Seat; name: string; trait: string }[] = [
  { seat: 'left', name: 'Zara', trait: 'Cautious' },
  { seat: 'top', name: 'Bilal', trait: 'Balanced' },
  { seat: 'right', name: 'Hina', trait: 'Bold' },
];

const HAND: { rank: Rank; suit: Suit }[] = [
  { rank: '9', suit: 'H' },
  { rank: 'J', suit: 'C' },
  { rank: 'Q', suit: 'D' },
  { rank: 'K', suit: 'S' },
  { rank: '4', suit: 'H' },
];

const DEAL_START = 0.5;
const DEAL_STEP = 0.07;

// Cards fly in from the dealer's spot at the centre of the table.
const FROM: Record<Seat, { x: number; y: number }> = { left: { x: 260, y: 0 }, top: { x: 0, y: 160 }, right: { x: -260, y: 0 } };

/** A small fan of face-down cards for a bot seat. */
function BotFan({ seat, order }: { seat: Seat; order: number }) {
  return (
    <div className={`hero__fan hero__fan--${seat}`}>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="hero__fan-card card"
          style={{ ['--i' as string]: i - 1.5 }}
          initial={{ opacity: 0, ...FROM[seat], scale: 0.6 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE, delay: DEAL_START + (i * 4 + order) * DEAL_STEP } }}
        >
          <CardBack skin="classic_blue" />
        </motion.div>
      ))}
    </div>
  );
}

export function Hero({ onLearn }: { onLearn: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const tilt = useTransform(scrollYProgress, [0, 1], [48, 62]);
  const sink = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  // Pointer parallax: one rAF-throttled write of two CSS variables; layers read them in CSS transforms.
  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduce || e.pointerType !== 'mouse') return;
      const el = ref.current;
      if (!el) return;
      const { clientX, clientY } = e;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.style.setProperty('--px', (clientX / window.innerWidth - 0.5).toFixed(3));
        el.style.setProperty('--py', (clientY / window.innerHeight - 0.5).toFixed(3));
      });
    },
    [reduce],
  );

  return (
    <section ref={ref} className="hero felt" onPointerMove={onPointerMove} aria-labelledby="hero-title">
      <div className="hero__light" aria-hidden="true" />

      {/* The table: a perspective plane with an oval felt bed, gold inlay and four seats. */}
      <motion.div className="hero__stage" style={reduce ? undefined : { y: sink, opacity: fade }} aria-hidden="true">
        <div className="hero__parallax">
          <motion.div className="hero__table" style={reduce ? { rotateX: 52 } : { rotateX: tilt }}>
            <div className="hero__rail" />
            <div className="hero__bed felt" />
            <div className="hero__inlay" />

            {SEATS.map((s, i) => (
              <BotFan key={s.seat} seat={s.seat} order={i + 1} />
            ))}

            <div className="hero__hand">
              {HAND.map((c, i) => (
                <motion.div
                  key={i}
                  className="hero__hand-card card"
                  style={{ ['--i' as string]: i - 2, ['--a' as string]: Math.abs(i - 2) }}
                  initial={{ opacity: 0, y: -220, scale: 0.55, rotate: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE, delay: DEAL_START + i * 4 * DEAL_STEP } }}
                >
                  <PlayingCard rank={c.rank} suit={c.suit} decorative />
                </motion.div>
              ))}
            </div>

            {/* The opening card: Ace of Spades flips face up once the deal is done. */}
            <motion.div
              className="hero__ace"
              initial={{ opacity: 0, scale: 0.4, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 1.9 } }}
            >
              <motion.div
                className="hero__flip"
                initial={{ rotateY: 180 }}
                animate={{ rotateY: 0, transition: { duration: 0.9, ease: EASE, delay: 2.5 } }}
              >
                <div className="hero__face card">
                  <PlayingCard rank="A" suit="S" decorative />
                </div>
                <div className="hero__back card">
                  <CardBack skin="classic_blue" />
                </div>
              </motion.div>
              <motion.div
                className="hero__ring"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 1.2, ease: EASE, delay: 2.9 } }}
              />
            </motion.div>
          </motion.div>

          {/* Seat labels sit outside the tilted plane so the text stays crisp. */}
          {SEATS.map((s, i) => (
            <motion.p
              key={s.seat}
              className={`hero__seat hero__seat--${s.seat}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1.6 + i * 0.12, duration: 0.6 } }}
            >
              <span className="hero__seat-name">{s.name}</span>
              <span className="hero__seat-trait">{s.trait}</span>
            </motion.p>
          ))}
          <motion.p
            className="hero__hint label"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 3.3, duration: 0.6, ease: EASE } }}
          >
            Lead the Ace of Spades
          </motion.p>
        </div>
      </motion.div>

      <div className="hero__copy container">
        <motion.p
          className="hero__eyebrow label"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.7, ease: EASE } }}
        >
          <span>Card game for Android</span>
          <span className="hero__dot" aria-hidden="true">♠</span>
          <span>4 players</span>
        </motion.p>

        <h1 id="hero-title" className="hero__title">
          <SplitText text="Bhabhi" className="hero__title-top" delay={0.3} />
          <SplitText text="Thulla" className="hero__title-bottom" delay={0.55} />
        </h1>

        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 1.1, duration: 0.8, ease: EASE } }}
        >
          {site.tagline}
        </motion.p>

        <motion.div
          className="hero__ctas"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 1.35, duration: 0.8, ease: EASE } }}
        >
          <GooglePlayButton />
          <button type="button" className="btn btn--ghost" onClick={onLearn}>
            <span className="btn__label">Learn the rules</span>
            <span className="btn__icon" aria-hidden="true">
              ↓
            </span>
          </button>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 3.6 } }}
      >
        <span className="label">Scroll</span>
        <span className="hero__scroll-line" />
      </motion.div>
    </section>
  );
}
