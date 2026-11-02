import { useRef } from 'react';
import { Info } from 'lucide-react';
import { team } from '@/data/site';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { SectionTitle } from './ui/SectionTitle';

const tint = { marrom: '#F7EBDD', amarelo: '#FFF1C4', laranja: '#FFE7D4' };
const shirt = { marrom: '#30251F', amarelo: '#F4B900', laranja: '#FF893B' };

/** Ilustração genérica de perfil (placeholder) — substituir por foto real da equipe */
function Avatar({ tone, variant }: { tone: keyof typeof tint; variant: number }) {
  const hair = ['#3A2E2A', '#6B6460', '#7A5236'][variant];
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full" role="img" aria-label="Ilustração de perfil (placeholder)">
      <rect width="200" height="160" fill={tint[tone]} />
      <circle cx="100" cy="196" r="78" fill={shirt[tone]} />
      <circle cx="100" cy="80" r="34" fill="#EAC9A8" />
      <path d={['M66 80c0-26 15-42 34-42s34 16 34 42c-7-12-18-19-34-19s-27 7-34 19z', 'M68 72c4-22 17-34 32-34s28 12 32 34c-12-8-22-10-32-10s-20 2-32 10z', 'M66 88c-3-31 13-50 34-50s37 19 34 50c-4-17-17-26-34-26s-30 9-34 26z'][variant]} fill={hair} />
      <g fill="#30251F"><circle cx="88" cy="84" r="3" /><circle cx="112" cy="84" r="3" /></g>
      <path d="M92 96c5 4 11 4 16 0" stroke="#30251F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Team() {
  const root = useRef<HTMLElement>(null);
  useSectionReveal(root);
  return (
    <section ref={root} id="equipe" aria-labelledby="equipe-title" className="bg-superficie section-y">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle eyebrow={team.eyebrow} title={team.title} id="equipe-title" className="max-w-[36rem]" />
          <p className="flex max-w-sm items-start gap-2 text-sm text-suave" data-reveal><Info size={16} className="mt-1 flex-none" aria-hidden="true" /> {team.notice}</p>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {team.members.map((m, i) => (
            <li key={m.name} data-reveal className={i === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}>
              <article className="group h-full overflow-hidden rounded-[28px] border border-linha bg-superficie shadow-soft transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[16/10] lg:aspect-[5/4]">
                  <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]"><Avatar tone={m.tone} variant={i} /></div>
                  <span className="chip chip-demo absolute left-4 top-4">Perfil ilustrativo</span>
                </div>
                <div className="flex flex-col gap-1.5 p-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-marrom">{m.role}</span>
                  <h3>{m.name}</h3>
                  <p className="text-suave">{m.text}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
