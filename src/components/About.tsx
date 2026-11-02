import { useEffect, useRef } from 'react';
import { about, images } from '@/data/site';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap } from '@/utils/gsap';
import { SectionTitle } from './ui/SectionTitle';

export function About() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  // Autoplay sem áudio; pausa fora da tela e com movimento reduzido (fica o poster)
  useEffect(() => {
    const v = video.current; if (!v) return;
    if (reduced) { v.pause(); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  useSectionReveal(root, () => {
    gsap.from('[data-about-media]', { y: 32, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '[data-about-media]', start: 'top 85%', once: true } });
  });

  return (
    <section ref={root} id="sobre" aria-labelledby="sobre-title" className="relative bg-superficie section-y">
      {/* Mobile/iPad: título → vídeo → texto · Desktop: vídeo à esquerda, título e texto à direita */}
      <div className="wrap grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-5">
        <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:self-end">
          <SectionTitle eyebrow={about.eyebrow} title={about.title} id="sobre-title" />
        </div>
        <div className="lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center">
          <div data-about-media className="relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-[28px] shadow-lift sm:aspect-[16/11] sm:max-w-[640px] lg:aspect-[3/4] lg:max-w-[420px]" style={{ background: '#FECC1F' }}>
            <video ref={video} className="h-full w-full object-cover" style={{ objectPosition: '50% 30%' }} poster={images.aboutPoster}
              autoPlay={!reduced} muted loop playsInline preload="metadata" aria-label={about.videoAlt} width={720} height={972}>
              <source src={images.aboutVideo} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="flex flex-col gap-5 lg:col-span-7 lg:col-start-6 lg:row-start-2 lg:self-start">
          {about.paragraphs.map((p, i) => <p key={i} className="lead" data-reveal>{p}</p>)}
          <p className="mt-1 font-display text-lg font-semibold" data-reveal>{about.highlight}</p>
        </div>
      </div>
    </section>
  );
}
