import { motion, type Variants } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: i * 0.08 } }),
};

interface Props {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger index. */
  index?: number;
  amount?: number;
}

// motion.create must not run per render, or the element remounts every time.
const cache = new Map<ElementType, ElementType>();
const motionFor = (as: ElementType): ElementType => {
  let c = cache.get(as);
  if (!c) {
    c = motion.create(as as never) as unknown as ElementType;
    cache.set(as, c);
  }
  return c;
};

/** Fades content up once when it scrolls into view. Under reduced motion only opacity animates (MotionConfig). */
export function Reveal({ children, as = 'div', className, index = 0, amount = 0.25 }: Props) {
  const Comp = motionFor(as);
  return (
    <Comp
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      custom={index}
    >
      {children}
    </Comp>
  );
}
