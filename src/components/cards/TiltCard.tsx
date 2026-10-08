import type { ReactNode } from 'react';
import { usePointerTilt } from '../../hooks/usePointerTilt';
import './TiltCard.css';

interface Props {
  children: ReactNode;
  className?: string;
  max?: number;
  as?: 'div' | 'li' | 'article';
}

/** A panel that tilts toward the cursor with a moving glare, like a card picked up off the felt. */
export function TiltCard({ children, className = '', max = 8, as: Tag = 'div' }: Props) {
  const { ref, onPointerMove, onPointerLeave } = usePointerTilt<HTMLDivElement>(max);
  return (
    <Tag className={`tilt ${className}`}>
      <div ref={ref} className="tilt__inner" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
        {children}
        <span className="tilt__glare" aria-hidden="true" />
      </div>
    </Tag>
  );
}
