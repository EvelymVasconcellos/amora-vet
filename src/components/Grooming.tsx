import { useRef } from 'react';
import { CalendarHeart, MoveHorizontal } from 'lucide-react';
import { grooming, images } from '@/data/site';
import { useBooking } from '@/hooks/useBooking';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { gsap } from '@/utils/gsap';
import { BeforeAfterSlider } from './BeforeAfterSlider';

/** Banho e tosa + comparador antes/depois na mesma seção (parte do fluxo de Serviços). */
export function Grooming() {
  const root = useRef<HTMLElement>(null);
  const { open } = useBooking();

  useSectionReveal(root, () => {
    gsap.from('[data-ba-frame]', { y: 32, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '[data-ba-frame]', start: 'top 85%', once: true } });
  });

  return (
    <section ref={root} id="banho-e-tosa" aria-labelledby="banho-title" className="bg-fundo section-y">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <header className="flex flex-col gap-4 lg:col-span-6">
            <span className="eyebrow" data-reveal>{grooming.eyebrow}</span>
            <h2 id="banho-title" className="h2" data-reveal>{grooming.title}</h2>
            <p className="lead" data-reveal>{grooming.text}</p>
          </header>
          <ul className="flex flex-col divide-y divide-linha self-end lg:col-span-6" role="list">
            {grooming.points.map(({ title, text, icon: Icon }, i) => (
              <li key={title} className="flex gap-4 py-4 first:pt-0 last:pb-0" data-reveal>
                <span className={`icon-tile ${['icon-tile--marrom', 'icon-tile--amarelo', 'icon-tile--laranja'][i]} !h-11 !w-11 !rounded-xl`}><Icon size={20} aria-hidden="true" /></span>
                <div>
                  <h3 className="!text-lg">{title}</h3>
                  <p className="text-[0.95rem] text-suave">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-10 rounded-[32px] bg-superficie p-6 sm:p-10 lg:mt-20 lg:grid-cols-12 lg:gap-12 lg:p-14">
          <div className="flex flex-col items-start gap-4 lg:col-span-6 lg:pt-4">
            <h3 className="h2 !text-[clamp(1.5rem,1.2rem+1.2vw,2.125rem)]" data-reveal>{grooming.sliderTitle}</h3>
            <p className="lead" data-reveal>{grooming.sliderSubtitle}</p>
            <p className="inline-flex items-center gap-2 text-sm text-suave" data-reveal><MoveHorizontal size={16} aria-hidden="true" /> Use o mouse, o dedo ou as setas do teclado</p>
            <div className="mt-2 flex flex-col items-start gap-2" data-reveal>
              <button type="button" className="btn btn-primary" onClick={() => open('Banho e tosa')}><CalendarHeart size={18} aria-hidden="true" /> {grooming.cta}</button>
              <span className="text-xs text-suave">{grooming.note}</span>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div data-ba-frame className="mx-auto w-full max-w-[400px]">
              <BeforeAfterSlider
                before={images.before} after={images.after}
                beforeAlt={grooming.beforeAlt} afterAlt={grooming.afterAlt}
                beforeLabel={grooming.beforeLabel} afterLabel={grooming.afterLabel}
                width={824} height={1030}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
