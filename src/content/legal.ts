import { site } from '../config/site';

export type Block = string | { list: string[] } | { note: string };
export interface LegalSection {
  id: string;
  title: string;
  blocks: Block[];
}

/**
 * Privacy Policy. Written against the Android project as built:
 * - no INTERNET permission, no networking code, no Firebase / ads / analytics / crash reporting / billing SDKs;
 * - local DataStore only: "thulla_account" (guest profile JSON) and "thulla_audio" (music, sfx, mute);
 * - android:allowBackup="true" with default backup rules.
 */
export const privacy: LegalSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    blocks: [
      `This Privacy Policy explains how the ${site.name} mobile game for Android (“the Game”) and this website (“the Website”) handle information. We wrote it to be short and specific: the Game is designed to work entirely on your device and does not collect personal data.`,
      'By installing or using the Game, or by using the Website, you agree to the practices described here.',
    ],
  },
  {
    id: 'information-we-collect',
    title: 'Information we collect',
    blocks: [
      'The Game does not collect, transmit or sell any personal information. It does not ask for your name, email address, phone number, contacts, location, photos or any other personal data, and it does not read advertising or device identifiers.',
      'The Game does not request the Android internet permission and contains no code that sends data off your device.',
    ],
  },
  {
    id: 'data-stored-on-your-device',
    title: 'Data stored on your device',
    blocks: [
      'To remember your progress and settings, the Game saves a small amount of information in its private storage on your device. This information never leaves your device through the Game:',
      {
        list: [
          'Guest profile: a randomly generated player ID (for example “guest-1a2b3c4d”), an automatically assigned nickname (for example “Guest 1234”), an avatar colour, your level, your virtual coin balance, and your number of matches played and won.',
          'Audio settings: whether music and sound effects are on, and whether audio is muted.',
          'Game files: the on-device AI model used by the computer opponents, copied into the app’s storage when the Game first runs.',
        ],
      },
      'You can delete your guest profile at any time with the Switch button on the Game’s main screen, and delete all of this data by clearing the Game’s storage in your Android settings or by uninstalling the Game. Step-by-step instructions are on the Delete Account page of this Website.',
    ],
  },
  {
    id: 'how-information-is-used',
    title: 'How information is used',
    blocks: [
      'The data stored on your device is used only to run the Game: to show your nickname, avatar, level and coins, to decide which tables you can join, and to remember your audio preferences.',
      'We do not use any information for advertising, profiling or analytics.',
    ],
  },
  {
    id: 'device-backup',
    title: 'Android backup',
    blocks: [
      'The Game allows Android’s standard backup feature. If you have turned on backup for your device, Android may include the Game’s local data (described above) in your device backup, which is stored in your own Google account under Google’s privacy policy. We cannot access these backups. You can turn backup off at any time in your Android settings.',
    ],
  },
  {
    id: 'third-party-services',
    title: 'Third-party services',
    blocks: [
      'The Game does not include third-party analytics, advertising, crash-reporting, social-login or payment SDKs.',
      {
        list: [
          'Google Play: if you download the Game from Google Play, Google processes information about your download and device under its own terms and privacy policy. We do not receive personal information about you from Google Play.',
          'Sign-in buttons: the Game shows “Continue with Google” and “Continue with Facebook” buttons marked “Coming soon”. They are not connected to any service and do not collect or send any data. If sign-in is introduced in the future, this policy will be updated before it becomes available, and you will be able to have your account deleted on request as described on the Delete Account page.',
        ],
      },
    ],
  },
  {
    id: 'advertising-and-purchases',
    title: 'Advertising and purchases',
    blocks: [
      'The Game shows no advertisements and offers no in-app purchases. Coins are virtual, have no monetary value and cannot be bought, sold or exchanged.',
    ],
  },
  {
    id: 'website',
    title: 'This website',
    blocks: [
      'The Website is a static site hosted on GitHub Pages. It does not use cookies, analytics or tracking scripts, and all fonts are served from the Website itself.',
      'As with any web host, GitHub may automatically log technical information such as your IP address when you visit, for security and operational purposes. This is governed by GitHub’s privacy statement.',
      'The contact form does not send or store anything on a server. When you press “Send message”, it opens your own email app with your message pre-filled, and nothing is sent until you choose to send it from your email app.',
    ],
  },
  {
    id: 'emails',
    title: 'When you email us',
    blocks: [
      `If you contact us at ${site.email}, we receive your email address and whatever you choose to include in your message. We use this only to reply to you and to help resolve your issue, and we do not share it with anyone. You may ask us to delete your correspondence at any time.`,
    ],
  },
  {
    id: 'childrens-privacy',
    title: 'Children’s privacy',
    blocks: [
      'The Game is a general-audience card game. Because the Game does not collect personal information from anyone, it does not knowingly collect personal information from children. If you believe a child has sent us personal information by email, contact us and we will delete it.',
    ],
  },
  {
    id: 'data-security',
    title: 'Data security',
    blocks: [
      'Game data is kept in the app’s private storage, which Android protects from other apps. Because no data is transmitted by the Game, there is no server-side copy of your game data to be exposed. Please keep your device secured with a screen lock to protect what is stored on it.',
    ],
  },
  {
    id: 'data-retention',
    title: 'Data retention',
    blocks: [
      'Game data stays on your device until you clear the Game’s storage or uninstall it. Emails you send us are kept only as long as needed to handle your request, then deleted.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your rights and choices',
    blocks: [
      'Because your game data is stored only on your device, you are in full control of it: you can view your progress in the Game and delete it at any time with the Switch button, by clearing the app’s storage or by uninstalling. See the Delete Account page for step-by-step instructions, or email us to request deletion. For any email correspondence we hold, you can ask us to access, correct or delete it, depending on the laws that apply where you live.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    blocks: [
      'If the Game changes in a way that affects your privacy, for example by adding online play or sign-in, we will update this policy and change the “Last updated” date above before those features are released.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    blocks: [`Questions about this policy or your data? Email ${site.email}.`],
  },
];

export const terms: LegalSection[] = [
  {
    id: 'acceptance',
    title: 'Acceptance of terms',
    blocks: [
      `These Terms of Use (“Terms”) apply to the ${site.name} mobile game (“the Game”) and this website (“the Website”). By downloading, installing or using the Game, or by using the Website, you agree to these Terms. If you do not agree, please do not use the Game or the Website.`,
    ],
  },
  {
    id: 'use-of-the-game',
    title: 'Use of the Game',
    blocks: [
      'We grant you a personal, non-exclusive, non-transferable, revocable licence to install and play the Game on Android devices you own or control, for your own non-commercial entertainment.',
      'The Game is a card game played against computer-controlled opponents. Features may change between versions.',
    ],
  },
  {
    id: 'virtual-coins',
    title: 'Virtual coins and levels',
    blocks: [
      'The Game uses virtual coins and levels to unlock tables. Virtual coins:',
      {
        list: [
          'have no monetary or real-world value;',
          'cannot be purchased, sold, transferred, exchanged or redeemed for money, goods or services;',
          'are stored on your device and may be lost if you uninstall the Game or clear its data.',
        ],
      },
      { note: 'The Game does not offer real-money gambling or the chance to win real money or prizes.' },
    ],
  },
  {
    id: 'user-responsibilities',
    title: 'Your responsibilities',
    blocks: [
      'You are responsible for your device, for keeping it secure, and for complying with any laws that apply to you when using the Game. Please play responsibly and take breaks.',
    ],
  },
  {
    id: 'prohibited-activities',
    title: 'Prohibited activities',
    blocks: [
      'You agree not to:',
      {
        list: [
          'copy, modify, distribute, sell, rent or sublicense the Game or any part of it;',
          'reverse engineer, decompile or disassemble the Game, except where the law expressly allows this;',
          'remove or alter any copyright, trademark or other notices;',
          'use the Game or the Website for any unlawful purpose;',
          'attempt to interfere with or disrupt the Website.',
        ],
      },
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual property',
    blocks: [
      `The ${site.name} name, logo, card and table artwork, sound effects, software and all other content of the Game and the Website belong to us or our licensors and are protected by intellectual-property laws. The traditional card game Bhabhi (Thulla) itself is a folk game and is not owned by anyone.`,
      'Some fonts used in the Game and on the Website (Cinzel and Roboto Condensed) are licensed under the SIL Open Font License.',
    ],
  },
  {
    id: 'availability',
    title: 'Game availability and updates',
    blocks: [
      'We may update, change, suspend or discontinue the Game or the Website, or any part of them, at any time. Updates may be required to keep using the Game. We do not guarantee that the Game will be available on every device or in every country.',
    ],
  },
  {
    id: 'third-party-services',
    title: 'Third-party services',
    blocks: [
      'The Game is distributed through Google Play, and your use of Google Play is governed by Google’s own terms. The Website is hosted on GitHub Pages. We are not responsible for third-party services or their content.',
    ],
  },
  {
    id: 'disclaimer',
    title: 'Disclaimer',
    blocks: [
      'The Game and the Website are provided “as is” and “as available”, without warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose and non-infringement. We do not guarantee that the Game will be error-free or uninterrupted, or that progress will never be lost.',
    ],
  },
  {
    id: 'limitation-of-liability',
    title: 'Limitation of liability',
    blocks: [
      'To the fullest extent permitted by law, we will not be liable for any indirect, incidental, special, consequential or punitive damages, or for any loss of data, virtual items or progress, arising from your use of, or inability to use, the Game or the Website. Nothing in these Terms limits liability that cannot be limited under applicable law.',
    ],
  },
  {
    id: 'termination',
    title: 'Termination',
    blocks: [
      'You may stop using the Game at any time by uninstalling it. Your licence ends automatically if you break these Terms. When it ends, you must stop using the Game and delete it from your devices.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    blocks: [
      'We may update these Terms from time to time. When we do, we will change the “Last updated” date above. Continuing to use the Game or the Website after a change means you accept the updated Terms.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    blocks: [`Questions about these Terms? Email ${site.email}.`],
  },
];
