import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/page/PageHeader';
import { ContactForm } from '../components/contact/ContactForm';
import { Icon } from '../components/ui/Icon';
import { Reveal } from '../components/ui/Reveal';
import { emailParts, site } from '../config/site';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import './Contact.css';

function CopyEmail() {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setState('copied');
    } catch {
      setState('failed');
    }
    window.setTimeout(() => setState('idle'), 2500);
  };
  return (
    <button type="button" className="ct__copy" onClick={copy}>
      <Icon name={state === 'copied' ? 'check' : 'copy'} />
      <span>{state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy failed: select the address' : 'Copy address'}</span>
      <span className="visually-hidden" aria-live="polite">
        {state === 'copied' ? 'Email address copied to clipboard' : ''}
      </span>
    </button>
  );
}

export default function Contact() {
  useDocumentMeta({
    title: 'Contact Us',
    description: `Get in touch with the Bhabhi Thulla team. Questions, feedback and bug reports are welcome at ${site.email}.`,
    path: '/contact',
  });

  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        suit="D"
        title="Pull up a chair and say hello."
        lead="Found a bug, have an idea for the table, or just want to argue about who should have been the Bhabhi? We’d love to hear from you."
        theme="royal"
        compact
        cards={[
          { rank: 'A', suit: 'D', face: 'royal', x: '68%', y: '22%', r: -8 },
          { back: 'royal', x: '80%', y: '16%', r: 14 },
        ]}
      />

      <section className="ct" aria-label="Contact details and form">
        <div className="container ct__grid">
          <div className="ct__side">
            <Reveal className="ct__mail">
              <p className="label gold">Write to us directly</p>
              <a className="ct__address" href={`mailto:${site.email}`}>
                <Icon name="mail" className="ct__mail-icon" />
                <span>
                  {emailParts[0]}@<wbr />
                  {emailParts[1]}
                </span>
              </a>
              <CopyEmail />
            </Reveal>

            <Reveal index={1} className="ct__tips">
              <h2 className="ct__tips-title">Reporting a problem?</h2>
              <p>These details help us fix things faster:</p>
              <ul>
                <li>Your phone or tablet model</li>
                <li>Your Android version</li>
                <li>Which table you were playing and what happened</li>
                <li>A screenshot, if you can</li>
              </ul>
            </Reveal>

            <Reveal index={2}>
              <p className="ct__faq">
                Quick question? The <Link to="/faqs">FAQs</Link> cover rules, bots, coins and devices.
              </p>
            </Reveal>
          </div>

          <Reveal index={1} amount={0.1}>
            <h2 className="visually-hidden">Contact form</h2>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
