import { useEffect, useState } from 'react';
import { CalendarHeart } from 'lucide-react';
import { useBooking } from '@/hooks/useBooking';

/**
 * Barra fixa de agendamento para celular e tablet (onde o header não tem o botão).
 * Aparece depois do hero e some sobre o rodapé, com o modal aberto ou com o menu aberto.
 */
export function StickyCTA() {
  const { open, isOpen } = useBooking();
  const [pastHero, setPastHero] = useState(false);
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('inicio');
    const footer = document.querySelector('#root > footer');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) setPastHero(!e.isIntersecting);
        if (e.target === footer) setAtFooter(e.isIntersecting);
      });
    }, { threshold: 0 });
    if (hero) io.observe(hero);
    if (footer) io.observe(footer);
    return () => io.disconnect();
  }, []);

  const show = pastHero && !atFooter && !isOpen;

  return (
    <div className="sticky-cta xl:hidden" data-show={show} aria-hidden={!show}>
      <div className="flex items-center justify-between gap-3 rounded-full border border-linha bg-superficie py-2 pl-5 pr-2 shadow-lift">
        <span className="min-w-0 truncate font-display text-sm font-semibold">Agende uma visita</span>
        <button type="button" className="btn btn-primary btn-sm flex-none" tabIndex={show ? 0 : -1} onClick={() => open()}>
          <CalendarHeart size={17} aria-hidden="true" /> Agendar
        </button>
      </div>
    </div>
  );
}
