import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

type Variant = 'gold' | 'ghost';

interface Common {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
}

type Props =
  | (Common & { to: string; href?: never; onClick?: never; type?: never })
  | (Common & { href: string; to?: never; onClick?: never; type?: never; external?: boolean })
  | (Common & { onClick?: () => void; type?: 'button' | 'submit'; to?: never; href?: never; disabled?: boolean });

/** Primary/secondary call to action. Renders a router Link, an anchor or a button. */
export function Button(props: Props) {
  const { children, variant = 'gold', className = '', icon } = props;
  const cls = `btn btn--${variant} ${className}`.trim();
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      {icon && <span className="btn__icon" aria-hidden="true">{icon}</span>}
    </>
  );
  if ('to' in props && props.to) return <Link className={cls} to={props.to}>{inner}</Link>;
  if ('href' in props && props.href) {
    const ext = 'external' in props && props.external;
    return (
      <a className={cls} href={props.href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
        {ext && <span className="visually-hidden"> (opens in a new tab)</span>}
      </a>
    );
  }
  const b = props as Common & { onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean };
  return (
    <button className={cls} type={b.type ?? 'button'} onClick={b.onClick} disabled={b.disabled}>
      {inner}
    </button>
  );
}
