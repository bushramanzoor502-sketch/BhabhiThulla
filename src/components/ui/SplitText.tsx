import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount (true) or when scrolled into view (false). */
  immediate?: boolean;
}

/**
 * Letter-by-letter reveal. Each glyph rises out of a clipping line, like a card slid out of a deck.
 * The full string stays available to assistive tech via a visually hidden copy.
 */
export function SplitText({ text, className, delay = 0, stagger = 0.035, immediate = true }: Props) {
  const words = text.split(' ');
  let n = 0;
  const trigger = immediate ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.6 } };
  return (
    <motion.span className={`split ${className ?? ''}`} initial="hidden" {...trigger}>
      <span className="visually-hidden">{text}</span>
      {words.map((w, wi) => (
        <span className="split__word" key={wi} aria-hidden="true">
          {[...w].map((ch, ci) => {
            const i = n++;
            return (
              <span className="split__clip" key={ci}>
                <motion.span
                  className="split__char"
                  variants={{
                    hidden: { y: '110%', rotate: 8, opacity: 0 },
                    show: { y: '0%', rotate: 0, opacity: 1, transition: { duration: 0.9, ease: EASE, delay: delay + i * stagger } },
                  }}
                >
                  {ch}
                </motion.span>
              </span>
            );
          })}
          {wi < words.length - 1 && ' '}
        </span>
      ))}
    </motion.span>
  );
}
