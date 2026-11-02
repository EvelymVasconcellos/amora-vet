import { useId, useRef, useState } from 'react';
import { faq } from '@/data/site';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { SectionTitle } from './ui/SectionTitle';

/** Accordion acessível (botão com aria-expanded + região rotulada). Vários podem ficar abertos. */
export function FAQ() {
  const root = useRef<HTMLElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const uid = useId();
  useSectionReveal(root);

  return (
    <section ref={root} id="faq" aria-labelledby="faq-title" className="relative bg-superficie section-y">
      <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <SectionTitle eyebrow={faq.eyebrow} title={faq.title} subtitle="Reunimos as perguntas que mais recebemos dos tutores." id="faq-title" />
          <div className="card hidden flex-col gap-3 !p-6 lg:flex" data-reveal>
            <p className="font-display font-semibold">Não encontrou o que procurava?</p>
            <p className="text-sm text-suave">Fale com a nossa equipe e tire suas dúvidas antes de agendar.</p>
            <a href="#contato" className="link-arrow">Ir para o contato <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className="flex flex-col gap-3 lg:col-span-8">
          {faq.items.map((f, i) => {
            const open = openIdx === i;
            const bid = `${uid}-b${i}`, pid = `${uid}-p${i}`;
            return (
              <div key={f.q} data-reveal className="overflow-hidden rounded-[20px] transition-colors duration-300" style={{ background: open ? 'var(--c-fundo)' : 'var(--c-superficie)', border: `1px solid ${open ? 'var(--c-marrom)' : 'var(--c-linha)'}` }}>
                <h3 className="m-0">
                  <button id={bid} type="button" aria-expanded={open} aria-controls={pid} onClick={() => setOpenIdx(open ? null : i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-display text-[1.0625rem] font-semibold">
                    {f.q}
                    <span aria-hidden="true" className="relative grid h-10 w-10 flex-none place-items-center rounded-full transition-colors" style={{ background: open ? 'var(--c-marrom)' : 'var(--c-neutro)' }}>
                      <span className="absolute h-[3px] w-4 rounded-full" style={{ background: open ? '#fff' : 'var(--c-texto)' }} />
                      <span className="absolute h-4 w-[3px] rounded-full transition-transform duration-300" style={{ background: open ? '#fff' : 'var(--c-texto)', transform: open ? 'scaleY(0)' : 'scaleY(1)' }} />
                    </span>
                  </button>
                </h3>
                <div id={pid} role="region" aria-labelledby={bid} className="grid transition-[grid-template-rows] duration-500" style={{ gridTemplateRows: open ? '1fr' : '0fr', transitionTimingFunction: 'var(--e-out)' }} ref={(el) => { if (el) el.inert = !open; }}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-suave">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
