import type { ReactNode } from 'react';

interface Props { eyebrow?: string; title: ReactNode; subtitle?: ReactNode; align?: 'left' | 'center'; id?: string; className?: string; }

/** Título de seção padrão (eyebrow + h2 + subtítulo). `data-reveal` é animado pelas seções. */
export function SectionTitle({ eyebrow, title, subtitle, align = 'left', id, className = '' }: Props) {
  const center = align === 'center';
  return (
    <header className={`flex flex-col gap-4 ${center ? 'mx-auto items-center text-center' : ''} ${className}`} style={{ maxWidth: center ? '42rem' : undefined }}>
      {eyebrow && <span className="eyebrow" data-reveal>{eyebrow}</span>}
      <h2 id={id} className="h2" data-reveal>{title}</h2>
      {subtitle && <p className={`lead ${center ? 'mx-auto' : ''}`} data-reveal>{subtitle}</p>}
    </header>
  );
}
