/**
 * Padrões de motion do Design System Amora Vet.
 * Use sempre estes valores para manter consistência entre seções.
 */
export const duration = { fast: 0.18, base: 0.32, slow: 0.6, reveal: 0.9, cinematic: 1.4 } as const;

export const ease = {
  out: 'power3.out',
  inOut: 'power2.inOut',
  spring: 'back.out(1.6)',
  soft: 'sine.inOut',
} as const;

/** Presets reutilizáveis (gsap.from / gsap.to) */
export const presets = {
  reveal: { y: 48, opacity: 0, duration: duration.reveal, ease: ease.out },
  fade: { opacity: 0, duration: duration.slow, ease: ease.out },
  scale: { scale: 0.86, opacity: 0, duration: duration.reveal, ease: ease.out },
  rotate: { rotate: -8, y: 30, opacity: 0, duration: duration.reveal, ease: ease.spring },
  stagger: 0.09,
} as const;

/** Breakpoints em sincronia com tailwind.config.js */
export const mq = {
  desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
  motion: '(prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
  hover: '(hover: hover) and (pointer: fine)',
} as const;
