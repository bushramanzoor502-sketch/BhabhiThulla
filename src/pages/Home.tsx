import { useRef } from 'react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { site } from '../config/site';
import { Hero } from './home/Hero';
import { Intro } from './home/Intro';
import { HowToPlay } from './home/HowToPlay';
import { Features } from './home/Features';
import { Tables } from './home/Tables';
import { Showcase } from './home/Showcase';
import { Atmosphere } from './home/Atmosphere';
import { FinalCta } from './home/FinalCta';

/** INTRO → TABLE → CARDS → GAMEPLAY → STRATEGY → CTA */
export default function Home() {
  const rules = useRef<HTMLElement>(null);
  useDocumentMeta({
    title: `${site.name} | ${site.tagline}`,
    description:
      'Bhabhi Thulla is the classic South Asian card game for Android. Sit at a four-seat table against three smart bots, follow suit, survive the Thulla and get away before you become the Bhabhi.',
    path: '/',
  });

  const scrollToRules = () => {
    const el = rules.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    el.focus({ preventScroll: true });
  };

  return (
    <>
      <Hero onLearn={scrollToRules} />
      <Intro />
      <HowToPlay ref={rules} />
      <Features />
      <Tables />
      <Showcase />
      <Atmosphere />
      <FinalCta />
    </>
  );
}
