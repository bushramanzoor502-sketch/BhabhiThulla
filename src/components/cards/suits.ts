/**
 * Suit and headgear outlines ported 1:1 from the game's CardArt.kt (unit box 0..1).
 * Use them inside a <g transform="translate(x y) scale(s)">.
 */
export type Suit = 'S' | 'H' | 'D' | 'C';

const stem = (top: number) =>
  `M.5 ${top} C.5 ${top + 0.16} .58 .92 .7 1 L.3 1 C.42 .92 .5 ${top + 0.16} .5 ${top}Z`;

const circle = (cx: number, cy: number, rx: number, ry = rx) =>
  `M${cx - rx} ${cy} a${rx} ${ry} 0 1 0 ${2 * rx} 0 a${rx} ${ry} 0 1 0 ${-2 * rx} 0Z`;

export const SUIT_PATH: Record<Suit, string> = {
  S:
    'M.5 0 C.58 .14 1 .38 1 .62 C1 .78 .86 .86 .72 .86 C.62 .86 .54 .8 .5 .72 C.46 .8 .38 .86 .28 .86 C.14 .86 0 .78 0 .62 C0 .38 .42 .14 .5 0Z ' +
    stem(0.66),
  H: 'M.5 .98 C.42 .86 0 .62 0 .3 C0 .1 .15 0 .3 0 C.4 0 .48 .07 .5 .18 C.52 .07 .6 0 .7 0 C.85 0 1 .1 1 .3 C1 .62 .58 .86 .5 .98Z',
  D: 'M.5 0 C.62 .2 .78 .38 .94 .5 C.78 .62 .62 .8 .5 1 C.38 .8 .22 .62 .06 .5 C.22 .38 .38 .2 .5 0Z',
  C: circle(0.5, 0.26, 0.24) + circle(0.24, 0.58, 0.24) + circle(0.76, 0.58, 0.24) + circle(0.5, 0.48, 0.14, 0.18) + stem(0.6),
};

export const SUIT_NAME: Record<Suit, string> = { S: 'Spades', H: 'Hearts', D: 'Diamonds', C: 'Clubs' };
export const SUIT_GLYPH: Record<Suit, string> = { S: '♠', H: '♥', D: '♦', C: '♣' };
export const isRed = (s: Suit) => s === 'H' || s === 'D';

/** Unit box 1 x 0.7. */
export const CROWN = 'M.06 .7 L0 .18 L.26 .4 L.5 0 L.74 .4 L1 .18 L.94 .7Z';
export const TIARA = 'M0 .7 C.12 .2 .34 .04 .5 .04 C.66 .04 .88 .2 1 .7Z';
export const CAP = 'M0 .7 C0 .34 .2 .16 .5 .16 C.8 .16 1 .34 1 .7Z M.56 .2 C.68 0 .88 -.06 1 .02 C.9 .1 .76 .22 .6 .24Z';

/** Path element props that draw a unit path centred on (cx, cy) with the given width/height. */
export const unitTransform = (cx: number, cy: number, w: number, h = w, flipped = false) =>
  flipped
    ? `translate(${cx + w / 2} ${cy + h / 2}) rotate(180) scale(${w} ${h})`
    : `translate(${cx - w / 2} ${cy - h / 2}) scale(${w} ${h})`;
