import { useLayoutEffect, type DependencyList, type RefObject } from 'react';
import { gsap } from '@/utils/gsap';

/**
 * Executa animações dentro de um gsap.context com escopo no elemento.
 * Tudo (tweens + ScrollTriggers + matchMedia) é revertido ao desmontar,
 * evitando animações duplicadas no StrictMode e vazamento de listeners.
 */
export function useGsap(scope: RefObject<HTMLElement>, setup: (ctx: gsap.Context) => void | (() => void), deps: DependencyList = []) {
  useLayoutEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context((self) => setup(self), scope.current);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
