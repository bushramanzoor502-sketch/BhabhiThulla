import { site } from '../config/site';

/**
 * Delete Account guide. Written against the Android project as built:
 * - the only account is a guest profile in DataStore "thulla_account" (profile_json);
 * - the outlined "Switch" button in the main-screen header erases that profile at once, with no confirmation,
 *   and returns to the "Enter the card room" screen. Audio settings ("thulla_audio") and match_save.json stay;
 * - Google / Facebook sign-in are "Coming soon" (AccountManager returns NotConnected, no SDKs);
 * - android:allowBackup="true" with default rules, so Android Auto Backup may restore the data on reinstall.
 *
 * Text supports **bold** and [label](url) (see renderRich in pages/DeleteAccount.tsx).
 */
export type Rich = string;

export type GuideBlock =
  | { p: Rich }
  | { steps: Rich[] }
  | { options: { title: string; steps: Rich[] }[] }
  | { note: Rich; tone: 'warn' | 'info' };

export interface GuideSection {
  id: string;
  title: string;
  status?: 'now' | 'soon';
  blocks: GuideBlock[];
}

const SEE_GUEST = 'In the game, erase your profile by following **Delete your guest profile in the game** above.';
const SEE_REQUEST = 'Email us so we can delete any account data we hold. See **Ask us to delete your account** below.';

export const summary: Rich[] = [
  'Today every player uses a **guest profile** that is stored only on their own phone. You can erase it yourself in a few seconds.',
  '**Google and Facebook sign-in are coming soon.** Until they launch, the game holds no Google or Facebook data.',
  'We keep no game accounts on any server, so deleting the data from your phone and its backup removes it completely.',
  'Prefer that we handle it? Email us and we will confirm the deletion within 30 days.',
];

export const choices = [
  { href: '#guest', suit: 'S', title: 'I play as a guest', status: 'Available now' },
  { href: '#google', suit: 'H', title: 'I signed in with Google', status: 'Coming soon' },
  { href: '#facebook', suit: 'C', title: 'I signed in with Facebook', status: 'Coming soon' },
  { href: '#request', suit: 'D', title: 'Ask us to delete it', status: 'By email' },
] as const;

