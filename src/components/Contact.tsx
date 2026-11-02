import { useRef, useState } from 'react';
import { CalendarHeart, Clock, Instagram, MapPin, MessageCircle, Navigation } from 'lucide-react';
import { contact, contactSection, units } from '@/data/site';
import { useBooking } from '@/hooks/useBooking';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { SectionTitle } from './ui/SectionTitle';

/** Mapa ilustrativo (sem marcador real) usado enquanto não há endereço configurado */
function MapPlaceholder({ notice }: { notice: string }) {
  return (
    <div className="relative h-full min-h-[320px] overflow-hidden rounded-[24px] border border-linha" style={{ background: '#FBF3E9' }}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="600" height="450" fill="#FBF3E9" />
        <path d="M-20 120 C 120 100, 220 180, 360 150 S 560 90, 640 120" stroke="#fff" strokeWidth="26" fill="none" />
        <path d="M-20 330 C 140 300, 260 360, 420 320 S 580 280, 640 300" stroke="#fff" strokeWidth="20" fill="none" />
        <path d="M180 -20 C 200 120, 160 260, 210 470" stroke="#fff" strokeWidth="22" fill="none" />
        <path d="M430 -20 C 410 140, 460 300, 420 470" stroke="#fff" strokeWidth="16" fill="none" />
        <rect x="250" y="190" width="120" height="80" rx="14" fill="#F2E2CF" />
        <rect x="40" y="170" width="100" height="110" rx="14" fill="#F2E2CF" />
        <rect x="470" y="170" width="110" height="90" rx="14" fill="#F2E2CF" />
        <circle cx="520" cy="380" r="36" fill="#E9EFD9" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-laranja text-marrom shadow-lift"><MapPin size={26} aria-hidden="true" /></span>
        <p className="max-w-[18rem] rounded-2xl bg-superficie px-4 py-3 text-sm text-suave shadow-soft">{notice}</p>
      </div>
    </div>
  );
}

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const { open } = useBooking();
  const [idx, setIdx] = useState(0);
  useSectionReveal(root);
  const u = units[idx];

  return (
    <section ref={root} id="contato" aria-labelledby="contato-title" className="bg-fundo section-y">
      <div className="wrap">
        <SectionTitle eyebrow={contactSection.eyebrow} title={contactSection.title} subtitle={contactSection.subtitle} id="contato-title" />

        {/* Seletor de unidades: só aparece com 2+ unidades configuradas */}
        {units.length > 1 && (
          <div role="tablist" aria-label="Unidades" className="mt-8 inline-flex gap-1 rounded-full border border-linha bg-superficie p-1">
            {units.map((x, k) => (
              <button key={x.id} type="button" role="tab" aria-selected={k === idx} onClick={() => setIdx(k)}
                className="min-h-[42px] rounded-full px-4 font-display text-sm font-semibold" style={{ background: k === idx ? 'var(--c-amarelo)' : 'transparent' }}>
                {x.name}
              </button>
            ))}
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <article className="card flex flex-col gap-6 !p-7 lg:col-span-5" data-reveal>
            <header className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-[12rem] flex-1">
                <h3>{u.name}</h3>
                <p className="text-sm text-suave">{u.description}</p>
              </div>
              {u.demo && <span className="chip chip-demo flex-none">Dados demonstrativos</span>}
            </header>

            <dl className="flex flex-col gap-5 text-[0.95rem]">
              <div className="flex gap-3">
                <MapPin size={20} className="mt-0.5 flex-none text-laranja-texto" aria-hidden="true" />
                <div><dt className="sr-only-focusable">Endereço</dt><dd className="m-0">{u.street}<br />{u.district} · {u.city} – {u.state}</dd></div>
              </div>
              <div className="flex gap-3">
                <Clock size={20} className="mt-0.5 flex-none text-laranja-texto" aria-hidden="true" />
                <div className="flex-1">
                  <dt className="mb-1 font-display text-sm font-semibold">Horário de funcionamento</dt>
                  <dd className="m-0">
                    <ul className="flex flex-col" role="list">
                      {u.hours.map((h) => (
                        <li key={h.days} className="flex justify-between gap-4 border-b border-linha py-1.5 last:border-0">
                          <span className="text-suave">{h.days}</span><span className="font-semibold">{h.time}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <MessageCircle size={20} className="mt-0.5 flex-none text-laranja-texto" aria-hidden="true" />
                <div><dt className="font-display text-sm font-semibold">WhatsApp</dt><dd className="m-0">{contact.whatsappDisplay} <span className="text-suave">(demonstrativo)</span></dd></div>
              </div>
              <div className="flex gap-3">
                <Instagram size={20} className="mt-0.5 flex-none text-laranja-texto" aria-hidden="true" />
                <div><dt className="font-display text-sm font-semibold">Instagram</dt><dd className="m-0">{contact.instagramHandle} <span className="text-suave">(exemplo)</span></dd></div>
              </div>
            </dl>

            <div className="mt-auto flex flex-col gap-3 sm:flex-row">
              {u.mapsUrl ? (
                <a href={u.mapsUrl} target="_blank" rel="noopener" className="btn btn-secondary"><Navigation size={17} aria-hidden="true" /> {contactSection.directions}</a>
              ) : (
                <button type="button" className="btn btn-secondary" aria-disabled="true" title="Disponível quando o endereço real for configurado" onClick={(e) => e.preventDefault()}>
                  <Navigation size={17} aria-hidden="true" /> {contactSection.directions}
                </button>
              )}
              <button type="button" className="btn btn-primary" onClick={() => open()}><CalendarHeart size={18} aria-hidden="true" /> {contactSection.cta}</button>
            </div>
          </article>

          <div className="lg:col-span-7" data-reveal>
            {u.mapEmbedUrl ? (
              <iframe title={`Mapa: ${u.name}`} src={u.mapEmbedUrl} loading="lazy" className="h-full min-h-[320px] w-full rounded-[24px] border border-linha" referrerPolicy="no-referrer-when-downgrade" />
            ) : (
              <MapPlaceholder notice={contactSection.demoNotice} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
