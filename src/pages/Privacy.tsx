import { PageHeader } from '../components/page/PageHeader';
import { LegalLayout } from '../components/legal/LegalLayout';
import { privacy } from '../content/legal';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function Privacy() {
  useDocumentMeta({
    title: 'Privacy Policy',
    description:
      'Bhabhi Thulla privacy policy: the game works offline, collects no personal data, has no ads or analytics, and keeps your guest progress on your own device.',
    path: '/privacy',
  });
  return (
    <>
      <PageHeader
        eyebrow="Privacy policy"
        suit="S"
        title="Your cards stay in your hand."
        lead="Bhabhi Thulla works offline and collects no personal data. Here is exactly what is stored, and where."
        compact
        cards={[
          { back: 'classic_blue', x: '70%', y: '22%', r: -12 },
          { back: 'classic_blue', x: '76%', y: '26%', r: 4 },
        ]}
      />
      <LegalLayout
        sections={privacy}
        summary={[
          'No personal data is collected, and the Game never connects to the internet.',
          'Your guest profile, coins and settings are saved only on your device.',
          'No ads, no analytics, no tracking and no in-app purchases.',
          'This website uses no cookies or trackers.',
        ]}
      />
    </>
  );
}
