import { site } from '../../config/site';
import './Button.css';

/** Link to the game's Google Play listing. */
export function GooglePlayButton({ className = '' }: { className?: string }) {
  return (
    <a className={`play-btn ${className}`} href={site.playStoreUrl} target="_blank" rel="noopener noreferrer">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="#34A853" d="M3.6 1.8 13.3 11.5 3.6 21.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1Z" />
        <path fill="#FBBC04" d="m16.6 8.2-3.3 3.3 3.3 3.3 3.8-2.1c1-.6 1-2 0-2.5l-3.8-2Z" />
        <path fill="#4285F4" d="M3.6 21.2 13.3 11.5l3.3 3.3L5.3 21.1c-.6.4-1.2.4-1.7.1Z" />
        <path fill="#EA4335" d="M3.6 1.8c.5-.3 1.1-.3 1.7.1l11.3 6.3-3.3 3.3L3.6 1.8Z" />
      </svg>
      <span className="play-btn__text">
        <span className="play-btn__small">Get it on</span>
        <span className="play-btn__big">Google Play</span>
      </span>
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
