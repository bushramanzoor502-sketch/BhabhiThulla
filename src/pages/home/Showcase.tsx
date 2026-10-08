import { useState } from 'react';
import { motion } from 'framer-motion';
import { CardBack, BACKS } from '../../components/cards/CardBack';
import { PlayingCard, type FaceStyle, type Rank } from '../../components/cards/PlayingCard';
import type { Suit } from '../../components/cards/suits';
import { tables, type SkinId } from '../../config/site';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Reveal } from '../../components/ui/Reveal';
import './Showcase.css';

const EASE = [0.22, 1, 0.36, 1] as const;

// Each skin pairs a back with a face style (CardSkin.ALL); the faces shown are just examples.
const FACES: Record<SkinId, { face: FaceStyle; rank: Rank; suit: Suit }> = {
  classic_blue: { face: 'ivory', rank: 'K', suit: 'S' },
  classic_red: { face: 'ivory', rank: 'Q', suit: 'H' },
  emerald: { face: 'ivory', rank: 'J', suit: 'C' },
  onyx: { face: 'noir', rank: 'A', suit: 'D' },
  spider: { face: 'noir', rank: '7', suit: 'S' },
  royal: { face: 'royal', rank: 'K', suit: 'H' },
  filigree: { face: 'royal', rank: 'Q', suit: 'S' },
  faces: { face: 'ivory', rank: 'J', suit: 'D' },
};

// The seven decks dealt at the lobby tables, in table order.
const DECKS = tables.map((t) => t.skin);

function FanCard({ skin, i, n }: { skin: SkinId; i: number; n: number }) {
  const [flipped, setFlipped] = useState(false);
  const f = FACES[skin];
  const mid = (n - 1) / 2;
  const d = i - mid;
  return (
    <motion.li
      className="sc__slot"
      style={{ ['--d' as string]: d, ['--ad' as string]: Math.abs(d), zIndex: i }}
      initial={{ opacity: 0, y: 120, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay: 0.1 + i * 0.07 } }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <button
        type="button"
        className={`sc__card ${flipped ? 'is-flipped' : ''}`}
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        aria-label={`${BACKS[skin].name} deck. ${flipped ? 'Showing a card face, press to turn it back over' : 'Press to flip'}`}
      >
        <span className="sc__inner">
          <span className="sc__back card">
            <CardBack skin={skin} />
          </span>
          <span className="sc__face card">
            <PlayingCard rank={f.rank} suit={f.suit} face={f.face} decorative />
          </span>
        </span>
        <span className="sc__name label">{BACKS[skin].name}</span>
      </button>
    </motion.li>
  );
}

/** Illustrative landscape table recreated from the game's art: not a screenshot. */
function PhoneScene() {
  return (
    <figure className="sc__phone-wrap">
      <div className="sc__phone">
        <div className="sc__screen felt" aria-hidden="true">
          <div className="sc__hud">
            <span className="label">Classic · Trick 4</span>
            <span className="sc__hud-r label">♪ ✕</span>
          </div>
          <div className="sc__oval" />
          <div className="sc__seat sc__seat--n">
            <span className="sc__av" style={{ background: '#5E3A96' }}>B</span>
            <span>Bilal · 9</span>
          </div>
          <div className="sc__seat sc__seat--w">
            <span className="sc__av" style={{ background: '#1F3F8F' }}>Z</span>
            <span>Zara · 7</span>
          </div>
          <div className="sc__seat sc__seat--e">
            <span className="sc__av" style={{ background: '#9E1F2B' }}>H</span>
            <span>Hina · 11</span>
            <span className="sc__power label">Power</span>
          </div>
          <div className="sc__trick">
            <div className="card sc__t1">
              <PlayingCard rank="10" suit="D" decorative />
            </div>
            <div className="card sc__t2">
              <PlayingCard rank="J" suit="D" decorative />
            </div>
            <div className="card sc__t3">
              <PlayingCard rank="3" suit="D" decorative />
            </div>
          </div>
          <div className="sc__turn label">Your turn · 12</div>
          <div className="sc__hand">
            {(
              [
                ['A', 'D'],
                ['8', 'C'],
                ['K', 'C'],
                ['4', 'S'],
                ['9', 'H'],
                ['Q', 'H'],
              ] as [Rank, Suit][]
            ).map(([r, s], i) => (
              <div key={i} className={`card sc__h ${s === 'D' ? '' : 'is-dim'}`} style={{ ['--i' as string]: i - 2.5 }}>
                <PlayingCard rank={r} suit={s} decorative />
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="sc__caption">
        Illustration recreated from the game&apos;s own card and table art. Only cards you can legally play stay bright, just like in
        the game.
      </figcaption>
    </figure>
  );
}

export function Showcase() {
  return (
    <section className="sc" aria-labelledby="sc-title">
      <div className="container">
        <SectionHeader
          id="sc-title"
          eyebrow="The art of the deck"
          suit="S"
          align="center"
          title={
            <>
              Seven decks. <em>One for every table.</em>
            </>
          }
          lead="Each table deals its own deck, from Classic Blue at Casual to Gold Filigree at Elite. Every card is drawn as vector art, so it stays razor sharp on any screen. Tap a card to turn it over."
        />
      </div>
      <ul className="sc__fan" aria-label="Card decks">
        {DECKS.map((s, i) => (
          <FanCard key={s} skin={s} i={i} n={DECKS.length} />
        ))}
      </ul>
      <div className="container">
        <Reveal>
          <PhoneScene />
        </Reveal>
      </div>
    </section>
  );
}
