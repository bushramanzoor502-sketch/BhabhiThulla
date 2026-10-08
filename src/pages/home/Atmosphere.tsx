import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { PlayingCard } from '../../components/cards/PlayingCard';
import './Atmosphere.css';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The Thulla moment, full-bleed on the burgundy Walnut felt: a card slams onto the trick, the table
 * shakes once, and the in-game "THULLA!" banner lands. Plays a single time.
 */
export function Atmosphere() {
  const ref = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const inView = useInView(stage, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const state = inView ? 'show' : 'hidden';

  return (
    <section ref={ref} className="atm" aria-labelledby="atm-title">
      <motion.div className="atm__bg felt felt--walnut" style={reduce ? undefined : { y: bgY }} aria-hidden="true" />
      <div className="atm__vignette" aria-hidden="true" />

      <div className="container atm__grid">
        <div className="atm__copy">
          <p className="label gold">The moment everyone waits for</p>
          <h2 id="atm-title" className="atm__title">
            One card.
            <br />
            The whole table <em>turns.</em>
          </h2>
          <p className="atm__body">
            Diamonds were led and the trick is building. You have none left, so you drop a club. Play stops dead, and whoever laid
            the King of diamonds picks up the whole pile. That is the Thulla, and it is why nobody at the table is ever safe.
          </p>
        </div>

        <motion.div
          ref={stage}
          className="atm__stage"
          aria-hidden="true"
          initial="hidden"
          animate={state}
          variants={{ hidden: {}, show: { x: [0, -6, 5, -3, 0], transition: { delay: 1.05, duration: 0.35 } } }}
        >
          <motion.div className="atm__c atm__c1 card" variants={{ hidden: { opacity: 0, y: -40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}>
            <PlayingCard rank="9" suit="D" decorative />
          </motion.div>
          <motion.div className="atm__c atm__c2 card" variants={{ hidden: { opacity: 0, y: -40 }, show: { opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.6, ease: EASE } } }}>
            <PlayingCard rank="K" suit="D" decorative />
          </motion.div>
          <motion.div className="atm__c atm__c3 card" variants={{ hidden: { opacity: 0, y: -40 }, show: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.6, ease: EASE } } }}>
            <PlayingCard rank="5" suit="D" decorative />
          </motion.div>
          <motion.div
            className="atm__c atm__slam card"
            variants={{
              hidden: { opacity: 0, scale: 2.4, rotate: 30, y: -80 },
              show: { opacity: 1, scale: 1, rotate: 11, y: 0, transition: { delay: 0.8, duration: 0.3, ease: [0.55, 0, 0.9, 0.3] } },
            }}
          >
            <PlayingCard rank="A" suit="C" decorative />
          </motion.div>
          <motion.span
            className="atm__ring"
            variants={{ hidden: { opacity: 0, scale: 0.4 }, show: { opacity: [0, 0.9, 0], scale: [0.4, 1.6, 2], transition: { delay: 1.08, duration: 0.9 } } }}
          />
          <motion.div
            className="atm__banner"
            variants={{
              hidden: { opacity: 0, scale: 1.8, rotateX: 70 },
              show: { opacity: 1, scale: 1, rotateX: 0, transition: { delay: 1.2, duration: 0.6, ease: EASE } },
            }}
          >
            <span className="atm__banner-big">Thulla!</span>
            <span className="atm__banner-small label">King of diamonds picks up</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
