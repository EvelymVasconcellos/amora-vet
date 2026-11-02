import { useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { services } from '@/data/site';
import { useBooking } from '@/hooks/useBooking';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { SectionTitle } from './ui/SectionTitle';

/** Serviços em cards compactos (ícone + nome + descrição + link), filtrados por categoria. */
export function Services() {
  const root = useRef<HTMLElement>(null);
  const [cat, setCat] = useState(0);
  const { open } = useBooking();
  useSectionReveal(root);
  const current = services.categories[cat];

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (cat + (e.key === 'ArrowRight' ? 1 : -1) + services.categories.length) % services.categories.length;
    setCat(next);
    root.current?.querySelector<HTMLElement>(`#tab-${services.categories[next].id}`)?.focus();
  };

  return (
    <section ref={root} id="servicos" aria-labelledby="servicos-title" className="bg-superficie section-y" style={{ paddingTop: 'clamp(2rem, 1.5rem + 2vw, 3.5rem)' }}>
      <div className="wrap">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle eyebrow={services.eyebrow} title={services.title} subtitle={services.subtitle} id="servicos-title" />
          <div role="tablist" aria-label="Categorias de serviço" onKeyDown={onKey} data-reveal
            className="inline-flex flex-none gap-1 rounded-full border border-linha bg-fundo p-1">
            {services.categories.map((c, k) => {
              const on = k === cat;
              return (
                <button key={c.id} id={`tab-${c.id}`} type="button" role="tab" aria-selected={on} aria-controls="servicos-painel" tabIndex={on ? 0 : -1}
                  onClick={() => setCat(k)}
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-full px-4 font-display text-sm font-semibold transition-colors duration-300"
                  style={{ background: on ? 'var(--c-amarelo)' : 'transparent', color: 'var(--c-marrom)' }}>
                  {c.label}
                  <span className="grid h-5 min-w-[20px] place-items-center rounded-full px-1 text-[0.6875rem]" style={{ background: on ? 'rgba(255,255,255,.7)' : 'var(--c-superficie)' }}>{c.items.length}</span>
                </button>
              );
            })}
          </div>
        </div>

        <ul id="servicos-painel" role="tabpanel" aria-labelledby={`tab-${current.id}`} key={current.id}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {current.items.map(({ id, title, text, icon: Icon, booking }, k) => (
            <li key={id} className="svc-card" style={{ animationDelay: `${k * 50}ms` }}>
              <span className="icon-tile !h-12 !w-12 !rounded-2xl" style={{ background: 'var(--c-bege)', color: 'var(--c-laranja-texto)' }}><Icon size={22} aria-hidden="true" /></span>
              <div className="flex min-w-0 flex-col gap-1.5">
                <h3 className="!text-[1.0625rem] !leading-snug">{title}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-suave">{text}</p>
                <button type="button" className="link-arrow mt-auto self-start !text-sm" style={{ color: 'var(--c-laranja-texto)' }}
                  onClick={() => open(booking)} aria-label={`Pedir informações: ${title}`}>
                  {services.cta} <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
