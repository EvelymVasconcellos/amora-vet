import { ArrowDown } from 'lucide-react';

/** Seta da primeira dobra — clique rola para a próxima seção. */
export function ScrollIndicator({ target }: { target: string }) {
  const go = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelector(target)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };
  return (
    <button type="button" onClick={go} data-hero="arrow" aria-label="Ir para a próxima seção"
      className="group inline-flex items-center gap-3 rounded-full py-1 pr-2 text-sm font-semibold text-suave transition-colors hover:text-texto">
      <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full border border-linha bg-superficie transition-colors group-hover:border-marrom group-hover:text-marrom">
        <ArrowDown size={18} style={{ animation: 'bob 2s var(--e-in-out) infinite' }} />
      </span>
      Role para conhecer
    </button>
  );
}