export const guides: GuideSection[] = [
  {
    id: 'guest',
    title: 'Delete your guest profile in the game',
    status: 'now',
    blocks: [
      {
        p: `Your guest profile is your ${site.name} account. It holds your player ID, nickname, avatar, coins, level, matches played and wins. You can erase it from inside the game:`,
      },
      {
        steps: [
          `Open **${site.name}** on your phone and wait for the main screen, where you choose a table.`,
          'Look at the bar along the top of the screen. It shows your avatar, your nickname, your level and your **COINS**.',
          'Tap the **Switch** button next to your coins. Your guest profile is erased straight away.',
          'The game returns to the **Enter the card room** screen. Close the game here: tapping **Continue as Guest** would create a brand-new profile.',
        ],
      },
      {
        tone: 'warn',
        note: 'There is no confirmation step. As soon as you tap **Switch**, your coins, level, wins and nickname are deleted permanently and cannot be restored.',
      },
      {
        tone: 'info',
        note: '**Switch** removes your profile but leaves your sound settings and any unfinished match on the phone. To remove those as well, follow **Remove all game data from your phone** below.',
      },
    ],
  },
  {
    id: 'device',
    title: 'Remove all game data from your phone',
    status: 'now',
    blocks: [
      {
        p: 'This erases everything the game has stored on your phone: your profile, your sound settings and any unfinished match. Choose either option.',
      },
      {
        options: [
          {
            title: 'Option 1: Clear the game’s storage',
            steps: [
              'Open your phone’s **Settings** app.',
              'Tap **Apps**. On some phones this is **Apps & notifications** → **See all apps**.',
              `Find and tap **${site.name}**.`,
              'Tap **Storage & cache**. On some phones this is just **Storage**.',
              'Tap **Clear storage** (on some phones, **Clear data**) and confirm with **OK** or **Delete**.',
            ],
          },
          {
            title: 'Option 2: Uninstall the game',
            steps: [
              `Press and hold the **${site.name}** icon on your home screen or in your app list.`,
              'Tap **Uninstall** (or drag the icon to **Uninstall**) and confirm with **OK**.',
              `Or use the **Google Play** app: tap your profile picture → **Manage apps & device** → **Manage**, tick **${site.name}**, tap the bin icon and choose **Uninstall**.`,
            ],
          },
        ],
      },
      {
        tone: 'info',
        note: `Menu names differ slightly between phone makers and Android versions. If you can’t find an option, type “${site.name}” or “Backup” into the search bar at the top of Settings.`,
      },
    ],
  },
  {
    id: 'backup',
    title: 'Remove the copy in your Android backup',
    blocks: [
      {
        p: 'If backup is turned on for your phone, Android may save a copy of the game’s data in your Google account and put it back when you reinstall the game. We cannot see or access this backup.',
      },
      {
        tone: 'info',
        note: 'The simplest fix: if you ever reinstall the game and find your old profile restored, tap **Switch** on the main screen to erase it again.',
      },
      { p: 'To stop Android from backing up the game’s data in future:' },
      {
        steps: [
          'Open **Settings** and search for **Backup**. On many phones it is under **Google** → **Backup** or **System** → **Backup**.',
          'Turn off **Backup by Google One** (on some phones, **Back up to Google Drive**). This stops backups for your whole phone, not only this game.',
          'To delete a backup that already exists, open [Google Drive backups](https://drive.google.com/drive/backups), choose your phone and delete its backup. This removes the backup of every app on that phone, so only do it if you are sure.',
        ],
      },
    ],
  },
  {
    id: 'google',
    title: 'Signed in with Google',
    status: 'soon',
    blocks: [
      {
        tone: 'info',
        note: 'Google sign-in is not available yet: the **Continue with Google** button in the game is marked “Coming soon”. The game has never been connected to your Google account and holds no Google data.',
      },
      { p: 'Once Google sign-in launches, follow these steps to remove your account completely:' },
      {
        steps: [
          SEE_GUEST,
          'Go to the [third-party connections](https://myaccount.google.com/connections) page of your Google Account (**Google Account** → **Security** → **Your connections to third-party apps & services**).',
          `Select **${site.name}**.`,
          `Choose **Delete all connections you have with ${site.name}** and tap **Confirm**. The game can no longer access your Google account.`,
          SEE_REQUEST,
        ],
      },
    ],
  },
  {
    id: 'facebook',
    title: 'Signed in with Facebook',
    status: 'soon',
    blocks: [
      {
        tone: 'info',
        note: 'Facebook sign-in is not available yet: the **Continue with Facebook** button in the game is marked “Coming soon”. The game has never been connected to your Facebook account and holds no Facebook data.',
      },
      { p: 'Once Facebook sign-in launches, follow these steps to remove your account completely:' },
      {
        steps: [
          SEE_GUEST,
          'Open Facebook, tap **Menu** (your profile picture or ☰) and go to **Settings & privacy** → **Settings**.',
          'Tap **Apps and websites**. On a computer you can go straight to [Facebook’s Apps and websites settings](https://www.facebook.com/settings?tab=applications).',
          `Find **${site.name}** and tap **Remove**.`,
          'Choose whether to also delete anything the game posted for you, then tap **Remove** again to confirm.',
          SEE_REQUEST,
        ],
      },
    ],
  },
];

export const request = {
  id: 'request',
  title: 'Ask us to delete your account',
  intro:
    'Prefer that we take care of it, or want written confirmation? Send us a deletion request. The button below opens your email app with the request already written; fill in the blanks and press send.',
  subject: `[${site.name}] Account deletion request`,
  body: [
    `Hello ${site.name} team,`,
    '',
    `Please permanently delete my ${site.name} account and all data linked to it.`,
    '',
    'Account type (Guest / Google / Facebook):',
    'Nickname shown in the game (for example, Guest 1234):',
    'Email address used to sign in (Google or Facebook only):',
    '',
    'I understand that deletion is permanent and that my coins, level and progress cannot be restored.',
    '',
    'Thank you.',
  ].join('\n'),
  next: [
    'We reply to confirm we have received your request.',
    'We delete all data linked to your account within 30 days and email you when it is done.',
    'Guest profiles are stored only on your phone, so we hold no game data for them. If you play as a guest, we will guide you through the steps above.',
    'Once your request is complete, we also delete our email conversation with you, unless the law requires us to keep it.',
  ] as Rich[],
};

/** What each method removes. `true` = removed, `false` = kept, string = where to handle it. */
export const coverage: { data: string; detail: string; switchBtn: boolean | string; clear: boolean | string }[] = [
  {
    data: 'Guest profile',
    detail: 'Player ID, nickname, avatar, coins, level, matches and wins',
    switchBtn: true,
    clear: true,
  },
  { data: 'Sound settings', detail: 'Music, sound effects and mute', switchBtn: false, clear: true },
  { data: 'Unfinished match', detail: 'The table you can resume', switchBtn: false, clear: true },
  { data: 'Android backup copy', detail: 'Saved in your own Google account', switchBtn: 'See backup steps', clear: 'See backup steps' },
  { data: 'Emails you sent us', detail: 'Our conversation with you', switchBtn: 'Ask us', clear: 'Ask us' },
];
