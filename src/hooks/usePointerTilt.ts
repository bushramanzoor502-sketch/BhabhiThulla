import { useCallback, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Cursor-driven 3D tilt. Writes CSS custom properties (--rx, --ry, --gx, --gy) in a rAF,
 * so React never re-renders and only `transform` changes. Disabled for touch and reduced motion.
 */
export function usePointerTilt<T extends HTMLElement>(max = 10) {
  const ref = useRef<T | null>(null);
  const frame = useRef(0);
  const reduce = useReducedMotion();

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      if (reduce || e.pointerType !== 'mouse') return;
      const el = ref.current;
      if (!el) return;
      const { clientX, clientY } = e;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = (clientX - r.left) / r.width - 0.5;
        const py = (clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--ry', `${(px * max * 2).toFixed(2)}deg`);
        el.style.setProperty('--rx', `${(-py * max * 2).toFixed(2)}deg`);
        el.style.setProperty('--gx', `${((px + 0.5) * 100).toFixed(1)}%`);
        el.style.setProperty('--gy', `${((py + 0.5) * 100).toFixed(1)}%`);
      });
    },
    [max, reduce],
  );

  const onPointerLeave = useCallback(() => {
    cancelAnimationFrame(frame.current);
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
