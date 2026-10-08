import { Component, type ErrorInfo, type ReactNode } from 'react';
import { site } from '../../config/site';

interface State {
  error: Error | null;
}

/** Catches render errors (including a failed lazy chunk) and shows a themed recovery screen instead of a blank page. */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Bhabhi Thulla: render error', error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="felt" role="alert" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '32rem', display: 'grid', gap: '1.25rem', justifyItems: 'center' }}>
          <p className="label gold">Misdeal</p>
          <h1 style={{ fontSize: 'var(--fs-h2)' }}>The cards slipped off the table.</h1>
          <p style={{ color: 'var(--ivory-dim)' }}>
            Something went wrong while loading this page. Reloading usually fixes it. If it keeps happening, let us know at{' '}
            <a href={`mailto:${site.email}`} className="gold">
              {site.email}
            </a>
            .
          </p>
          <button className="btn btn--gold" type="button" onClick={() => window.location.reload()}>
            <span className="btn__label">Reload</span>
          </button>
        </div>
      </div>
    );
  }
}
