import { forwardRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { PlayingCard, type Rank } from '../../components/cards/PlayingCard';
import { CardBack } from '../../components/cards/CardBack';
import type { Suit } from '../../components/cards/suits';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Reveal } from '../../components/ui/Reveal';
import { steps, type StepVisual } from '../../content/home';
import './HowToPlay.css';

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, amount: 0.55 } as const;

type Pos = 'S' | 'W' | 'N' | 'E';
// Anticlockwise from the player's seat, as in the game.
// Offsets are in % of the card itself (motion resolves x/y percentages against the element).
const OFFSET: Record<Pos, { x: string; y: string; r: number }> = {
  S: { x: '0%', y: '62%', r: 2 },
  E: { x: '118%', y: '0%', r: 84 },
  N: { x: '0%', y: '-62%', r: -4 },
  W: { x: '-118%', y: '0%', r: -86 },
};
const DEAL: Record<Pos, [number, number]> = { S: [0, 135], E: [235, 0], N: [0, -135], W: [-235, 0] };
const FROM: Record<Pos, { x: string; y: string }> = {
  S: { x: '0%', y: '160%' },
  E: { x: '200%', y: '0%' },
  N: { x: '0%', y: '-160%' },
  W: { x: '-200%', y: '0%' },
};

function TrickCard({ pos, rank, suit, order, glow, children }: { pos: Pos; rank: Rank; suit: Suit; order: number; glow?: boolean; children?: ReactNode }) {
  const o = OFFSET[pos];
  return (
    <motion.div
      className={`htp__tc card ${glow ? 'is-glow' : ''}`}
      variants={{
        hidden: { opacity: 0, x: FROM[pos].x, y: FROM[pos].y, rotate: o.r * 0.4 },
        show: { opacity: 1, x: o.x, y: o.y, rotate: o.r * 0.12, transition: { duration: 0.7, ease: EASE, delay: 0.15 + order * 0.28 } },
      }}
    >
      <PlayingCard rank={rank} suit={suit} decorative />
      {children}
    </motion.div>
  );
}

function Badge({ children, delay, tone = 'gold' }: { children: ReactNode; delay: number; tone?: 'gold' | 'red' }) {
  return (
    <motion.span
      className={`htp__badge htp__badge--${tone} label`}
      variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1, transition: { delay, duration: 0.5, ease: EASE } } }}
    >
      {children}
    </motion.span>
  );
}

function Visual({ kind }: { kind: StepVisual }) {
  let body: ReactNode;
  switch (kind) {
    case 'deal':
      body = (
        <>
          {(['S', 'E', 'N', 'W'] as Pos[]).map((p, seat) =>
            [0, 1, 2].map((k) => (
              <motion.div
                key={`${p}${k}`}
                className="htp__tc htp__tc--back card"
                variants={{
                  hidden: { opacity: 0, x: '0%', y: '0%', rotate: 0 },
                  show: {
                    opacity: 1,
                    x: `${DEAL[p][0] + k * 9}%`,
                    y: `${DEAL[p][1] - k * 4}%`,
                    rotate: OFFSET[p].r,
                    transition: { duration: 0.55, ease: EASE, delay: 0.1 + (k * 4 + seat) * 0.09 },
                  },
                }}
              >
                <CardBack skin="classic_red" />
              </motion.div>
            )),
          )}
          <div className="htp__deck card">
            <CardBack skin="classic_red" />
          </div>
          <Badge delay={1.4}>13 each</Badge>
        </>
      );
      break;
    case 'ace':
      body = (
        <>
          <TrickCard pos="S" rank="A" suit="S" order={0} glow />
          <TrickCard pos="E" rank="7" suit="S" order={1} />
          <TrickCard pos="N" rank="Q" suit="S" order={2} />
          <TrickCard pos="W" rank="3" suit="S" order={3} />
          <Badge delay={1.5}>Opening trick → waste</Badge>
        </>
      );
      break;
    case 'follow':
      body = (
        <>
          <TrickCard pos="S" rank="5" suit="H" order={0} />
          <TrickCard pos="E" rank="9" suit="H" order={1} />
          <TrickCard pos="N" rank="K" suit="H" order={2} glow />
          <TrickCard pos="W" rank="2" suit="H" order={3} />
          <Badge delay={1.5}>Power</Badge>
        </>
      );
      break;
    case 'thulla':
      body = (
        <>
          <TrickCard pos="S" rank="8" suit="D" order={0} />
          <TrickCard pos="E" rank="Q" suit="D" order={1} glow />
          <motion.div
            className="htp__tc htp__slam card"
            variants={{
              hidden: { opacity: 0, scale: 1.9, rotate: -30, x: '0%', y: '-62%' },
              show: { opacity: 1, scale: 1, rotate: -14, x: '0%', y: '-62%', transition: { delay: 0.95, duration: 0.35, ease: [0.5, 0, 0.75, 0] } },
            }}
          >
            <PlayingCard rank="6" suit="C" decorative />
          </motion.div>
          <motion.span
            className="htp__stamp"
            variants={{
              hidden: { opacity: 0, scale: 2.2, rotate: -12 },
              show: { opacity: 1, scale: 1, rotate: -8, transition: { delay: 1.3, duration: 0.4, ease: EASE } },
            }}
          >
            Thulla!
          </motion.span>
          <Badge delay={1.7} tone="red">
            Picks up +3
          </Badge>
        </>
      );
      break;
    case 'result':
      body = (
        <ol className="htp__result">
          {[
            ['Zara', 'Got away', 'gold'],
            ['You', 'Got away', 'gold'],
            ['Hina', 'Got away', 'gold'],
            ['Bilal', 'Bhabhi · 4 left', 'red'],
          ].map(([name, tag, tone], i) => (
            <motion.li
              key={name}
              className={`htp__row htp__row--${tone}`}
              variants={{ hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0, transition: { delay: 0.15 + i * 0.22, duration: 0.6, ease: EASE } } }}
            >
              <span className="htp__place">{i + 1}</span>
              <span className="htp__name">{name}</span>
              <span className="htp__tag label">{tag}</span>
            </motion.li>
          ))}
        </ol>
      );
      break;
  }
  return (
    <motion.div className={`htp__visual felt htp__visual--${kind}`} initial="hidden" whileInView="show" viewport={VIEW} aria-hidden="true">
      {body}
    </motion.div>
  );
}

export const HowToPlay = forwardRef<HTMLElement>(function HowToPlay(_, ref) {
  return (
    <section ref={ref} id="how-to-play" className="htp" aria-labelledby="htp-title" tabIndex={-1}>
      <div className="container">
        <SectionHeader
          id="htp-title"
          eyebrow="How a hand plays"
          suit="H"
          align="center"
          title={
            <>
              Five moments from <em>deal</em> to <em>Bhabhi</em>
            </>
          }
          lead="Bhabhi Thulla plays the popular Pakistani rules. Here is a whole hand, start to finish."
        />
        <ol className="htp__steps">
          {steps.map((s, i) => (
            <li key={s.title} className={`htp__step ${i % 2 ? 'is-flip' : ''}`}>
              <Reveal className="htp__text">
                <div className="htp__marker card" aria-hidden="true">
                  <PlayingCard rank={s.rank as Rank} suit="S" decorative />
                </div>
                <p className="htp__num label">Step {i + 1}</p>
                <h3 className="htp__title">{s.title}</h3>
                <p className="htp__body">{s.body}</p>
              </Reveal>
              <Visual kind={s.visual} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
});
