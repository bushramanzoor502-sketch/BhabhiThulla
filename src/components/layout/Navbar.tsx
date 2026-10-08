import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { legalLinks, navLinks, site } from '../../config/site';
import { SuitMark } from '../ui/SectionHeader';
import { LogoMark, Wordmark } from './Logo';
import './Navbar.css';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Stays true until the close animation finishes, so the header keeps its menu-safe styles.
  const [menuShown, setMenuShown] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Mobile menu: lock scroll, trap focus, close on Escape, restore focus on close.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusables = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    requestAnimationFrame(() => focusables()[0]?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const items = [toggle, ...focusables()].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      toggle?.focus();
    };
  }, [open]);

  const isActive = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to));

  return (
    <header className={`nav ${scrolled || open ? 'nav--solid' : ''} ${open || menuShown ? 'nav--open' : ''}`}>
      <div className="nav__inner container">
        <Link to="/" className="nav__brand" aria-label={`${site.name} home`}>
          <LogoMark className="nav__mark" />
          <Wordmark className="nav__wordmark" />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          <ul>
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === '/'} className="nav__link">
                  {l.label}
                  {isActive(l.to) && (
                    <motion.span className="nav__pip" layoutId="nav-pip" transition={{ type: 'spring', stiffness: 420, damping: 34 }}>
                      <SuitMark suit={l.suit} />
                    </motion.span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <a className="nav__cta" href={site.playStoreUrl} target="_blank" rel="noopener noreferrer">
          Get the game<span className="visually-hidden"> on Google Play (opens in a new tab)</span>
        </a>

        <button
          ref={toggleRef}
          className={`nav__toggle ${open ? 'is-open' : ''}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => {
            setMenuShown(true);
            setOpen((o) => !o);
          }}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence onExitComplete={() => setMenuShown(false)}>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            className="mmenu felt"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.55, ease: EASE } }}
            exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.4, ease: EASE, delay: 0.1 } }}
          >
            <nav aria-label="Mobile">
              <ul className="mmenu__list">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, x: -40, rotate: -4 }}
                    animate={{ opacity: 1, x: 0, rotate: 0, transition: { delay: 0.18 + i * 0.07, duration: 0.6, ease: EASE } }}
                    exit={{ opacity: 0, x: 30, transition: { duration: 0.2 } }}
                  >
                    <NavLink to={l.to} end={l.to === '/'} className="mmenu__link">
                      <span className={`mmenu__suit ${l.suit === 'H' || l.suit === 'D' ? 'red' : ''}`}>
                        <SuitMark suit={l.suit} />
                      </span>
                      <span className="mmenu__text">{l.label}</span>
                      {isActive(l.to) && <span className="mmenu__here label">You are here</span>}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="mmenu__foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <ul className="mmenu__legal">
                {legalLinks.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
              <a href={`mailto:${site.email}`} className="mmenu__mail">
                {site.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
