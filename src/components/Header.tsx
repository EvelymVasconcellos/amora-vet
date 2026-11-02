import { useEffect, useRef, useState } from 'react';
import { CalendarHeart, Menu, X } from 'lucide-react';
import { nav } from '@/data/site';
import { useBooking } from '@/hooks/useBooking';
import { Logo } from './ui/Logo';

/**
 * Header fixo: integrado ao fundo no topo, ganha superfície branca ao rolar,
 * esconde ao descer e reaparece ao subir. Indica a seção ativa.
 */
export function Header() {
  const { open } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('');
  const progress = useRef<HTMLDivElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        if (y > 600 && y > last + 6) setHidden(true);
        else if (y < last - 6 || y < 600) setHidden(false);
        last = y;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    // Observa todas as seções; o item ativo é o grupo que contém a seção no centro da tela
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const item = nav.find((n) => n.sections.includes(e.target.id));
        setActive(item ? item.href : '');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false); };
    document.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    panel.current?.querySelector<HTMLElement>('button[aria-label="Fechar menu"]')?.focus();
    const btn = menuBtn.current;
    return () => { document.removeEventListener('keydown', onKey); document.documentElement.style.overflow = ''; btn?.focus(); };
  }, [menu]);

  const solid = scrolled || menu;

  return (
    <>
      <a href="#conteudo" className="sr-only-focusable fixed left-4 top-4 z-modal rounded-full bg-marrom px-4 py-2 font-semibold text-white">Pular para o conteúdo</a>
      <header
        className={`fixed inset-x-0 top-0 z-header transition-[transform,background-color,box-shadow] duration-500 ${solid ? '' : 'on-brand'}`}
        style={{
          transform: hidden && !menu ? 'translateY(-110%)' : 'translateY(0)',
          background: solid ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
          backdropFilter: solid ? 'saturate(1.6) blur(14px)' : undefined,
          WebkitBackdropFilter: solid ? 'saturate(1.6) blur(14px)' : undefined,
          boxShadow: scrolled ? '0 8px 24px -16px rgba(48,37,31,.35)' : 'none',
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
      >
        <div className="wrap flex h-[72px] items-center justify-between gap-6">
          <a href="#inicio" aria-label="Amora Vet, voltar ao início" className="rounded-xl"><Logo compact /></a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((n) => {
                const on = active === n.href;
                return (
                  <li key={n.href}>
                    <a href={n.href} aria-current={on ? 'true' : undefined}
                      className="relative block whitespace-nowrap rounded-full px-4 py-2 font-display text-[0.9375rem] font-medium transition-colors"
                      style={{ color: on ? 'var(--c-marrom)' : 'var(--c-texto)' }}>
                      {n.label}
                      <span aria-hidden="true" className="absolute bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-marrom transition-transform duration-300" style={{ transform: `translateX(-50%) scale(${on ? 1 : 0})` }} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button type="button" className="btn btn-primary btn-sm hidden xl:inline-flex" onClick={() => open()}>
              <CalendarHeart size={17} aria-hidden="true" /> Agendar
            </button>
            <button ref={menuBtn} type="button" className="btn btn-secondary btn-icon lg:hidden" aria-expanded={menu} aria-controls="menu-mobile"
              aria-label={menu ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenu((v) => !v)}>
              {menu ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
        <div ref={progress} aria-hidden="true" className="absolute bottom-0 left-0 h-[2px] w-full origin-left" style={{ transform: 'scaleX(0)', background: 'var(--c-laranja)' }} />
      </header>

      <div id="menu-mobile" ref={panel} role="dialog" aria-modal="true" aria-label="Menu" hidden={!menu}
        className="fixed inset-0 z-overlay overflow-y-auto bg-superficie lg:hidden" style={{ paddingTop: 'calc(88px + env(safe-area-inset-top, 0px))' }}>
        {/* Barra superior do menu com botão de fechar sempre visível */}
        <div className="fixed inset-x-0 top-0 z-content border-b border-linha bg-superficie" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
          <div className="wrap flex h-[72px] items-center justify-between">
            <a href="#inicio" onClick={() => setMenu(false)} aria-label="Amora Vet, voltar ao início" className="rounded-xl"><Logo compact /></a>
            <button type="button" className="btn btn-secondary btn-icon" onClick={() => setMenu(false)} aria-label="Fechar menu">
              <X size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
        <nav aria-label="Menu mobile" className="wrap flex min-h-full flex-col gap-8 pb-10">
          <ul className="flex flex-col">
            {nav.map((n, i) => (
              <li key={n.href} style={{ animation: `menu-in .45s var(--e-out) ${i * 0.04}s both` }}>
                <a href={n.href} onClick={() => setMenu(false)}
                  className="flex items-center justify-between border-b border-linha py-4 font-display text-2xl font-semibold"
                  aria-current={active === n.href ? 'true' : undefined} style={{ color: active === n.href ? 'var(--c-laranja-texto)' : undefined }}>
                  {n.label}<span aria-hidden="true" className="text-lg text-suave">→</span>
                </a>
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn-primary w-full" onClick={() => { setMenu(false); open(); }}>
            <CalendarHeart size={18} aria-hidden="true" /> Agendar
          </button>
        </nav>
      </div>
      <style>{`@keyframes menu-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }`}</style>
    </>
  );
}
