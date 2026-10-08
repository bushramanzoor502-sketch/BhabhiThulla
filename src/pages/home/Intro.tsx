import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { PlayingCard } from '../../components/cards/PlayingCard';
import { CardBack } from '../../components/cards/CardBack';
import { SectionHeader, SuitMark } from '../../components/ui/SectionHeader';
import { Reveal } from '../../components/ui/Reveal';
import { intro } from '../../content/home';
import './Intro.css';

/**
 * The hero's Ace of Spades carries on into this section: it hangs in a sticky column and turns
 * slowly as the three ideas of the game scroll past.
 */
export function Intro() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotY = useTransform(scrollYProgress, [0.1, 0.9], [-28, 28]);
  const rotZ = useTransform(scrollYProgress, [0.1, 0.9], [-6, 4]);
  const backY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="intro" aria-labelledby="intro-title">
      <div className="container intro__grid">
        <div className="intro__visual" aria-hidden="true">
          <div className="intro__sticky">
            <motion.div className="intro__under card" style={reduce ? undefined : { y: backY }}>
              <CardBack skin="emerald" />
            </motion.div>
            <motion.div className="intro__ace card" style={reduce ? undefined : { rotateY: rotY, rotateZ: rotZ }}>
              <PlayingCard rank="A" suit="S" decorative />
              <span className="intro__glare" />
            </motion.div>
          </div>
        </div>

        <div className="intro__copy">
          <SectionHeader
            id="intro-title"
            eyebrow="The game"
            title={
              <>
                Four seats. One deck. <em>Nowhere to hide.</em>
              </>
            }
            lead="Bhabhi Thulla brings the game you grew up playing to a premium card table on your phone: every rule, every groan when a Thulla lands, and three opponents who play to win."
          />
          <ol className="intro__list">
            {intro.map((item, i) => (
              <Reveal as="li" key={item.title} className="intro__item" index={i}>
                <span className={`intro__pip ${item.suit === 'H' ? 'red' : ''}`} aria-hidden="true">
                  <SuitMark suit={item.suit} />
                </span>
                <div>
                  <h3 className="intro__item-title">{item.title}</h3>
                  <p className="intro__item-body">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
