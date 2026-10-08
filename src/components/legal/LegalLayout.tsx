import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Block, LegalSection } from '../../content/legal';
import { site } from '../../config/site';
import { Reveal } from '../ui/Reveal';
import './LegalLayout.css';

function renderBlock(b: Block, i: number) {
  if (typeof b === 'string') return <p key={i}>{b}</p>;
  if ('list' in b)
    return (
      <ul key={i}>
        {b.list.map((li) => (
          <li key={li}>{li}</li>
        ))}
      </ul>
    );
  return (
    <p key={i} className="legal__note">
      {b.note}
    </p>
  );
}

/** Readable legal document: numbered sections, sticky contents with scroll-spy, and a summary card. */
export function LegalLayout({ sections, summary }: { sections: LegalSection[]; summary: string[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -65% 0px' },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [sections]);

  return (
    <section className="legal">
      <div className="container legal__grid">
        <aside className="legal__aside">
          <nav className="legal__toc" aria-label="Contents">
            <p className="label gold">Contents</p>
            <ol>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} aria-current={active === s.id ? 'location' : undefined}>
                    <span className="legal__toc-n">{String(i + 1).padStart(2, '0')}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="legal__doc">
          <Reveal className="legal__summary">
            <p className="label">In short</p>
            <ul>
              {summary.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Reveal>
          <p className="legal__updated">Last updated: {site.legalUpdated}</p>

          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="legal__section" aria-labelledby={`${s.id}-h`}>
              <h2 id={`${s.id}-h`}>
                <span className="legal__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s.title}
              </h2>
              {s.blocks.map(renderBlock)}
            </section>
          ))}

          <p className="legal__foot">
            See also: <Link to="/privacy">Privacy Policy</Link> · <Link to="/terms">Terms of Use</Link> ·{' '}
            <Link to="/delete-account">Delete Account</Link> ·{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </article>
      </div>
    </section>
  );
}
