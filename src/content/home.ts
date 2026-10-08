/** Home page copy. Every rule and feature below is implemented in the Android project (see docs/RULES.md). */

export const intro = [
  {
    suit: 'S' as const,
    title: 'A card-room classic',
    body: 'Bhabhi, also called Thulla, is the shedding game played around family tables across Pakistan and India. Four players, one deck, and everyone racing to empty their hand.',
  },
  {
    suit: 'H' as const,
    title: "Don't be the Bhabhi",
    body: 'Empty your hand and you get away. The last player still holding cards is crowned the Bhabhi, and the whole table knows it.',
  },
  {
    suit: 'C' as const,
    title: 'One card turns the table',
    body: 'Run out of the suit that was led and you can drop any card on the trick. That is a Thulla: play stops dead, and the highest card of the led suit picks up the whole pile.',
  },
];

export type StepVisual = 'deal' | 'ace' | 'follow' | 'thulla' | 'result';

export const steps: { rank: string; title: string; body: string; visual: StepVisual }[] = [
  {
    rank: 'A',
    title: 'Shuffle & deal',
    body: 'One 52-card deck, no jokers, Aces high. Thirteen cards to each of the four seats. Play runs anticlockwise.',
    visual: 'deal',
  },
  {
    rank: '2',
    title: 'The Ace of Spades opens',
    body: 'Whoever holds the A♠ must lead it, and everyone follows with a spade if they can. The opening trick goes straight to the waste. It can never be a Thulla.',
    visual: 'ace',
  },
  {
    rank: '3',
    title: 'Follow suit, win Power',
    body: 'Lead any card and the others must follow suit if they can. On a clean trick the highest card wins, the cards go to the waste for good, and the winner takes Power to lead next.',
    visual: 'follow',
  },
  {
    rank: '4',
    title: 'Thulla!',
    body: 'No card of the led suit? Play anything. The trick stops right there, and whoever played the highest card of the led suit picks up every card on it, then leads.',
    visual: 'thulla',
  },
  {
    rank: '5',
    title: 'Get away, or be the Bhabhi',
    body: 'Play your last card and you GOT AWAY. Players are ranked in the order they escape. The last one holding cards is the Bhabhi.',
    visual: 'result',
  },
];

export type FeatureIcon = 'brain' | 'masks' | 'offline' | 'tables' | 'coins' | 'timer' | 'haath' | 'sound';

export const features: { icon: FeatureIcon; title: string; body: string }[] = [
  {
    icon: 'brain',
    title: 'Bots that actually think',
    body: 'Your three opponents run a trained model right on your phone. They remember who has run out of which suit, and they never peek at hidden cards.',
  },
  {
    icon: 'masks',
    title: 'Three temperaments',
    body: 'Every seat has its own style of play: a Cautious player on your left, a Balanced one across the table and a Bold one on your right.',
  },
  {
    icon: 'offline',
    title: 'Play anywhere, offline',
    body: 'No internet connection and no sign-up needed. Tap Continue as Guest and your seat is ready.',
  },
  {
    icon: 'tables',
    title: 'Seven tables to climb',
    body: 'From Casual to Elite, each table has its own felt, card deck, entry fee and prize.',
  },
  {
    icon: 'coins',
    title: 'Coins & levels',
    body: 'Start with 25,000 coins. Get away first to win the prize, level up every two wins and unlock the high tables.',
  },
  {
    icon: 'timer',
    title: '15-second turns',
    body: 'A timer ring keeps the table moving. Miss twice and Auto mode plays for you until you tap TAKE CONTROL.',
  },
  {
    icon: 'haath',
    title: 'Take the Haath',
    body: "Holding Power with three or more players left? Before you lead, you can take the next player's entire hand.",
  },
  {
    icon: 'sound',
    title: 'Feel every Thulla',
    body: 'Original card sounds, an ambient table soundtrack and haptic feedback when a Thulla hits. Music and effects can each be switched off.',
  },
];
