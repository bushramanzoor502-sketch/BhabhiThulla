import { memo, type ReactElement } from 'react';
import { CAP, CROWN, SUIT_NAME, SUIT_PATH, TIARA, isRed, unitTransform, type Suit } from './suits';

export type FaceStyle = 'ivory' | 'noir' | 'royal';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

const RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const RANK_NAME: Record<Rank, string> = {
  '2': 'Two', '3': 'Three', '4': 'Four', '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight',
  '9': 'Nine', '10': 'Ten', J: 'Jack', Q: 'Queen', K: 'King', A: 'Ace',
};

/** FaceStyle.palette() from CardSkin.kt. */
const FACE = {
  ivory: { paper: '#F6F1E6', edge: '#D9D0BC', black: '#17191C', red: '#B7222A', frame: '#8C7232', tint: 'rgba(0,0,0,.08)', double: false },
  noir: { paper: '#17191D', edge: '#2B2F36', black: '#EDE6D6', red: '#E4484C', frame: '#C9A54E', tint: 'rgba(255,255,255,.13)', double: false },
  royal: { paper: '#F8F1DC', edge: '#D8C9A0', black: '#1E1A2A', red: '#A51E2A', frame: '#B8933E', tint: 'rgba(107,79,26,.1)', double: true },
} as const;

/** Pip layouts: [column 0..2, row 0..1] pairs, from CardArt.kt PIP_LAYOUTS. */
const PIPS: number[][] = [
  [1, 0, 1, 1],
  [1, 0, 1, 0.5, 1, 1],
  [0, 0, 2, 0, 0, 1, 2, 1],
  [0, 0, 2, 0, 1, 0.5, 0, 1, 2, 1],
  [0, 0, 2, 0, 0, 0.5, 2, 0.5, 0, 1, 2, 1],
  [0, 0, 2, 0, 1, 0.25, 0, 0.5, 2, 0.5, 0, 1, 2, 1],
  [0, 0, 2, 0, 1, 0.25, 0, 0.5, 2, 0.5, 1, 0.75, 0, 1, 2, 1],
  [0, 0, 2, 0, 0, 0.333, 2, 0.333, 1, 0.5, 0, 0.667, 2, 0.667, 0, 1, 2, 1],
  [0, 0, 2, 0, 1, 0.167, 0, 0.333, 2, 0.333, 0, 0.667, 2, 0.667, 1, 0.833, 0, 1, 2, 1],
];

const W = 100;
const H = 140;

function SuitShape({ suit, cx, cy, size, fill, flipped }: { suit: Suit; cx: number; cy: number; size: number; fill: string; flipped?: boolean }) {
  return <path d={SUIT_PATH[suit]} fill={fill} transform={unitTransform(cx, cy, size, size, flipped)} />;
}

function Index({ rank, suit, ink }: { rank: Rank; suit: Suit; ink: string }) {
  return (
    <>
      <text
        x={14.5}
        y={19}
        fill={ink}
        fontFamily="'Roboto Condensed', 'Arial Narrow', sans-serif"
        fontWeight={700}
        fontSize={25}
        textAnchor="middle"
        dominantBaseline="central"
        textLength={rank.length > 1 ? 21 : undefined}
        lengthAdjust="spacingAndGlyphs"
      >
        {rank}
      </text>
      <SuitShape suit={suit} cx={14.5} cy={45} size={19} fill={ink} />
    </>
  );
}

interface Props {
  rank: Rank;
  suit: Suit;
  face?: FaceStyle;
  className?: string;
  /** Set when the card is decorative and its neighbours already convey meaning. */
  decorative?: boolean;
}

