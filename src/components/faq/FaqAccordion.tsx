import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Faq } from '../../content/faq';
import type { Suit } from '../cards/suits';
import { SuitMark } from '../ui/SectionHeader';
import './FaqAccordion.css';

const EASE = [0.22, 1, 0.36, 1] as const;

function Item({ faq, suit, open, onToggle }: { faq: Faq; suit: Suit; open: boolean; onToggle: () => void }) {
  const id = useId();
  const btnId = `${id}-q`;
  const panelId = `${id}-a`;
  return (
    <li className={`faq ${open ? 'is-open' : ''}`}>
      <h3 className="faq__h">
        <button id={btnId} type="button" className="faq__q" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
          <span className={`faq__pip ${suit === 'H' || suit === 'D' ? 'red' : ''}`} aria-hidden="true">
            <SuitMark suit={suit} />
          </span>
          <span className="faq__text">{faq.q}</span>
          <span className="faq__icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            className="faq__panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { height: { duration: 0.45, ease: EASE }, opacity: { duration: 0.3, delay: 0.1 } } }}
            exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.35, ease: EASE }, opacity: { duration: 0.15 } } }}
          >
            <motion.div
              className="faq__a"
              initial={{ y: -8 }}
              animate={{ y: 0, transition: { duration: 0.45, ease: EASE } }}
              exit={{ y: -8, transition: { duration: 0.2 } }}
            >
              {faq.a.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/** Accordion of question "cards". Several can be open at once; each is a real button with aria-expanded. */
export function FaqAccordion({ items, suit, defaultOpen = -1 }: { items: Faq[]; suit: Suit; defaultOpen?: number }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set(defaultOpen >= 0 ? [defaultOpen] : []));
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  return (
    <ul className="faq-list">
      {items.map((f, i) => (
        <Item key={f.q} faq={f} suit={suit} open={open.has(i)} onToggle={() => toggle(i)} />
      ))}
    </ul>
  );
}
