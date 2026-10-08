import { PageHeader } from '../components/page/PageHeader';
import { LegalLayout } from '../components/legal/LegalLayout';
import { terms } from '../content/legal';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function Terms() {
  useDocumentMeta({
    title: 'Terms of Use',
    description: 'The terms for playing Bhabhi Thulla and using this website, including the rules on virtual coins, intellectual property and liability.',
    path: '/terms',
  });
  return (
    <>
      <PageHeader
        eyebrow="Terms of use"
        suit="C"
        title="The house rules."
        lead="The terms for playing Bhabhi Thulla and using this website, in plain language."
        theme="walnut"
        compact
        cards={[
          { rank: 'J', suit: 'C', x: '70%', y: '20%', r: -10 },
          { back: 'classic_red', x: '79%', y: '24%', r: 10 },
        ]}
      />
      <LegalLayout
        sections={terms}
        summary={[
          'Play the Game for your own personal entertainment.',
          'Coins are virtual. They have no real-world value and can’t be bought or cashed out.',
          'Please don’t copy, resell or tamper with the Game.',
          'The Game is provided as is, and features may change over time.',
        ]}
      />
    </>
  );
}
