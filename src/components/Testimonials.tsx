import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Info, Quote, Star } from 'lucide-react';
import { testimonials } from '@/data/site';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SectionTitle } from './ui/SectionTitle';

const avatarBg = ['var(--c-bege)', 'var(--c-amarelo-claro)', 'var(--c-laranja-claro)'];

/** Carrossel em "baralho": cartão ativo à frente, demais atrás. Autoplay pausa em hover/foco. */
export function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const n = testimonials.items.length;
  useSectionReveal(root);

  useEffect(() => {
    if (paused || reduced) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % n), 6000);
    return () => window.clearInterval(t);
  }, [paused, reduced, n]);

  const go = (d: number) => setI((v) => (v + d + n) % n);

  return (
    <section ref={root} id="depoimentos" aria-labelledby="dep-title" className="relative overflow-hidden bg-fundo section-y">
      <div className="wrap grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <SectionTitle eyebrow={testimonials.eyebrow} title={testimonials.title} id="dep-title" />
          <p className="flex items-start gap-2 rounded-2xl border border-linha bg-superficie px-4 py-3 text-sm text-suave" data-reveal>
            <Info size={18} className="mt-0.5 flex-none" aria-hidden="true" /> {testimonials.notice}
          </p>
          <div className="flex items-center gap-3" data-reveal>
            <button type="button" className="btn btn-secondary btn-icon" onClick={() => go(-1)} aria-label="Depoimento anterior" aria-controls="dep-deck"><ArrowLeft size={20} aria-hidden="true" /></button>
            <button type="button" className="btn btn-secondary btn-icon" onClick={() => go(1)} aria-label="Próximo depoimento" aria-controls="dep-deck"><ArrowRight size={20} aria-hidden="true" /></button>
            <div className="ml-2 flex gap-2" role="group" aria-label="Escolher depoimento">
              {testimonials.items.map((t, k) => (
                <button key={k} type="button" onClick={() => setI(k)} aria-label={`Depoimento ${k + 1}: ${t.name}`} aria-current={k === i ? 'true' : undefined}
                  className="grid h-6 place-items-center rounded-full" style={{ width: 28 }}>
                  <span className="block h-2.5 rounded-full bg-marrom transition-all duration-300" style={{ width: k === i ? 26 : 10, opacity: k === i ? 1 : 0.25 }} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <div id="dep-deck" className="relative mx-auto h-[360px] max-w-[560px] sm:h-[330px]" aria-live="polite" data-reveal>
            {testimonials.items.map((t, k) => {
              const off = (k - i + n) % n; // 0 = ativo
              return (
                <figure key={k} aria-hidden={off !== 0} className="card absolute inset-0 m-0 flex flex-col justify-between gap-6 !p-8"
                  style={{
                    zIndex: n - off,
                    transform: `translate3d(${off * 18}px, ${off * -16}px, 0) scale(${1 - off * 0.04})`,
                    opacity: off > 2 ? 0 : 1 - off * 0.15,
                    transition: 'transform .8s var(--e-out), opacity .6s var(--e-out)',
                    background: off === 0 ? 'var(--c-superficie)' : 'var(--c-neutro)',
                    visibility: off === 0 || off < 3 ? 'visible' : 'hidden',
                  }}>
                  <div className="flex items-center justify-between">
                    <span className="flex gap-1" aria-label={`${t.rating} de 5 estrelas`} role="img">
                      {Array.from({ length: 5 }).map((_, s) => <Star key={s} size={20} fill="var(--c-laranja)" stroke="var(--c-laranja)" aria-hidden="true" />)}
                    </span>
                    <span className="chip chip-demo">Exemplo ilustrativo</span>
                  </div>
                  <blockquote className="m-0 flex gap-3 font-display text-lg font-medium leading-relaxed sm:text-xl">
                    <Quote size={26} className="flex-none text-laranja-texto" aria-hidden="true" />
                    <p>“{t.text}”</p>
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-full font-display font-semibold text-marrom" style={{ background: avatarBg[k % 3] }}>{t.initials}</span>
                    <span className="flex flex-col leading-tight">
                      <span className="font-display font-semibold">{t.name}</span>
                      <span className="text-sm text-suave">{t.pet}</span>
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
