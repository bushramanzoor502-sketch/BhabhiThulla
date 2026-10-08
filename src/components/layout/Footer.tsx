import { Link } from 'react-router-dom';
import { emailParts, legalLinks, navLinks, site } from '../../config/site';
import { GooglePlayButton } from '../ui/GooglePlayButton';
import { SuitMark } from '../ui/SectionHeader';
import { LogoMark, Wordmark } from './Logo';
import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__rail" aria-hidden="true" />
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="footer__logo" aria-label={`${site.name} home`}>
            <LogoMark className="footer__mark" />
            <Wordmark className="footer__wordmark" />
          </Link>
          <p className="footer__blurb">
            The classic South Asian card game on a four-seat table. Follow suit, survive the Thulla and get away before you
            become the Bhabhi.
          </p>
          <GooglePlayButton />
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h2 className="footer__heading label">Explore</h2>
          <ul>
            {navLinks
              .filter((l) => !legalLinks.some((g) => g.to === l.to))
              .map((l) => (
              <li key={l.to}>
                <Link to={l.to}>
                  <SuitMark suit={l.suit} className={`footer__pip ${l.suit === 'H' || l.suit === 'D' ? 'red' : ''}`} />
                  {l.label === 'About' ? 'About Us' : l.label === 'Contact' ? 'Contact Us' : l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col" aria-label="Legal">
          <h2 className="footer__heading label">The fine print</h2>
          <ul>
            {legalLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h2 className="footer__heading label">Get in touch</h2>
          <a className="footer__email" href={`mailto:${site.email}`}>
            {emailParts[0]}@<wbr />
            {emailParts[1]}
          </a>
          <p className="footer__note">Questions, bug reports and feedback are all welcome.</p>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <p className="footer__tag">{site.tagline}</p>
      </div>
    </footer>
  );
}
