import { motion } from 'framer-motion';
import { site } from '../../config/site';
import { CardBack } from '../../components/cards/CardBack';
import { PlayingCard } from '../../components/cards/PlayingCard';
import { GooglePlayButton } from '../../components/ui/GooglePlayButton';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';
import './FinalCta.css';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Closing call to action on the Royal table's purple felt, framed by the four seats' cards. */
export function FinalCta() {
  const corners = [
    { cls: 'tl', el: <CardBack skin="royal" />, r: -18 },
    { cls: 'tr', el: <CardBack skin="filigree" />, r: 16 },
    { cls: 'bl', el: <PlayingCard rank="K" suit="H" face="royal" decorative />, r: 12 },
    { cls: 'br', el: <PlayingCard rank="A" suit="S" face="royal" decorative />, r: -10 },
  ];
  return (
    <section className="cta felt felt--royal" aria-labelledby="cta-title">
      <div className="cta__rail" aria-hidden="true" />
      {corners.map((c, i) => (
        <motion.div
          key={c.cls}
          className={`cta__card cta__card--${c.cls} card`}
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: c.r, transition: { duration: 1, ease: EASE, delay: 0.1 * i } }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {c.el}
        </motion.div>
      ))}
      <div className="container cta__inner">
        <Reveal>
          <p className="label gold">{site.enterLine}</p>
        </Reveal>
        <Reveal index={1}>
          <h2 id="cta-title" className="cta__title">
            Your seat is waiting.
          </h2>
        </Reveal>
        <Reveal index={2}>
          <p className="cta__lead">{site.tagline}</p>
        </Reveal>
        <Reveal index={3} className="cta__actions">
          <GooglePlayButton />
          <Button to="/faqs" variant="ghost">
            Read the FAQs
          </Button>
        </Reveal>
        <Reveal index={4}>
          <p className="cta__meta">No in-app purchases · Works offline · {site.minAndroid} or newer</p>
        </Reveal>
      </div>
    </section>
  );
}
