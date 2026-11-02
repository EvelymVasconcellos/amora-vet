import { AlertCircle } from 'lucide-react';
import { brand, contact, nav, units } from '@/data/site';
import { Logo } from './ui/Logo';
import { Wave } from './decor/Decor';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
    {/* Onda do rodapé: a mesma curva do hero, espelhada, subindo em marrom sobre o bege do contato */}
    <div aria-hidden="true" className="bg-fundo" style={{ marginBottom: -1 }}><Wave to="var(--c-marrom)" flip /></div>
    <footer className="bg-texto pt-12 text-white" style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom, 0px))' }}>
      <div className="wrap grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-5">
          <Logo light />
          <p className="max-w-xs text-sm text-white/70">{brand.slogan}</p>
        </div>
        <nav aria-label="Rodapé" className="lg:col-span-3">
          <h2 className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.14em] text-amarelo">Navegação</h2>
          <ul className="grid grid-cols-2 gap-2 text-sm" role="list">
            {nav.map((n) => <li key={n.href}><a href={n.href} className="text-white/80 transition-colors hover:text-white">{n.label}</a></li>)}
          </ul>
        </nav>
        <div className="lg:col-span-4">
          <h2 className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.14em] text-amarelo">Informações</h2>
          <ul className="flex flex-col gap-2 text-sm text-white/80" role="list">
            <li>{units[0].street} · {units[0].city} – {units[0].state} <span className="text-white/50">(demonstrativo)</span></li>
            <li>WhatsApp {contact.whatsappDisplay} <span className="text-white/50">(demonstrativo)</span></li>
            <li>Instagram {contact.instagramHandle} <span className="text-white/50">(exemplo)</span></li>
            <li>{units[0].hours.filter((h) => h.time !== 'Fechado').map((h) => `${h.days}: ${h.time}`).join(' · ')}</li>
          </ul>
        </div>
      </div>
      <div className="wrap mt-12">
        <p role="note" className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 text-sm leading-relaxed text-white/80">
          <AlertCircle size={18} className="mt-0.5 flex-none text-laranja" aria-hidden="true" />
          <span><strong className="font-display text-white">Aviso:</strong> {brand.disclaimer}</span>
        </p>
        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:items-center">
          <span>© {year} {brand.name}. Projeto demonstrativo.</span>
          <a href={brand.credits.url} target="_blank" rel="noopener" className="transition-colors hover:text-white">{brand.credits.label}</a>
        </div>
      </div>
    </footer>
    </>
  );
}
