import { memo, useId, type ReactElement } from 'react';
import type { SkinId } from '../../config/site';
import { CROWN, SUIT_PATH, TIARA, unitTransform } from './suits';

/** BackStyle.palette() from CardSkin.kt: border (rim), base (panel), accent, accent2. */
export const BACKS: Record<SkinId, { name: string; border: string; base: string; accent: string; accent2: string }> = {
  classic_blue: { name: 'Classic Blue', border: '#F4EFE3', base: '#1F3F8F', accent: '#DDE6FF', accent2: '#6E8CD6' },
  classic_red: { name: 'Classic Red', border: '#F4EFE3', base: '#9E1F2B', accent: '#FFE3DF', accent2: '#E07A7E' },
  emerald: { name: 'Emerald Lattice', border: '#F4EFE3', base: '#12382D', accent: '#C9A54E', accent2: '#1B4A3B' },
  onyx: { name: 'Onyx & Gold', border: '#0E0F11', base: '#15171B', accent: '#D5B35B', accent2: '#6E5A24' },
  spider: { name: 'Spider Web', border: '#101214', base: '#1C1F24', accent: '#C8CDD6', accent2: '#3FD2E0' },
  royal: { name: 'Royal Crest', border: '#F3E9CF', base: '#3B2160', accent: '#E2C271', accent2: '#5E3A96' },
  filigree: { name: 'Gold Filigree', border: '#2A1B0E', base: '#3A2612', accent: '#E6C66E', accent2: '#8C6A2A' },
  faces: { name: 'Court Faces', border: '#F6F1E6', base: '#EFE4C8', accent: '#203050', accent2: '#B7222A' },
};

export const SKIN_ORDER: SkinId[] = ['classic_blue', 'classic_red', 'emerald', 'onyx', 'spider', 'royal', 'filigree', 'faces'];

// Inner panel, as in CardArt.drawCardBack (inset = 7% of width on a 100x140 card).
const L = 7, T = 7, R = 93, B = 133, CX = 50, CY = 70, IW = 86, IH = 126;

function Hatch({ id, step, color, opacity, stroke = 1, both = true }: { id: string; step: number; color: string; opacity: number; stroke?: number; both?: boolean }) {
  const gap = step / Math.SQRT2;
  return (
    <>
      <defs>
        <pattern id={`${id}a`} width={gap} height={gap} patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <line x1={0} y1={0} x2={0} y2={gap} stroke={color} strokeOpacity={opacity} strokeWidth={stroke} />
        </pattern>
        {both && (
          <pattern id={`${id}b`} width={gap} height={gap} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1={0} y1={0} x2={0} y2={gap} stroke={color} strokeOpacity={opacity} strokeWidth={stroke} />
          </pattern>
        )}
      </defs>
      <rect x={L} y={T} width={IW} height={IH} fill={`url(#${id}a)`} />
      {both && <rect x={L} y={T} width={IW} height={IH} fill={`url(#${id}b)`} />}
    </>
  );
}

const Unit = ({ d, cx, cy, w, h, fill }: { d: string; cx: number; cy: number; w: number; h: number; fill: string }) => (
  <path d={d} fill={fill} transform={unitTransform(cx, cy, w, h)} />
);

