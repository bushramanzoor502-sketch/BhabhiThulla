import { motion } from 'framer-motion';
import { PageHeader } from '../components/page/PageHeader';
import { PlayingCard, type Rank } from '../components/cards/PlayingCard';
import type { Suit } from '../components/cards/suits';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Icon, type IconName } from '../components/ui/Icon';
import { Reveal } from '../components/ui/Reveal';
import { GooglePlayButton } from '../components/ui/GooglePlayButton';
import { Button } from '../components/ui/Button';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import './About.css';

const EASE = [0.22, 1, 0.36, 1] as const;

const chapters: { rank: Rank; suit: Suit; kicker: string; title: string; body: string[] }[] = [
  {
    rank: 'A',
    suit: 'S',
    kicker: 'Chapter one',
    title: 'What Bhabhi Thulla is',
    body: [
      'Bhabhi Thulla is the classic card game Bhabhi, also known as Thulla, made for Android. Four seats around one table, one 52-card deck, and a simple goal: get rid of every card before anyone else does.',
      'It follows the popular Pakistani rules, from the Ace of Spades opening to the Thulla that sends a whole trick back into someone’s hand, and the rare Haath that lets you take a rival’s cards.',
    ],
  },
  {
    rank: 'K',
    suit: 'H',
    kicker: 'Chapter two',
    title: 'Why it was made',
    body: [
      'Bhabhi is a game of family gatherings, cousins on the floor and long evenings that end with someone crowned the Bhabhi. But four players are not always in the same room.',
      'Bhabhi Thulla was made so you can take a seat whenever you want, even with no internet connection, against opponents who play the game properly instead of throwing random cards.',
    ],
  },
  {
    rank: 'Q',
    suit: 'C',
    kicker: 'Chapter three',
    title: 'The vision',
    body: [
      'A traditional game deserves the care of a premium title. That means card art drawn for the game, tables lit like a real card room, and a rules engine that applies every rule exactly, every time.',
      'It also means the classic rules are left alone. No power-ups and no shortcuts, just the game as it is played at home.',
    ],
  },
  {
    rank: 'J',
    suit: 'D',
    kicker: 'Chapter four',
    title: 'The experience at the table',
    body: [
      'Fast, tense and fair. A 15-second turn timer keeps the pace up. Each bot has its own temperament, and every bot only knows what it has seen played, exactly like a human would.',
      'Climb from the Casual table to Elite, and feel every Thulla land with sound and a buzz in your hand.',
    ],
  },
];

const principles: { icon: IconName; title: string; body: string }[] = [
  { icon: 'shield', title: 'Fair by design', body: 'Bots never see hidden cards. They play from what is on the table and what they remember.' },
  { icon: 'tables', title: 'True to the rules', body: 'Rules are applied by the game engine itself, so a misplay can never slip through.' },
  { icon: 'coins', title: 'No pay to win', body: 'Coins are virtual and earned at the table. There are no in-app purchases.' },
  { icon: 'offline', title: 'Private by default', body: 'The game works offline and keeps your guest progress on your own device.' },
];

export default function About() {
  useDocumentMeta({
    title: 'About Us',
    description:
      'The story behind Bhabhi Thulla: the classic South Asian card game Bhabhi, rebuilt for Android with faithful Pakistani rules, fair AI opponents and a premium card-room table.',
    path: '/about',
  });

  return (
    <>
      <PageHeader
        eyebrow="About us"
        suit="H"
        title="A family card game, given the table it deserves."
        lead="Bhabhi Thulla is about one thing: the classic game of Bhabhi, played well, on a table that feels like the real card room."
        theme="walnut"
        cards={[
          { back: 'emerald', x: '62%', y: '18%', r: -14 },
          { rank: 'K', suit: 'H', x: '72%', y: '30%', r: 6 },
          { back: 'onyx', x: '83%', y: '14%', r: 18 },
        ]}
      />

      <section className="about-ch" aria-label="Our story">
        <div className="container">
          <ol className="about-ch__list">
            {chapters.map((c, i) => (
              <li key={c.title} className={`about-ch__item ${i % 2 ? 'is-flip' : ''}`}>
                <motion.div
                  className="about-ch__card card"
                  aria-hidden="true"
                  initial={{ opacity: 0, rotateY: 90, rotate: i % 2 ? 6 : -6 }}
                  whileInView={{ opacity: 1, rotateY: 0, rotate: i % 2 ? 4 : -4, transition: { duration: 1, ease: EASE } }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <PlayingCard rank={c.rank} suit={c.suit} face={i === 2 ? 'royal' : 'ivory'} decorative />
                </motion.div>
                <Reveal className="about-ch__text">
                  <p className="label gold">{c.kicker}</p>
                  <h2 className="about-ch__title">{c.title}</h2>
                  {c.body.map((p, k) => (
                    <p key={k} className="about-ch__p">
                      {p}
                    </p>
                  ))}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="about-pr" aria-labelledby="about-pr-title">
        <div className="container">
          <SectionHeader
            id="about-pr-title"
            eyebrow="What we hold to"
            suit="S"
            align="center"
            title={
              <>
                Four promises, <em>one per suit</em>
              </>
            }
          />
          <ul className="about-pr__grid">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} index={i} className="about-pr__item">
                <span className="about-pr__icon">
                  <Icon name={p.icon} />
                </span>
                <h3 className="about-pr__title">{p.title}</h3>
                <p className="about-pr__body">{p.body}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className="about-pr__cta">
            <GooglePlayButton />
            <Button to="/contact" variant="ghost">
              Say hello
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
