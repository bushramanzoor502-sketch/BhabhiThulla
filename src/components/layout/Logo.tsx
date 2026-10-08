/** The launcher icon (two fanned cards, A♠, gold frame) as an inline mark. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="34 26 40 56" aria-hidden="true" focusable="false">
      <g transform="rotate(-14 54 60)">
        <path d="M40,30h28a3,3 0 0 1 3,3v42a3,3 0 0 1 -3,3h-28a3,3 0 0 1 -3,-3v-42a3,3 0 0 1 3,-3z" fill="#E4DECF" />
        <path d="M42.5,33.5h23a1.5,1.5 0 0 1 1.5,1.5v36a1.5,1.5 0 0 1 -1.5,1.5h-23a1.5,1.5 0 0 1 -1.5,-1.5v-36a1.5,1.5 0 0 1 1.5,-1.5z" fill="#12382D" />
        <path d="M44.5,35.5h19a1,1 0 0 1 1,1v32a1,1 0 0 1 -1,1h-19a1,1 0 0 1 -1,-1v-32a1,1 0 0 1 1,-1z" fill="none" stroke="#C9A54E" strokeWidth="0.8" />
      </g>
      <g transform="rotate(10 54 60)">
        <path d="M40,30h28a3,3 0 0 1 3,3v42a3,3 0 0 1 -3,3h-28a3,3 0 0 1 -3,-3v-42a3,3 0 0 1 3,-3z" fill="#F4EFE3" />
        <path d="M40.5,30.5h27a2.5,2.5 0 0 1 2.5,2.5v41a2.5,2.5 0 0 1 -2.5,2.5h-27a2.5,2.5 0 0 1 -2.5,-2.5v-41a2.5,2.5 0 0 1 2.5,-2.5z" fill="none" stroke="#C9A54E" strokeWidth="0.8" />
        <path d="M54,42 C50,48 45.5,51 45.5,56.5 C45.5,59.8 48.2,62 51,62 C52.4,62 53.3,61.5 54,60.8 C54.7,61.5 55.6,62 57,62 C59.8,62 62.5,59.8 62.5,56.5 C62.5,51 58,48 54,42 Z" fill="#1A1A1A" />
        <path d="M52.6,60.5 L55.4,60.5 L56.6,66 L51.4,66 Z" fill="#1A1A1A" />
      </g>
    </svg>
  );
}

/** "BHABHI / THULLA" stacked lockup: ivory over gold, as on the app's splash and account screens. */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`}>
      <span className="wordmark__top">Bhabhi</span>
      <span className="wordmark__bottom">Thulla</span>
    </span>
  );
}
