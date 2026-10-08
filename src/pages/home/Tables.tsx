import { useRef } from 'react';
import { motion } from 'framer-motion';
import { formatCoins, tables } from '../../config/site';
import { CardBack, BACKS } from '../../components/cards/CardBack';
import { SectionHeader } from '../../components/ui/SectionHeader';
import './Tables.css';

const EASE = [0.22, 1, 0.36, 1] as const;

function Coin() {
  return (
    <svg className="tbl__coin" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <circle cx="8" cy="8" r="7" fill="#C9A54E" />
      <circle cx="8" cy="8" r="5" fill="none" stroke="#8C7232" strokeWidth="1.2" />
    </svg>
  );
}

/** The seven tables from the in-game lobby (assets/game/tables.json), styled like the lobby carousel. */
export function Tables() {
  const track = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section className="tbl" aria-labelledby="tbl-title">
      <div className="container tbl__head">
        <SectionHeader
          id="tbl-title"
          eyebrow="The lobby"
          suit="D"
          title={
            <>
              Seven tables. <em>One climb.</em>
            </>
          }
          lead="Every table seats four. The higher you go, the bigger the entry fee and prize, and the richer the felt and the deck."
        />
        <div className="tbl__controls">
          <button type="button" className="tbl__arrow" onClick={() => scrollBy(-1)} aria-label="Previous tables" aria-controls="tbl-track">
            ←
          </button>
          <button type="button" className="tbl__arrow" onClick={() => scrollBy(1)} aria-label="Next tables" aria-controls="tbl-track">
            →
          </button>
        </div>
      </div>

      <ul id="tbl-track" ref={track} className="tbl__track" tabIndex={0} aria-label="Game tables">
        {tables.map((t, i) => (
          <motion.li
            key={t.id}
            className="tbl__item"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE, delay: Math.min(i, 4) * 0.08 } }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <article className={`tbl__card tbl__card--${t.theme}`}>
              <div className={`tbl__felt felt felt--${t.theme}`} aria-hidden="true">
                <div className="tbl__deck card">
                  <CardBack skin={t.skin} />
                </div>
                <div className="tbl__deck tbl__deck--2 card">
                  <CardBack skin={t.skin} />
                </div>
              </div>
              <div className="tbl__info">
                <p className="tbl__players label">4 players</p>
                <h3 className="tbl__name">{t.name}</h3>
                <p className="tbl__deckname">{BACKS[t.skin].name} deck</p>
                <dl className="tbl__stats">
                  <div>
                    <dt className="label">Entry</dt>
                    <dd>
                      <Coin />
                      {formatCoins(t.entry)}
                    </dd>
                  </div>
                  <div>
                    <dt className="label">Prize</dt>
                    <dd>
                      <Coin />
                      {formatCoins(t.prize)}
                    </dd>
                  </div>
                </dl>
                <p className="tbl__lock">{t.minLevel > 1 ? `Unlocks at level ${t.minLevel}` : 'Open from level 1'}</p>
              </div>
            </article>
          </motion.li>
        ))}
      </ul>
      <p className="container tbl__note">Coins are virtual, in-game only. They can't be bought, sold or cashed out.</p>
    </section>
  );
}
