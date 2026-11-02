import { useRef } from 'react';
import { Instagram as IgIcon } from 'lucide-react';
import { contact, instagram } from '@/data/site';
import { useSectionReveal } from '@/hooks/useSectionReveal';

/**
 * Divulgação do perfil. Sem API, scraping ou métricas: o card é uma prévia
 * ilustrativa e os botões só viram link quando `contact.instagramUrl` existir.
 */
function FollowButton({ label, className }: { label: string; className: string }) {
  const url = contact.instagramUrl;
  if (url) return <a href={url} target="_blank" rel="noopener" className={className}>{label}</a>;
  return <button type="button" className={className} aria-disabled="true" aria-describedby="ig-demo-note" onClick={(e) => e.preventDefault()}>{label}</button>;
}

function Avatar({ size = 52 }: { size?: number }) {
  return (
    <span className="grid flex-none place-items-center rounded-full p-[3px]" style={{ width: size, height: size, background: 'var(--c-laranja)' }}>
      <span className="grid h-full w-full place-items-center rounded-full bg-superficie">
        <svg viewBox="0 0 64 64" width={size * 0.62} height={size * 0.62} aria-hidden="true"><rect width="64" height="64" rx="19" fill="#F4B900" /><g fill="#30251F"><ellipse cx="32" cy="40" rx="11.5" ry="9.5" /><ellipse cx="17.5" cy="27.5" rx="4.6" ry="6" /><ellipse cx="26" cy="19" rx="4.6" ry="6" /><ellipse cx="38" cy="19" rx="4.6" ry="6" /><ellipse cx="46.5" cy="27.5" rx="4.6" ry="6" /></g></svg>
      </span>
    </span>
  );
}

export function Instagram() {
  const root = useRef<HTMLElement>(null);
  useSectionReveal(root);
  return (
    <section ref={root} aria-labelledby="ig-title" className="bg-superficie section-y">
      <div className="wrap grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col items-start gap-5 lg:col-span-6">
          <span className="icon-tile icon-tile--laranja !h-12 !w-12 !rounded-2xl" data-reveal><IgIcon size={24} aria-hidden="true" /></span>
          <h2 id="ig-title" className="h2" data-reveal>{instagram.title}</h2>
          <p className="lead" data-reveal>{instagram.subtitle}</p>
          <div className="flex flex-col items-start gap-2" data-reveal>
            <FollowButton label={instagram.cta} className="btn btn-primary" />
            {!contact.instagramUrl && <p id="ig-demo-note" className="text-xs text-suave">{instagram.demoNote}</p>}
          </div>
        </div>

        <div className="lg:col-span-6" data-reveal>
          <article className="mx-auto w-full max-w-[480px] overflow-hidden rounded-[24px] border border-linha bg-superficie shadow-lift" aria-label="Prévia ilustrativa do perfil no Instagram">
            <header className="flex items-center gap-3 p-5">
              <Avatar />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-[0.95rem] font-semibold">{contact.instagramHandle}</p>
                <p className="text-sm text-suave">Amora Vet <span className="chip chip-demo ml-1 !py-0 !text-[0.6875rem]">Demo</span></p>
              </div>
              <FollowButton label={instagram.follow} className="btn btn-primary btn-sm flex-none" />
            </header>
            <ul className="grid grid-cols-3 gap-1 px-1" role="list">
              {instagram.posts.map((p) => (
                <li key={p.src} className="aspect-square overflow-hidden bg-neutro">
                  <img src={p.src} alt={p.alt} loading="lazy" decoding="async" width={600} height={600} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                </li>
              ))}
            </ul>
            <footer className="flex items-center justify-between gap-3 px-5 py-4 text-sm text-suave">
              <span>{instagram.footer}</span>
              <IgIcon size={18} aria-hidden="true" />
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}
