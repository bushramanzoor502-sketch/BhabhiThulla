import { Link } from 'react-router-dom';
import { PageHeader } from '../components/page/PageHeader';
import { FaqAccordion } from '../components/faq/FaqAccordion';
import { SuitMark } from '../components/ui/SectionHeader';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import { faqGroups } from '../content/faq';
import { site } from '../config/site';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import './Faqs.css';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqGroups.flatMap((g) =>
    g.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.join(' ') } })),
  ),
};

export default function Faqs() {
  useDocumentMeta({
    title: 'FAQs',
    description:
      'Answers about Bhabhi Thulla: the rules, the Thulla and the Haath, AI opponents, coins and levels, offline play, supported devices and how to get help.',
    path: '/faqs',
  });

  return (
    <>
      <PageHeader
        eyebrow="Frequently asked"
        suit="C"
        title="Questions from the table."
        lead="Rules, bots, coins and devices. If your question isn't here, just ask."
        theme="graphite"
        compact
        cards={[
          { back: 'spider', x: '66%', y: '20%', r: -10 },
          { rank: 'Q', suit: 'C', face: 'noir', x: '78%', y: '28%', r: 12 },
        ]}
      />

      <section className="faqs" aria-label="Frequently asked questions">
        <div className="container faqs__grid">
          <nav className="faqs__toc" aria-label="FAQ topics">
            <p className="label gold">Topics</p>
            <ul>
              {faqGroups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`}>
                    <SuitMark suit={g.suit} className={`faqs__toc-pip ${g.suit === 'H' || g.suit === 'D' ? 'red' : ''}`} />
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="faqs__groups">
            {faqGroups.map((g, gi) => (
              <section key={g.id} id={g.id} className="faqs__group" aria-labelledby={`${g.id}-h`}>
                <Reveal>
                  <h2 id={`${g.id}-h`} className="faqs__group-title">
                    <SuitMark suit={g.suit} className={`faqs__group-pip ${g.suit === 'H' || g.suit === 'D' ? 'red' : ''}`} />
                    {g.title}
                  </h2>
                </Reveal>
                <Reveal index={1} amount={0.05}>
                  <FaqAccordion items={g.items} suit={g.suit} defaultOpen={gi === 0 ? 0 : -1} />
                </Reveal>
              </section>
            ))}

            <Reveal className="faqs__more">
              <h2 className="faqs__more-title">Still holding a question?</h2>
              <p>
                Write to <a href={`mailto:${site.email}`}>{site.email}</a> or send a message through the{' '}
                <Link to="/contact">contact page</Link>.
              </p>
              <Button to="/contact">Contact us</Button>
            </Reveal>
          </div>
        </div>
      </section>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  );
}
