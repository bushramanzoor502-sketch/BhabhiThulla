import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PageTransition } from './components/layout/PageTransition';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import Home from './pages/Home';

// Home ships in the main bundle for the fastest first paint; the rest load on demand.
const About = lazy(() => import('./pages/About'));
const Faqs = lazy(() => import('./pages/Faqs'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageFallback() {
  return <div className="felt" style={{ minHeight: '100vh' }} aria-busy="true" aria-label="Loading" />;
}

export default function App() {
  const location = useLocation();
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <ErrorBoundary>
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <PageTransition key={location.pathname}>
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
