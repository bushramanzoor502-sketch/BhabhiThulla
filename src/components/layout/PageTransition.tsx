import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { CardBack } from '../cards/CardBack';
import './PageTransition.css';

const EASE = [0.65, 0, 0.35, 1] as const;

/**
 * Route transition: a felt "curtain" with a card back sweeps across like a card slid over the table,
 * then reveals the next page. Reduced motion gets a plain cross-fade.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <>
      <motion.div
        className="pt__content"
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : 0.25 } }}
        exit={{ opacity: 0, transition: { duration: reduce ? 0.15 : 0.3 } }}
      >
        {children}
      </motion.div>
      {!reduce && (
        <motion.div
          className="pt__curtain felt"
          aria-hidden="true"
          initial={{ x: '0%' }}
          animate={{ x: '102%', transition: { duration: 0.65, ease: EASE, delay: 0.05 } }}
          exit={{ x: ['-102%', '0%'], transition: { duration: 0.5, ease: EASE } }}
        >
          <div className="pt__card">
            <CardBack skin="emerald" />
          </div>
        </motion.div>
      )}
    </>
  );
}
