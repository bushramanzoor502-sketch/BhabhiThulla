import { motion } from 'framer-motion';
import { TiltCard } from '../../components/cards/TiltCard';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Icon } from '../../components/ui/Icon';
import { features } from '../../content/home';
import './Features.css';

const EASE = [0.22, 1, 0.36, 1] as const;
const SUITS = ['♠', '♥', '♣', '♦'];

export function Features() {
  return (
    <section className="feat" aria-labelledby="feat-title">
      <div className="container">
        <SectionHeader
          id="feat-title"
          eyebrow="What's on the table"
          suit="C"
          title={
            <>
              Built for the way <em>Bhabhi</em> is really played
            </>
          }
          lead="No filler modes and no gimmicks. Just the classic game, sharp opponents and a table worth sitting at."
        />
        <ul className="feat__grid">
          {features.map((f, i) => (
            <motion.li
              key={f.title}
              className="feat__cell"
              initial={{ opacity: 0, y: 50, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0, transition: { duration: 0.8, ease: EASE, delay: (i % 4) * 0.08 } }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <TiltCard className="feat__tilt">
                <article className="feat__card">
                  <span className={`feat__corner ${i % 4 === 1 || i % 4 === 3 ? 'red' : ''}`} aria-hidden="true">
                    {SUITS[i % 4]}
                  </span>
                  <span className="feat__icon">
                    <Icon name={f.icon} />
                  </span>
                  <h3 className="feat__title">{f.title}</h3>
                  <p className="feat__body">{f.body}</p>
                </article>
              </TiltCard>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
