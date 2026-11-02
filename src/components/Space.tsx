import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { images, space } from '@/data/site';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * "Conheça nosso espaço": texto + carrossel com fade.
 * Troca a cada ~4,5 s; pausa no hover/foco, ao interagir e com movimento reduzido.
 */
export function Space() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const n = space.slides.length;
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const [stopped, setStopped] = useState(false); // usuário assumiu o controle
  const [visible, setVisible] = useState(false);
  useSectionReveal(root);

  useEffect(() => {
    const el = root.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = !reduced && !stopped && !hover && visible;
  useEffect(() => {
    if (!playing) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % n), space.intervalMs);
    return () => window.clearInterval(t);
  }, [playing, n]);

  const go = useCallback((v: number) => { setStopped(true); setI(((v % n) + n) % n); }, [n]);

  return (
    <section ref={root} id="espaco" aria-labelledby="espaco-title" className="bg-fundo section-y">
      <span id="conteudo" />
      {/* Mobile/iPad: título → carrossel → texto · Desktop: texto à esquerda, carrossel à direita */}
      <div className="wrap grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-5">
        <header className="order-1 flex flex-col gap-4 lg:order-none lg:col-start-1 lg:row-start-1 lg:self-start lg:pt-2">
          <span className="eyebrow" data-reveal>{space.eyebrow}</span>
          <h2 id="espaco-title" className="h2" data-reveal>{space.title}</h2>
        </header>
        <div className="order-3 flex max-w-[34rem] flex-col gap-4 lg:order-none lg:col-start-1 lg:row-start-2 lg:self-start">
          {space.paragraphs.map((p, k) => <p key={k} className="lead" data-reveal>{p}</p>)}
        </div>

        <div className="order-2 w-full lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start" data-reveal data-space-carousel>
          <div className="relative" role="region" aria-roledescription="carrossel" aria-label="Fotos do espaço"
            onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
            onFocus={() => setHover(true)} onBlur={() => setHover(false)}>
            <div className="space-frame relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-neutro shadow-lift lg:aspect-[4/5]">
              {space.slides.map((s, k) => (
                <figure key={s.key} className="absolute inset-0 m-0 transition-opacity duration-700 ease-out"
                  style={{ opacity: k === i ? 1 : 0 }} aria-hidden={k !== i}
                  aria-roledescription="slide" aria-label={`${k + 1} de ${n}: ${s.label}`}>
                  <img src={images[s.key]} alt={s.alt} loading={k === 0 ? 'eager' : 'lazy'} decoding="async" width={736} height={920}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out" style={{ transform: k === i ? 'scale(1)' : 'scale(1.03)', objectPosition: s.pos }} />
                </figure>
              ))}
              <span className="chip chip-demo absolute left-4 top-4">{space.notice}</span>
              <p className="absolute bottom-4 left-4 rounded-full px-4 py-2 font-display text-sm font-semibold shadow-soft" style={{ background: 'rgba(255,255,255,.95)' }} aria-live="polite">
                {space.slides[i].label}
              </p>
            </div>

            <div className="space-frame mx-auto mt-3 flex w-full items-center justify-between gap-4">
              <div className="flex gap-1.5" role="group" aria-label="Escolher foto">
                {space.slides.map((s, k) => (
                  <button key={s.key} type="button" onClick={() => go(k)} aria-label={`Mostrar: ${s.label}`} aria-current={k === i ? 'true' : undefined}
                    className="grid h-6 place-items-center rounded-full" style={{ width: k === i ? 34 : 18 }}>
                    <span className="block h-1.5 w-full rounded-full transition-colors duration-300" style={{ background: k === i ? 'var(--c-laranja)' : 'var(--c-linha)' }} />
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {!reduced && (
                  <button type="button" className="btn btn-secondary btn-icon !min-h-[40px] !w-[40px]" onClick={() => setStopped((v) => !v)}
                    aria-label={stopped ? 'Retomar troca automática' : 'Pausar troca automática'}>
                    {stopped ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
                  </button>
                )}
                <button type="button" className="btn btn-secondary btn-icon !min-h-[40px] !w-[40px]" onClick={() => go(i - 1)} aria-label="Foto anterior"><ChevronLeft size={18} aria-hidden="true" /></button>
                <button type="button" className="btn btn-secondary btn-icon !min-h-[40px] !w-[40px]" onClick={() => go(i + 1)} aria-label="Próxima foto"><ChevronRight size={18} aria-hidden="true" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
