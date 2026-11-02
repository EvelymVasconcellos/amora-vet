import { useEffect, useRef, useState } from 'react';
import { CalendarHeart, Pause, Play, Scissors } from 'lucide-react';
import { hero, images } from '@/data/site';
import { useBooking } from '@/hooks/useBooking';
import { useGsap } from '@/hooks/useGsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap } from '@/utils/gsap';
import { mq } from '@/design-system/motion';
import { Heart, Paw, Sparkle, Star, Wave } from './decor/Decor';

/**
 * Hero na composição original: fundo laranja, texto à esquerda (≈45%),
 * gato no círculo amarelo à direita (≈55%), decoração discreta e onda inferior.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const { open } = useBooking();
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(!reduced);

  useEffect(() => {
    const v = video.current; if (!v) return;
    if (reduced) { v.pause(); setPlaying(false); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && playing) v.play().catch(() => setPlaying(false)); else v.pause();
    }, { threshold: 0.05 });
    io.observe(v);
    return () => io.disconnect();
  }, [reduced, playing]);

  const togglePlay = () => {
    const v = video.current; if (!v) return;
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {}); else { v.pause(); setPlaying(false); }
  };

  useGsap(root, () => {
    const mm = gsap.matchMedia();
    mm.add(mq.motion, () => {
      // Entrada: título → subtítulo → botões → gato (escala leve) → decoração
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-hero="hand"]', { y: 12, opacity: 0, duration: 0.6 })
        .from('[data-hero="title"]', { y: 28, opacity: 0, duration: 0.8 }, '-=0.35')
        .from('[data-hero="sub"]', { y: 18, opacity: 0, duration: 0.6 }, '-=0.45')
        .from('[data-hero="cta"] > *', { y: 16, opacity: 0, duration: 0.55, stagger: 0.08 }, '-=0.35')
        .from('[data-hero="blob"]', { scale: 0.86, opacity: 0, duration: 1, ease: 'power2.out' }, 0.2)
        .from('[data-hero="cat"]', { scale: 1.1, duration: 1.4, ease: 'power2.out' }, 0.2)
        .from('[data-hero="deco"]', { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.08 }, 0.9);

      // Scroll: parallax curto e saída suave do texto
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.5 };
      gsap.to('[data-hero="media"]', { y: 50, ease: 'none', scrollTrigger: st });
      gsap.to('[data-hero="copy"]', { y: -30, opacity: 0.2, ease: 'none', scrollTrigger: { ...st, end: '80% top' } });
    });
    // Profundidade sutil com o mouse
    mm.add(`${mq.desktop} and ${mq.hover}`, () => {
      const layers = gsap.utils.toArray<HTMLElement>('[data-depth]').map((el) => ({
        d: Number(el.dataset.depth),
        x: gsap.quickTo(el, 'x', { duration: 1.1, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 1.1, ease: 'power3.out' }),
      }));
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5;
        layers.forEach((l) => { l.x(nx * l.d); l.y(ny * l.d); });
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      return () => window.removeEventListener('pointermove', onMove);
    });
  });

  return (
    <section ref={root} id="inicio" aria-labelledby="hero-title" className="on-brand relative overflow-hidden bg-laranja">
      <div className="wrap relative grid grid-cols-1 items-center gap-10 pb-[clamp(72px,9vw,130px)] pt-[104px] lg:min-h-[min(760px,92svh)] lg:grid-cols-[45fr_55fr] lg:gap-8 lg:pt-[88px]">
        {/* Texto */}
        <div data-hero="copy" className="relative z-content flex flex-col items-start gap-4">
          <p data-hero="hand" className="hand -rotate-2 text-[1.5rem] leading-none sm:text-[1.65rem]">{hero.handwritten}</p>
          <h1 id="hero-title" data-hero="title" className="font-display font-extrabold leading-[1.05] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(2rem, 1.2rem + 3.2vw, 3.5rem)', maxWidth: '12ch' }}>
            {hero.title}
          </h1>
          <p data-hero="sub" className="text-[1.0625rem] font-medium sm:text-lg" style={{ color: 'rgba(48,37,31,.86)' }}>{hero.subtitle}</p>
          <div data-hero="cta" className="mt-3 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button type="button" className="btn btn-primary" onClick={() => open(hero.primary.service)}><CalendarHeart size={18} aria-hidden="true" /> {hero.primary.label}</button>
            <button type="button" className="btn btn-secondary" onClick={() => open(hero.secondary.service)}><Scissors size={18} aria-hidden="true" /> {hero.secondary.label}</button>
          </div>
        </div>

        {/* Gato no círculo amarelo */}
        <div className="relative">
          <div data-hero="media" className="relative mx-auto w-full max-w-[560px]">
            <div data-depth="8">
              <div data-hero="blob" className="relative aspect-[1.12] overflow-hidden shadow-lift"
                style={{ borderRadius: '48% 52% 40% 60% / 56% 50% 50% 44%', background: '#F4B900' }}>
                <div data-hero="cat" className="absolute inset-y-0 left-[-34%] right-[-34%]">
                  <video ref={video} className="h-full w-full object-cover" src={images.heroVideo} poster={images.heroPoster}
                    muted loop playsInline autoPlay={!reduced} preload="auto" aria-label={hero.videoAlt} />
                </div>
              </div>
            </div>

            {/* Decoração: coração, estrela, patinha e brilho */}
            <div data-hero="deco" aria-hidden="true" className="absolute -left-3 top-[4%] sm:-left-6"><div data-depth="18"><Heart size={46} className="deco-heart" /></div></div>
            <div data-hero="deco" aria-hidden="true" className="absolute -top-6 right-[12%]"><div data-depth="26"><Star size={34} className="deco-star" /></div></div>
            <div data-hero="deco" aria-hidden="true" className="absolute -bottom-3 right-[8%]"><div data-depth="14"><Paw size={44} className="deco-paw" /></div></div>
            <div data-hero="deco" aria-hidden="true" className="absolute -left-5 bottom-[22%] hidden sm:block"><div data-depth="10"><Sparkle size={22} className="deco-sparkle" /></div></div>

            <button type="button" onClick={togglePlay} className="btn btn-secondary btn-icon absolute bottom-[8%] left-[10%] z-content !min-h-[38px] !w-[38px] opacity-80 hover:opacity-100"
              aria-label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}>
              {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Onda laranja → bege */}
      <div className="absolute inset-x-0 bottom-[-1px]"><Wave to="var(--c-fundo)" /></div>
    </section>
  );
}