/** A face-up playing card drawn exactly like the game draws it (CardArt.drawCardFace). */
function PlayingCardImpl({ rank, suit, face = 'ivory', className, decorative }: Props) {
  const pal = FACE[face];
  const ink = isRed(suit) ? pal.red : pal.black;
  const r = RANKS.indexOf(rank);
  const label = `${RANK_NAME[rank]} of ${SUIT_NAME[suit]}`;

  let centre: ReactElement;
  if (rank === 'A') {
    centre =
      suit === 'S' ? (
        <g>
          <circle cx={50} cy={70} r={37} fill="none" stroke={pal.frame} strokeOpacity={0.45} strokeWidth={1.2} />
          <circle cx={50} cy={70} r={41} fill="none" stroke={pal.frame} strokeOpacity={0.25} strokeWidth={0.8} />
          {Array.from({ length: 16 }, (_, k) => {
            const a = (k * Math.PI) / 8;
            const r1 = k % 2 === 0 ? 46 : 43;
            return (
              <line
                key={k}
                x1={50 + Math.cos(a) * 39}
                y1={70 + Math.sin(a) * 39}
                x2={50 + Math.cos(a) * r1}
                y2={70 + Math.sin(a) * r1}
                stroke={pal.frame}
                strokeOpacity={0.35}
                strokeWidth={1}
              />
            );
          })}
          <SuitShape suit={suit} cx={50} cy={70} size={56} fill={ink} />
        </g>
      ) : (
        <SuitShape suit={suit} cx={50} cy={70} size={50} fill={ink} />
      );
  } else if (r >= 9) {
    const top = H * 0.17;
    const bottom = H * 0.83;
    const halfH = 70 - top;
    const gear = rank === 'K' ? CROWN : rank === 'Q' ? TIARA : CAP;
    const gearW = 30;
    const gearH = 21;
    const gearY = top + halfH * 0.26;
    const half = (
      <g>
        <path d={gear} fill={ink} transform={unitTransform(50, gearY, gearW, gearH)} />
        {rank === 'Q' && (
          <>
            <circle cx={50} cy={gearY - gearH * 0.46} r={2.2} fill={pal.frame} />
            <circle cx={50 - gearW * 0.3} cy={gearY - gearH * 0.22} r={1.8} fill={pal.frame} />
            <circle cx={50 + gearW * 0.3} cy={gearY - gearH * 0.22} r={1.8} fill={pal.frame} />
          </>
        )}
        {rank === 'K' && <circle cx={50} cy={gearY - gearH * 0.1} r={2} fill={pal.frame} />}
        <text
          x={50}
          y={top + halfH * 0.68}
          fill={ink}
          fontFamily="'Cinzel Variable', Cinzel, Georgia, serif"
          fontWeight={700}
          fontSize={30}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {rank}
        </text>
        <SuitShape suit={suit} cx={78 - 8.5} cy={top + halfH * 0.2} size={11} fill={ink} />
      </g>
    );
    centre = (
      <g>
        <rect x={22} y={top} width={56} height={bottom - top} fill={pal.tint} />
        <rect x={22} y={top} width={56} height={bottom - top} fill="none" stroke={pal.frame} strokeOpacity={0.8} strokeWidth={1.4} />
        <line x1={22} y1={bottom} x2={78} y2={top} stroke={pal.frame} strokeOpacity={0.35} strokeWidth={1} />
        {half}
        <g transform="rotate(180 50 70)">{half}</g>
      </g>
    );
  } else {
    const layout = PIPS[r];
    const pip = r <= 4 ? 20.5 : 17.5;
    const pips: ReactElement[] = [];
    for (let i = 0; i < layout.length; i += 2) {
      const col = layout[i];
      const row = layout[i + 1];
      pips.push(
        <SuitShape key={i} suit={suit} cx={W * (0.31 + 0.19 * col)} cy={28 + 84 * row} size={pip} fill={ink} flipped={row > 0.5} />,
      );
    }
    centre = <g>{pips}</g>;
  }

  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative ? true : undefined}
      focusable="false"
    >
      <rect width={W} height={H} rx={9} fill={pal.paper} />
      <rect x={0.8} y={0.8} width={W - 1.6} height={H - 1.6} rx={8.4} fill="none" stroke={pal.edge} strokeWidth={1.6} />
      {pal.double && <rect x={5} y={5} width={90} height={130} rx={6} fill="none" stroke={pal.frame} strokeOpacity={0.55} strokeWidth={1} />}
      <Index rank={rank} suit={suit} ink={ink} />
      <g transform="rotate(180 50 70)">
        <Index rank={rank} suit={suit} ink={ink} />
      </g>
      {centre}
    </svg>
  );
}

export const PlayingCard = memo(PlayingCardImpl);
