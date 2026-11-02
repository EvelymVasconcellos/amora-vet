import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/utils/gsap';

export interface BeforeAfterProps {
  before: string; after: string;
  beforeAlt: string; afterAlt: string;
  beforeLabel?: string; afterLabel?: string;
  width: number; height: number;
  /** Posição inicial do divisor (0–100) */
  initial?: number;
  /** Revelação vinculada ao scroll + demonstração automática ao entrar */
  autoplay?: boolean;
  className?: string;
}

const clamp = (v: number) => Math.min(100, Math.max(0, v));

/**
 * Comparador antes/depois.
 * - Duas imagens idênticas em tamanho, sobrepostas; a de "depois" é recortada com clip-path.
 * - Pointer Events (mouse, touch, caneta) com captura do ponteiro.
 * - Teclado: ← → (2%), Shift/PageUp/PageDown (10%), Home/End.
 * - Animação automática contínua (vai e volta) enquanto está na tela; pausa ao arrastar,
 *   usar o teclado ou focar o controle, e retoma após alguns segundos. Botão para pausar.
 *   Respeita prefers-reduced-motion (sem animação).
 */
export function BeforeAfterSlider({
  before, after, beforeAlt, afterAlt, beforeLabel = 'Antes', afterLabel = 'Depois',
  width, height, initial = 50, autoplay = true, className = '',
}: BeforeAfterProps) {
  const box = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLDivElement>(null);
  const pos = useRef(initial);
  const dragging = useRef(false);
  const loop = useRef<gsap.core.Timeline | null>(null);
  const inView = useRef(false);
  const interacting = useRef(false);
  const userPaused = useRef(false);
  const idle = useRef<number>();
  const [paused, setPaused] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);

  const apply = useCallback((v: number) => {
    pos.current = clamp(v);
    const el = box.current; if (!el) return;
    el.style.setProperty('--pos', `${pos.current}%`);
    el.style.setProperty('--before-o', pos.current > 24 ? '1' : '0');
    el.style.setProperty('--after-o', pos.current < 76 ? '1' : '0');
    const h = handle.current;
    if (h) {
      const n = Math.round(pos.current);
      h.setAttribute('aria-valuenow', String(n));
      h.setAttribute('aria-valuetext', `${n}% ${beforeLabel.toLowerCase()}, ${100 - n}% ${afterLabel.toLowerCase()}`);
    }
  }, [beforeLabel, afterLabel]);

  /** Animação automática contínua (vai e volta entre 28% e 72%), a partir da posição atual */
  const stopLoop = useCallback(() => { loop.current?.kill(); loop.current = null; }, []);
  const startLoop = useCallback(() => {
    if (!canAnimate || !inView.current || interacting.current || userPaused.current || loop.current) return;
    const proxy = { v: pos.current };
    const upd = () => apply(proxy.v);
    const tl = gsap.timeline();
    tl.to(proxy, { v: 28, duration: Math.max(0.4, Math.abs(pos.current - 28) / 30), ease: 'sine.inOut', onUpdate: upd })
      .to(proxy, { v: 72, duration: 2.6, ease: 'sine.inOut', repeat: -1, yoyo: true, onUpdate: upd });
    loop.current = tl;
  }, [apply, canAnimate]);

  /** Usuário interagiu: pausa já; retoma sozinho após alguns segundos parado */
  const holdAuto = useCallback(() => { interacting.current = true; window.clearTimeout(idle.current); stopLoop(); }, [stopLoop]);
  const releaseAuto = useCallback((delay = 3000) => {
    window.clearTimeout(idle.current);
    idle.current = window.setTimeout(() => { interacting.current = false; startLoop(); }, delay);
  }, [startLoop]);

  useEffect(() => {
    setCanAnimate(autoplay && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, [autoplay]);

  useEffect(() => {
    apply(initial);
    const el = box.current;
    if (!el || !canAnimate) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el, start: 'top 85%', end: 'bottom 15%',
        onToggle: (self) => { inView.current = self.isActive; if (self.isActive) startLoop(); else stopLoop(); },
      });
    });
    return () => { ctx.revert(); stopLoop(); window.clearTimeout(idle.current); };
  }, [apply, canAnimate, initial, startLoop, stopLoop]);

  const togglePause = () => {
    userPaused.current = !userPaused.current;
    setPaused(userPaused.current);
    if (userPaused.current) stopLoop(); else { interacting.current = false; startLoop(); }
  };

  const fromClientX = (x: number) => {
    const r = box.current!.getBoundingClientRect();
    apply(((x - r.left) / r.width) * 100);
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    holdAuto();
    dragging.current = true;
    box.current?.setPointerCapture(e.pointerId);
    box.current?.classList.add('is-dragging');
    fromClientX(e.clientX);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => { if (dragging.current) fromClientX(e.clientX); };
  const onUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    box.current?.classList.remove('is-dragging');
    if (box.current?.hasPointerCapture(e.pointerId)) box.current.releasePointerCapture(e.pointerId);
    releaseAuto();
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const big = e.shiftKey ? 10 : 2;
    const map: Record<string, number> = {
      ArrowLeft: pos.current - big, ArrowDown: pos.current - big, ArrowRight: pos.current + big, ArrowUp: pos.current + big,
      PageDown: pos.current - 10, PageUp: pos.current + 10, Home: 0, End: 100,
    };
    if (e.key in map) { e.preventDefault(); holdAuto(); apply(map[e.key]); }
  };

  return (
    <div ref={box} className={`ba ${className}`}
      style={{ aspectRatio: `${width} / ${height}`, ['--pos' as string]: `${initial}%` }}
      onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
      <img className="ba__img" src={before} alt={beforeAlt} width={width} height={height} draggable={false} loading="lazy" decoding="async" />
      <img className="ba__img ba__after" src={after} alt={afterAlt} width={width} height={height} draggable={false} loading="lazy" decoding="async" />

      <span className="ba__label ba__label--before" aria-hidden="true">{beforeLabel}</span>
      <span className="ba__label ba__label--after" aria-hidden="true">{afterLabel}</span>

      <div className="ba__line" aria-hidden="true" />
      <div ref={handle} className="ba__handle" role="slider" tabIndex={0}
        aria-label={`Comparar ${beforeLabel.toLowerCase()} e ${afterLabel.toLowerCase()} da tosa`}
        aria-valuemin={0} aria-valuemax={100} aria-valuenow={initial} aria-orientation="horizontal"
        onKeyDown={onKey} onFocus={holdAuto} onBlur={() => releaseAuto(1500)}>
        <ChevronLeft size={20} strokeWidth={3} aria-hidden="true" />
        <ChevronRight size={20} strokeWidth={3} aria-hidden="true" />
      </div>

      {canAnimate && (
        <button type="button" className="ba__toggle" onPointerDown={(e) => e.stopPropagation()} onClick={togglePause}
          aria-label={paused ? 'Retomar animação automática' : 'Pausar animação automática'}>
          {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}
