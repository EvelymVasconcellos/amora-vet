export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2" style={{ color: light ? '#fff' : 'var(--c-marrom)' }}>
      <svg viewBox="0 0 64 64" width={compact ? 34 : 38} height={compact ? 34 : 38} aria-hidden="true" focusable="false" style={{ flex: 'none' }}>
        <rect width="64" height="64" rx="19" fill="#F4B900" />
        <g fill="#30251F"><ellipse cx="32" cy="40" rx="11.5" ry="9.5" /><ellipse cx="17.5" cy="27.5" rx="4.6" ry="6" /><ellipse cx="26" cy="19" rx="4.6" ry="6" /><ellipse cx="38" cy="19" rx="4.6" ry="6" /><ellipse cx="46.5" cy="27.5" rx="4.6" ry="6" /></g>
        <path d="M32 45.5c-3.6-2.7-6.4-4.6-6.4-7.3a3.2 3.2 0 0 1 6.4-.9 3.2 3.2 0 0 1 6.4.9c0 2.7-2.8 4.6-6.4 7.3z" fill="#FF893B" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.25rem] font-extrabold" style={{ letterSpacing: '-0.04em' }}>
          Amora<span style={{ color: light ? '#F4B900' : 'inherit', opacity: light ? 1 : 0.85 }}> Vet</span>
        </span>
      </span>
    </span>
  );
}
