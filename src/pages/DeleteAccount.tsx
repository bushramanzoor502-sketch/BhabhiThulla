import { Fragment, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/page/PageHeader';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { SuitMark } from '../components/ui/SectionHeader';
import { emailParts, site } from '../config/site';
import { choices, coverage, guides, request, summary, type GuideBlock, type GuideSection, type Rich } from '../content/deleteAccount';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import './DeleteAccount.css';

/** Renders the guide's light markup: **bold** and [label](https://…). */
function renderRich(text: Rich): ReactNode {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const bold = /^\*\*([^*]+)\*\*$/.exec(part);
    if (bold) return <strong key={i}>{bold[1]}</strong>;
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link)
      return (
        <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer">
          {link[1]}
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      );
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function Steps({ steps }: { steps: Rich[] }) {
  return (
    <ol className="da__steps">
      {steps.map((s, i) => (
        <li key={i}>
          <span className="da__step-n" aria-hidden="true">
            {i + 1}
          </span>
          <p>{renderRich(s)}</p>
        </li>
      ))}
    </ol>
  );
}

function renderBlock(b: GuideBlock, i: number) {
  if ('p' in b) return <p key={i}>{renderRich(b.p)}</p>;
  if ('steps' in b) return <Steps key={i} steps={b.steps} />;
  if ('options' in b)
    return (
      <div key={i} className="da__options">
        {b.options.map((o) => (
          <div key={o.title} className="da__option">
            <h3>{o.title}</h3>
            <Steps steps={o.steps} />
          </div>
        ))}
      </div>
    );
  return (
    <p key={i} className={`da__note da__note--${b.tone}`}>
      <span className="label">{b.tone === 'warn' ? 'Important' : 'Good to know'}</span>
      {renderRich(b.note)}
    </p>
  );
}

const STATUS = { now: 'Available now', soon: 'Coming soon' } as const;

function Guide({ g, n }: { g: GuideSection; n: number }) {
  return (
    <section id={g.id} className="da__section" aria-labelledby={`${g.id}-h`}>
      <div className="da__section-head">
        <span className="da__n" aria-hidden="true">
          {String(n).padStart(2, '0')}
        </span>
        <h2 id={`${g.id}-h`}>{g.title}</h2>
        {g.status && <span className={`da__badge da__badge--${g.status}`}>{STATUS[g.status]}</span>}
      </div>
      {g.blocks.map(renderBlock)}
    </section>
  );
}

const cell = (v: boolean | string) =>
  v === true ? (
    <span className="da__yes">
      <Icon name="check" />
      Deleted
    </span>
  ) : v === false ? (
    <span className="da__no">Kept</span>
  ) : (
    <span className="da__see">{v}</span>
  );

export default function DeleteAccount() {
  useDocumentMeta({
    title: 'Delete Account',
    description: `How to permanently delete your ${site.name} account and data: erase your guest profile in the game, clear the app's storage, remove Android backups, and request deletion by email.`,
    path: '/delete-account',
  });

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(request.subject)}&body=${encodeURIComponent(request.body)}`;

  return (
    <>
      <PageHeader
        eyebrow="Delete account"
        suit="H"
        title="Leave the table, cleanly."
        lead={`Step-by-step instructions to permanently delete your ${site.name} account and everything linked to it: on your phone, in Android backup and, once sign-in arrives, from Google and Facebook.`}
        theme="walnut"
        compact
        cards={[
          { rank: 'K', suit: 'H', x: '68%', y: '20%', r: -10 },
          { back: 'emerald', x: '79%', y: '26%', r: 9 },
        ]}
      />

      <section className="da">
        <div className="container da__wrap">
          <Reveal className="da__summary">
            <p className="label">In short</p>
            <ul>
              {summary.map((s) => (
                <li key={s}>{renderRich(s)}</li>
              ))}
            </ul>
          </Reveal>
          <p className="da__updated">Last updated: {site.legalUpdated}</p>

          <nav className="da__choose" aria-labelledby="da-choose-h">
            <h2 id="da-choose-h" className="da__choose-title">
              How do you play?
            </h2>
            <ul>
              {choices.map((c, i) => (
                <Reveal as="li" key={c.href} index={i}>
                  <a href={c.href} className="da__choice">
                    <span className={`da__choice-pip ${c.suit === 'H' || c.suit === 'D' ? 'red' : ''}`}>
                      <SuitMark suit={c.suit} />
                    </span>
                    <span className="da__choice-title">{c.title}</span>
                    <span className="da__choice-status label">{c.status}</span>
                    <Icon name="arrow" className="da__choice-arrow" />
                  </a>
                </Reveal>
              ))}
            </ul>
          </nav>

          {guides.map((g, i) => (
            <Guide key={g.id} g={g} n={i + 1} />
          ))}

          <section id={request.id} className="da__section" aria-labelledby={`${request.id}-h`}>
            <div className="da__section-head">
              <span className="da__n" aria-hidden="true">
                {String(guides.length + 1).padStart(2, '0')}
              </span>
              <h2 id={`${request.id}-h`}>{request.title}</h2>
            </div>
            <p>{request.intro}</p>
            <div className="da__request">
              <Button href={mailto} icon={<Icon name="mail" className="da__btn-icon" />}>
                Request deletion by email
              </Button>
              <p className="da__request-alt">
                Or write to{' '}
                <a href={`mailto:${site.email}`}>
                  {emailParts[0]}@<wbr />
                  {emailParts[1]}
                </a>{' '}
                with the subject “{request.subject}”.
              </p>
            </div>
            <h3 className="da__sub">What happens next</h3>
            <Steps steps={request.next} />
          </section>

          <section id="what-is-deleted" className="da__section" aria-labelledby="what-is-deleted-h">
            <div className="da__section-head">
              <span className="da__n" aria-hidden="true">
                {String(guides.length + 2).padStart(2, '0')}
              </span>
              <h2 id="what-is-deleted-h">What each option deletes</h2>
            </div>
            <div className="da__table-wrap">
              <table className="da__table">
                <thead>
                  <tr>
                    <th scope="col">Data</th>
                    <th scope="col">Tap Switch</th>
                    <th scope="col">Clear storage or uninstall</th>
                  </tr>
                </thead>
                <tbody>
                  {coverage.map((r) => (
                    <tr key={r.data}>
                      <th scope="row">
                        <span className="da__data">{r.data}</span>
                        <span className="da__detail">{r.detail}</span>
                      </th>
                      <td data-label="Tap Switch">{cell(r.switchBtn)}</td>
                      <td data-label="Clear storage or uninstall">{cell(r.clear)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="da__note da__note--warn">
              <span className="label">Please note</span>
              Deletion is permanent. Coins are virtual and are never sold, so there is nothing to refund, and deleted
              progress cannot be brought back.
            </p>
          </section>

          <p className="da__foot">
            See also: <Link to="/privacy">Privacy Policy</Link> · <Link to="/terms">Terms of Use</Link> ·{' '}
            <Link to="/faqs">FAQs</Link> · <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </section>
    </>
  );
}
