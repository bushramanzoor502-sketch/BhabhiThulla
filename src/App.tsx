import { lazy, Suspense, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PageTransition, type Direction } from './components/layout/PageTransition';
import { legalLinks, navLinks } from './config/site';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import Home from './pages/Home';

// Home ships in the main bundle for the fastest first paint; the rest load on demand.
const About = lazy(() => import('./pages/About'));
const Faqs = lazy(() => import('./pages/Faqs'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Page order for transition direction: the nav tabs left to right, then any remaining legal pages.
// Unknown routes (404) count as the far right.
const PAGE_ORDER: string[] = [...new Set<string>([...navLinks.map((l) => l.to), ...legalLinks.map((l) => l.to)])];
const pageIndex = (path: string) => {
  const p = path.length > 1 ? path.replace(/\/+$/, '') : path;
  const i = PAGE_ORDER.indexOf(p);
  return i === -1 ? PAGE_ORDER.length : i;
};

/** Direction of the latest route change, worked out from where the current and destination pages sit. */
function useRouteDirection(pathname: string): Direction {
  const prev = useRef(pathname);
  const dir = useRef<Direction>(1);
  if (prev.current !== pathname) {
    dir.current = pageIndex(pathname) < pageIndex(prev.current) ? -1 : 1;
    prev.current = pathname;
  }
  return dir.current;
}

function PageFallback() {
  return <div className="felt" style={{ minHeight: '100vh' }} aria-busy="true" aria-label="Loading" />;
}

export default function App() {
  const location = useLocation();
  const direction = useRouteDirection(location.pathname);
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <ErrorBoundary>
        <AnimatePresence mode="wait" custom={direction} onExitComplete={() => window.scrollTo(0, 0)}>
          <PageTransition key={location.pathname} direction={direction}>
            <main id="main" tabIndex={-1}>
              <Suspense fallback={<PageFallback />}>
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/faqs" element={<Faqs />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </PageTransition>
        </AnimatePresence>
      </ErrorBoundary>
    </MotionConfig>
  );
}