function pattern(skin: SkinId, uid: string): ReactElement {
  const p = BACKS[skin];
  const { accent, accent2 } = p;
  switch (skin) {
    case 'classic_blue':
    case 'classic_red':
      return (
        <>
          <Hatch id={uid} step={9} color={accent} opacity={0.22} />
          <ellipse cx={CX} cy={CY} rx={23} ry={34.5} fill={accent2} />
          <ellipse cx={CX} cy={CY} rx={23} ry={34.5} fill="none" stroke={accent} strokeWidth={1.4} />
          <ellipse cx={CX} cy={CY} rx={20} ry={31.5} fill="none" stroke={accent} strokeOpacity={0.6} strokeWidth={1} />
          <Unit d={SUIT_PATH.S} cx={CX} cy={CY} w={24} h={24} fill={accent} />
        </>
      );
    case 'emerald':
      return (
        <>
          <Hatch id={`${uid}x`} step={13} color={accent2} opacity={0.6} stroke={3} />
          <Hatch id={uid} step={13} color={accent} opacity={0.55} />
          <circle cx={CX} cy={CY} r={20} fill={accent2} />
          <circle cx={CX} cy={CY} r={20} fill="none" stroke={accent} strokeWidth={1.5} />
          <Unit d={SUIT_PATH.S} cx={CX} cy={CY} w={20} h={20} fill={accent} />
        </>
      );
    case 'onyx':
      return (
        <>
          {Array.from({ length: 15 }, (_, k) => {
            const a = Math.PI + (k * Math.PI) / 14;
            return <line key={k} x1={CX} y1={B} x2={CX + Math.cos(a) * 151} y2={B + Math.sin(a) * 151} stroke={accent} strokeOpacity={0.18} strokeWidth={1} />;
          })}
          {[0, 1, 2].map((i) => {
            const d = 10 + 7 * i;
            return <rect key={i} x={L + d} y={T + d} width={IW - 2 * d} height={IH - 2 * d} rx={3} fill="none" stroke={accent} strokeOpacity={0.95 - 0.28 * i} strokeWidth={i === 0 ? 1.6 : 1} />;
          })}
          <Unit d={SUIT_PATH.D} cx={CX} cy={CY} w={16} h={26} fill={accent} />
          <Unit d={SUIT_PATH.D} cx={CX} cy={CY} w={7} h={12} fill={accent2} />
        </>
      );
    case 'spider': {
      const cy = CY - IH * 0.08;
      const radius = IH * 0.62;
      const spokes = 12;
      const rings: string[] = [];
      for (let ring = 1; ring <= 6; ring++) {
        const rr = (radius * ring) / 6;
        let d = '';
        for (let k = 0; k <= spokes; k++) {
          const a0 = ((k % spokes) * 2 * Math.PI) / spokes;
          const x = CX + Math.cos(a0) * rr;
          const y = cy + Math.sin(a0) * rr;
          if (k === 0) d += `M${x.toFixed(2)} ${y.toFixed(2)}`;
          else {
            const am = a0 - Math.PI / spokes;
            const sag = rr * 0.9;
            d += ` Q${(CX + Math.cos(am) * sag).toFixed(2)} ${(cy + Math.sin(am) * sag).toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)}`;
          }
        }
        rings.push(d);
      }
      const sx = CX + IW * 0.26;
      const sy = cy + IH * 0.3;
      return (
        <>
          {Array.from({ length: spokes }, (_, k) => {
            const a = (k * 2 * Math.PI) / spokes;
            return <line key={k} x1={CX} y1={cy} x2={CX + Math.cos(a) * radius} y2={cy + Math.sin(a) * radius} stroke={accent} strokeOpacity={0.55} strokeWidth={1} />;
          })}
          {rings.map((d, i) => (
            <path key={i} d={d} fill="none" stroke={accent} strokeOpacity={0.55} strokeWidth={1} />
          ))}
          <line x1={sx} y1={T} x2={sx} y2={sy - 6} stroke={accent} strokeOpacity={0.7} strokeWidth={1} />
          {[0, 1, 2, 3].map((k) => {
            const a = 0.35 + k * 0.5;
            const lx = Math.cos(a) * 13;
            const ly = Math.sin(a) * 9 - 3;
            return (
              <g key={k} stroke={accent2} strokeWidth={1.5}>
                <line x1={sx} y1={sy} x2={sx + lx} y2={sy + ly} />
                <line x1={sx} y1={sy} x2={sx - lx} y2={sy + ly} />
              </g>
            );
          })}
          <circle cx={sx} cy={sy} r={5} fill={accent2} />
          <circle cx={sx} cy={sy - 6.5} r={3} fill={accent2} />
        </>
      );
    }
    case 'royal': {
      const d = 10;
      const corners = [
        [L + d * 2.1, T + d * 2.1],
        [R - d * 2.1, T + d * 2.1],
        [L + d * 2.1, B - d * 2.1],
        [R - d * 2.1, B - d * 2.1],
      ];
      return (
        <>
          <Hatch id={uid} step={7} color={accent} opacity={0.1} both={false} />
          <rect x={L + d} y={T + d} width={IW - 2 * d} height={IH - 2 * d} rx={3} fill="none" stroke={accent} strokeOpacity={0.8} strokeWidth={1} />
          <circle cx={CX} cy={CY} r={30} fill={accent2} />
          <circle cx={CX} cy={CY} r={30} fill="none" stroke={accent} strokeWidth={1.5} />
          <Unit d={CROWN} cx={CX} cy={CY - 2} w={38} h={26} fill={accent} />
          <circle cx={CX} cy={CY - 4} r={2} fill={accent2} />
          <line x1={CX - 19} y1={CY + 17} x2={CX + 19} y2={CY + 17} stroke={accent} strokeWidth={2} />
          {corners.map(([x, y], i) => (
            <Unit key={i} d={SUIT_PATH.D} cx={x} cy={y} w={7} h={10} fill={accent} />
          ))}
        </>
      );
    }
    case 'filigree': {
      const curls: ReactElement[] = [];
      for (const sx of [-1, 1])
        for (const sy of [-1, 1]) {
          const ox = CX + sx * IW * 0.42;
          const oy = CY + sy * IH * 0.42;
          const a =
            `M${ox} ${oy} C${ox - sx * 2} ${oy - sy * IH * 0.26} ${CX + sx * 30} ${CY + sy * IH * 0.02} ${CX + sx * 14} ${CY + sy * IH * 0.1} ` +
            `C${CX + sx * 8} ${CY + sy * IH * 0.13} ${CX + sx * 10} ${CY + sy * IH * 0.2} ${CX + sx * 16} ${CY + sy * IH * 0.19}`;
          const b = `M${ox} ${oy} C${ox - sx * IW * 0.3} ${oy - sy * 2} ${CX + sx * 2} ${CY + sy * IH * 0.3} ${CX + sx * 10} ${CY + sy * IH * 0.2}`;
          curls.push(
            <g key={`${sx}${sy}`} fill="none" strokeWidth={1.3}>
              <path d={a} stroke={accent} />
              <path d={b} stroke={accent} strokeOpacity={0.7} />
              <circle cx={CX + sx * 16} cy={CY + sy * IH * 0.19} r={2.5} fill={accent} stroke="none" />
            </g>,
          );
        }
      return (
        <>
          <Hatch id={uid} step={6} color={accent2} opacity={0.12} />
          {curls}
          <circle cx={CX} cy={CY} r={17} fill={accent2} fillOpacity={0.5} />
          <circle cx={CX} cy={CY} r={17} fill="none" stroke={accent} strokeWidth={1.3} />
          <circle cx={CX} cy={CY} r={13} fill="none" stroke={accent} strokeWidth={1} />
          <text x={CX} y={CY} fill={accent} fontFamily="'Cinzel Variable', Cinzel, Georgia, serif" fontWeight={700} fontSize={20} textAnchor="middle" dominantBaseline="central">
            T
          </text>
        </>
      );
    }
    case 'faces': {
      const ow = IW * 0.72;
      const oh = IH * 0.8;
      const portrait = (gear: string) => {
        const headR = 8.5;
        const headY = CY - oh * 0.22;
        return (
          <g>
            <ellipse cx={CX} cy={headY + headR * 0.9 + 13} rx={19} ry={13} fill={accent} />
            <rect x={CX - 3} y={headY + headR * 1.1} width={6} height={12} fill={accent2} />
            <circle cx={CX} cy={headY} r={headR} fill={accent} />
            <Unit d={gear} cx={CX} cy={headY - headR * 1.15} w={headR * 2.3} h={headR * 1.3} fill={accent2} />
            <circle cx={CX} cy={headY - headR * 1.9} r={1.4} fill={accent2} />
          </g>
        );
      };
      return (
        <>
          <Hatch id={uid} step={8} color={accent} opacity={0.08} both={false} />
          <ellipse cx={CX} cy={CY} rx={ow / 2} ry={oh / 2} fill="#fff" fillOpacity={0.35} />
          <ellipse cx={CX} cy={CY} rx={ow / 2} ry={oh / 2} fill="none" stroke={accent} strokeWidth={1.8} />
          <line x1={CX - ow / 2} y1={CY} x2={CX + ow / 2} y2={CY} stroke={accent} strokeOpacity={0.5} strokeWidth={1} />
          {portrait(CROWN)}
          <g transform={`rotate(180 ${CX} ${CY})`}>{portrait(TIARA)}</g>
        </>
      );
    }
  }
}

interface Props {
  skin?: SkinId;
  className?: string;
  /** Accessible name; omit for decorative backs. */
  label?: string;
}

/** A face-down card drawn like CardArt.drawCardBack, one of the eight in-game skins. */
function CardBackImpl({ skin = 'classic_blue', className, label }: Props) {
  const uid = 'cb' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const p = BACKS[skin];
  const f = 11.9;
  return (
    <svg
      className={className}
      viewBox="0 0 100 140"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <defs>
        <clipPath id={`${uid}c`}>
          <rect x={L + 1} y={T + 1} width={IW - 2} height={IH - 2} />
        </clipPath>
      </defs>
      <rect width={100} height={140} rx={9} fill={p.border} />
      <rect x={L} y={T} width={IW} height={IH} rx={5} fill={p.base} />
      <g clipPath={`url(#${uid}c)`}>{pattern(skin, uid)}</g>
      <rect x={f} y={f} width={100 - 2 * f} height={140 - 2 * f} rx={4} fill="none" stroke={p.accent} strokeOpacity={0.85} strokeWidth={1.2} />
    </svg>
  );
}

export const CardBack = memo(CardBackImpl);
