import { site } from '../config/site';
import type { Suit } from '../components/cards/suits';

export interface Faq {
  q: string;
  a: string[];
}

export interface FaqGroup {
  id: string;
  title: string;
  suit: Suit;
  items: Faq[];
}

/** Every answer reflects the Android project as built. Nothing here promises unreleased features. */
export const faqGroups: FaqGroup[] = [
  {
    id: 'game',
    title: 'The game',
    suit: 'S',
    items: [
      {
        q: 'What is Bhabhi Thulla?',
        a: [
          'Bhabhi Thulla is the classic South Asian card game Bhabhi (also called Thulla) for Android. You sit at a four-seat table with three computer opponents, and everyone races to empty their hand. The last player still holding cards becomes the Bhabhi.',
        ],
      },
      {
        q: 'How does the game work?',
        a: [
          'A standard 52-card deck is dealt out, 13 cards each, and play runs anticlockwise. The player holding the Ace of Spades leads it to open the game. After that, the player with Power leads any card and everyone else must follow suit if they can.',
          'If everyone follows suit, the highest card wins, the cards go to the waste pile, and the winner gets Power. Players drop out as they empty their hands, and the last one left holding cards is the Bhabhi.',
        ],
      },
      {
        q: 'What is a Thulla?',
        a: [
          'When you have no card of the suit that was led, you may play any card. That is a Thulla. The trick stops immediately, and the player who played the highest card of the led suit has to pick up every card in the trick. The very first trick of a game can never be a Thulla.',
        ],
      },
      {
        q: 'What is the Haath?',
        a: [
          'Before leading, the player holding Power may take the entire hand of the next active player. This is never allowed on the first trick and needs at least three players still in the game. The player whose hand was taken is counted as having got away.',
        ],
      },
    ],
  },
  {
    id: 'playing',
    title: 'Playing',
    suit: 'H',
    items: [
      {
        q: 'How do I start playing?',
        a: [
          'Install the game, tap Continue as Guest, then swipe through the lobby to choose a table and tap PLAY. On your turn, tap a card to play it. Cards you are not allowed to play are dimmed, so you can never make an illegal move by mistake.',
        ],
      },
      {
        q: 'Can I play with friends? Is multiplayer supported?',
        a: [
          'Right now you play against three AI opponents on your own device. Online play with friends is not available in the current version of the game.',
        ],
      },
      {
        q: 'Do the bots cheat?',
        a: [
          'No. The bots never see anyone else’s hidden cards. They decide using a trained model that runs on your phone, together with what they have seen played, such as who has already run out of a suit. Each seat also has its own temperament: Cautious, Balanced or Bold.',
        ],
      },
      {
        q: 'What happens if I take too long on my turn?',
        a: [
          'Each turn has a 15-second timer. If it runs out, a card is played for you. After two timeouts, Auto mode takes over and keeps playing for you until you tap a card or press TAKE CONTROL.',
        ],
      },
    ],
  },
  {
    id: 'account',
    title: 'Coins, account & progress',
    suit: 'C',
    items: [
      {
        q: 'Is the game free? Are there in-app purchases?',
        a: [
          'Bhabhi Thulla contains no in-app purchases and no ads. Coins are virtual: every new player starts with 25,000, and you win more by getting away first. Coins have no real-world value and cannot be bought, sold or cashed out.',
        ],
      },
      {
        q: 'Is an account required?',
        a: [
          'No. Tap Continue as Guest and you can play straight away. Your guest profile, coins and level are stored on your device. Google and Facebook sign-in buttons appear in the app but are marked as coming soon.',
        ],
      },
      {
        q: 'How do levels and tables work?',
        a: [
          'You gain one level for every two wins. There are seven tables, from Casual to Elite. Higher tables have bigger entry fees and prizes and unlock at higher levels, so you need both the level and enough coins to sit down.',
        ],
      },
      {
        q: 'Will I lose my progress if I uninstall the game?',
        a: [
          'Guest progress lives only on your device, so uninstalling the game or clearing its data removes it. If Android backup is turned on for your device, the system may restore it when you reinstall.',
        ],
      },
    ],
  },
  {
    id: 'devices',
    title: 'Devices & support',
    suit: 'D',
    items: [
      {
        q: 'What devices are supported?',
        a: [
          `Android phones and tablets running ${site.minAndroid} or newer. The game is played in landscape orientation.`,
        ],
      },
      {
        q: 'Do I need an internet connection?',
        a: ['No. Bhabhi Thulla runs entirely on your device, including the AI opponents, so you can play anywhere.'],
      },
      {
        q: 'Which languages are available?',
        a: ['The game is currently available in English.'],
      },
      {
        q: 'How do I report a problem?',
        a: [
          `Email us at ${site.email} or use the contact form. It helps a lot if you include your phone model, Android version and a short description of what happened. A screenshot is even better.`,
        ],
      },
      {
        q: 'How can I contact the developers?',
        a: [`Write to ${site.email}. Feedback, suggestions and questions are all welcome, and we read every message.`],
      },
    ],
  },
];
