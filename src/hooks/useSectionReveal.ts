import type { RefObject } from 'react';
import { gsap, ScrollTrigger } from '@/utils/gsap';
import { presets, mq } from '@/design-system/motion';
import { useGsap } from './useGsap';

/**
 * Revela em sequência todos os [data-reveal] dentro da seção conforme
 * entram na viewport. Com prefers-reduced-motion, nada é animado.
 * `extra` recebe o contexto para animações específicas da seção.
 */
export function useSectionReveal(scope: RefObject<HTMLElement>, extra?: (el: HTMLElement) => void) {
  useGsap(scope, () => {
    const el = scope.current!;
    const mm = gsap.matchMedia();
    mm.add(mq.motion, () => {
      const items = gsap.utils.toArray<HTMLElement>('[data-reveal]', el);
      gsap.set(items, { opacity: 0, y: presets.reveal.y });
      ScrollTrigger.batch(items, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: presets.reveal.duration, ease: presets.reveal.ease, stagger: presets.stagger, overwrite: true }),
      });
      extra?.(el);
    });
  });
}
