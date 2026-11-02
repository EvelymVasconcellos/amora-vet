import { useId, type CSSProperties } from 'react';

/** Elementos decorativos do hero (SVG com volume). Sempre aria-hidden. */
interface P { size?: number; className?: string; style?: CSSProperties }
const shadow = 'drop-shadow(0 10px 12px rgba(48,37,31,.18))';

function Grad({ id, c }: { id: string; c: [string, string, string] }) {
  return (
    <radialGradient id={id} cx="35%" cy="28%" r="80%">
      <stop offset="0%" stopColor={c[0]} /><stop offset="55%" stopColor={c[1]} /><stop offset="100%" stopColor={c[2]} />
    </radialGradient>
  );
}

export function Heart({ size = 52, className, style }: P) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 92" width={size} height={size * 0.92} className={className} style={{ filter: shadow, ...style }} aria-hidden="true" focusable="false">
      <defs><Grad id={id} c={['#FFE27A', '#F4B900', '#D99A00']} /></defs>
      <path fill={`url(#${id})`} d="M50 88C22 68 4 52 4 30 4 15 15 4 29 4c9 0 16 5 21 12 5-7 12-12 21-12 14 0 25 11 25 26 0 22-18 38-46 58z" />
      <ellipse cx="27" cy="24" rx="10" ry="6" transform="rotate(-30 27 24)" fill="#fff" opacity=".55" />
    </svg>
  );
}

export function Star({ size = 40, className, style }: P) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={{ filter: shadow, ...style }} aria-hidden="true" focusable="false">
      <defs><Grad id={id} c={['#FFFFFF', '#FFF8F0', '#E9DCCB']} /></defs>
      <path fill={`url(#${id})`} d="M50 4c4 0 6 3 8 8l8 18 20 2c6 1 9 3 10 6 1 4-1 7-5 10L76 61l5 20c1 5 0 8-3 10s-7 1-11-2L50 78 33 89c-4 3-8 4-11 2s-4-5-3-10l5-20-15-13c-4-3-6-6-5-10 1-3 4-5 10-6l20-2 8-18c2-5 4-8 8-8z" />
    </svg>
  );
}

export function Paw({ size = 44, className, style }: P) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={{ filter: shadow, ...style }} aria-hidden="true" focusable="false">
      <defs><Grad id={id} c={['#6B5546', '#30251F', '#18110D']} /></defs>
      <g fill={`url(#${id})`}>
        <path d="M50 50c13 0 27 12 27 25 0 9-7 13-15 13-5 0-8-3-12-3s-7 3-12 3c-8 0-15-4-15-13 0-13 14-25 27-25z" />
        <ellipse cx="22" cy="44" rx="9.5" ry="12" transform="rotate(-22 22 44)" />
        <ellipse cx="38" cy="25" rx="9.5" ry="12.5" transform="rotate(-8 38 25)" />
        <ellipse cx="62" cy="25" rx="9.5" ry="12.5" transform="rotate(8 62 25)" />
        <ellipse cx="78" cy="44" rx="9.5" ry="12" transform="rotate(22 78 44)" />
      </g>
      <g fill="#fff" opacity=".35"><ellipse cx="42" cy="60" rx="8" ry="4" transform="rotate(-20 42 60)" /><ellipse cx="35" cy="19" rx="3" ry="4.5" /><ellipse cx="59" cy="19" rx="3" ry="4.5" /></g>
    </svg>
  );
}

export function Sparkle({ size = 20, className, style, color = 'var(--c-marrom)' }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden="true" focusable="false">
      <path fill={color} d="M12 0c.7 6.4 5 11 12 12-7 1-11.3 5.6-12 12-.7-6.4-5-11-12-12C7 11 11.3 6.4 12 0z" />
    </svg>
  );
}

/** Onda entre seções — ocupa 100% da largura, sem frestas (bottom -1px no uso). */
export function Wave({ to, className, flip = false }: { to: string; className?: string; flip?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true" focusable="false"
      style={{ display: 'block', width: '100%', height: 'clamp(40px, 7vw, 110px)', transform: flip ? 'scaleX(-1)' : undefined }}>
      <path d="M0 48c160 40 300 66 480 50s300-74 480-70 330 48 480 64V120H0z" fill={to} />
    </svg>
  );
}
