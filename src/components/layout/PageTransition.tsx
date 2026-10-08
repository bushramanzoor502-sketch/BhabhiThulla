import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { CardBack } from '../cards/CardBack';
import './PageTransition.css';

const EASE = [0.65, 0, 0.35, 1] as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * 1 = moving to a tab further right in the nav (the new page arrives from the right),
 * -1 = moving to a tab further left (the new page arrives from the left).
 */
export type Direction = 1 | -1;

// The curtain always travels the same way through a transition: it slides in from the side the new page
// comes from, covers the screen, then carries on out the opposite side.
const curtain: Variants = {
  initial: { x: '0%' },
  enter: (dir: Direction) => ({ x: dir > 0 ? '-102%' : '102%', transition: { duration: 0.65, ease: EASE, delay: 0.05 } }),
  exit: (dir: Direction) => ({ x: [dir > 0 ? '102%' : '-102%', '0%'], transition: { duration: 0.5, ease: EASE } }),
};

const content: Variants = {
  initial: (dir: Direction) => ({ opacity: 0, x: dir * 60 }),
  enter: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.25 } },
  exit: (dir: Direction) => ({ opacity: 0, x: dir * -40, transition: { duration: 0.3 } }),
};

const fade: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/**
 * Route transition: a felt "curtain" with a card back sweeps across like a card slid over the table,
 * in the direction of travel between nav tabs. AnimatePresence passes the latest direction to the
 * exiting page via `custom`. Reduced motion gets a plain cross-fade.
 */
export function PageTransition({ children, direction }: { children: ReactNode; direction: Direction }) {
  const reduce = useReducedMotion();
  return (
    <>
      <motion.div
        className="pt__content"
        custom={direction}
        variants={reduce ? fade : content}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
      {!reduce && (
        <motion.div
          className="pt__curtain felt"
          aria-hidden="true"
          custom={direction}
          variants={curtain}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <div className="pt__card" style={{ rotate: `${direction * -8}deg` }}>
            <CardBack skin="emerald" />
          </div>
        </motion.div>
      )}
    </>
  );
}
