import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { CalendarCheck2, Loader2, PartyPopper, ShieldCheck, X } from 'lucide-react';
import { booking, bookingServices } from '@/data/site';
import { useBooking } from '@/hooks/useBooking';
import { emptyBooking, maskPhone, submitBooking, validateBooking, type BookingData, type BookingErrors } from '@/utils/booking';

/**
 * Modal de agendamento DEMONSTRATIVO.
 * Usa <dialog> nativo (foco preso, Esc, fundo inerte) e devolve o foco ao fechar.
 * Os dados vivem apenas na memória do componente e são descartados ao fechar.
 */
export default function BookingModal() {
  const { isOpen, service, close } = useBooking();
  const dlg = useRef<HTMLDialogElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const [data, setData] = useState<BookingData>(emptyBooking);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');

  const today = new Date();
  const minDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  useEffect(() => {
    const d = dlg.current; if (!d) return;
    if (isOpen && !d.open) {
      lastFocus.current = document.activeElement as HTMLElement;
      setData({ ...emptyBooking, service });
      setErrors({}); setStatus('idle');
      d.showModal();
      document.documentElement.style.overflow = 'hidden';
      requestAnimationFrame(() => d.querySelector<HTMLInputElement>('#bk-tutor')?.focus());
    } else if (!isOpen && d.open) {
      d.close();
    }
  }, [isOpen, service]);

  const onClose = () => {
    document.documentElement.style.overflow = '';
    setData(emptyBooking); // descarta dados pessoais
    close();
    lastFocus.current?.focus?.();
  };

  const set = (k: keyof BookingData) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const v = k === 'phone' ? maskPhone(e.target.value) : e.target.value;
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const er = validateBooking(data);
    setErrors(er);
    const first = Object.keys(er)[0];
    if (first) { dlg.current?.querySelector<HTMLElement>(`#bk-${first}`)?.focus(); return; }
    setStatus('sending');
    await submitBooking(data);
    setStatus('done');
    setData(emptyBooking);
    requestAnimationFrame(() => dlg.current?.querySelector<HTMLElement>('#bk-done')?.focus());
  };

  const err = (k: keyof BookingData) => errors[k] ? { 'aria-invalid': true as const, 'aria-describedby': `bk-${k}-err` } : {};
  const Msg = ({ k }: { k: keyof BookingData }) => errors[k] ? <span id={`bk-${k}-err`} className="field-error">{errors[k]}</span> : null;

  return (
    <dialog ref={dlg} className="booking" aria-labelledby="bk-title" onClose={onClose}
      onClick={(e) => { if (e.target === dlg.current) dlg.current?.close(); }}>
      <div className="booking__panel">
        <div className="flex items-start justify-between gap-4 border-b border-linha px-6 pb-5 pt-6 sm:px-8">
          <div className="flex flex-col gap-1">
            <h2 id="bk-title" className="text-2xl font-bold">{booking.title}</h2>
            <p className="text-sm text-suave">{booking.intro}</p>
          </div>
          <button type="button" className="btn btn-secondary btn-icon flex-none" onClick={() => dlg.current?.close()} aria-label="Fechar agendamento"><X size={20} aria-hidden="true" /></button>
        </div>

        {status === 'done' ? (
          <div className="flex flex-col items-center gap-4 px-6 py-12 text-center sm:px-10" role="status">
            <span className="icon-tile icon-tile--amarelo !h-16 !w-16 !rounded-2xl"><PartyPopper size={30} aria-hidden="true" /></span>
            <h3 id="bk-done" tabIndex={-1} className="text-2xl font-bold">{booking.successTitle}</h3>
            <p className="max-w-sm text-suave">{booking.successText}</p>
            <button type="button" className="btn btn-primary mt-2" onClick={() => dlg.current?.close()}>Fechar</button>
          </div>
        ) : (
          <form className="grid grid-cols-1 gap-4 px-6 py-6 sm:grid-cols-2 sm:px-8" onSubmit={onSubmit} noValidate>
            <p className="flex items-center gap-2 rounded-xl bg-bege px-3 py-2 text-xs font-semibold text-marrom sm:col-span-2"><ShieldCheck size={16} aria-hidden="true" /> {booking.demoNotice}</p>
            <div className="field">
              <label htmlFor="bk-tutor">Nome do responsável *</label>
              <input id="bk-tutor" className="input" autoComplete="name" value={data.tutor} onChange={set('tutor')} required {...err('tutor')} />
              <Msg k="tutor" />
            </div>
            <div className="field">
              <label htmlFor="bk-pet">Nome do pet *</label>
              <input id="bk-pet" className="input" autoComplete="off" value={data.pet} onChange={set('pet')} required {...err('pet')} />
              <Msg k="pet" />
            </div>
            <div className="field">
              <label htmlFor="bk-animal">Tipo de animal *</label>
              <select id="bk-animal" className="input" value={data.animal} onChange={set('animal')} required {...err('animal')}>
                <option value="">Selecione…</option>
                {booking.animalTypes.map((a) => <option key={a}>{a}</option>)}
              </select>
              <Msg k="animal" />
            </div>
            <div className="field">
              <label htmlFor="bk-service">Serviço desejado *</label>
              <select id="bk-service" className="input" value={data.service} onChange={set('service')} required {...err('service')}>
                <option value="">Selecione…</option>
                {bookingServices.map((s) => <option key={s}>{s}</option>)}
              </select>
              <Msg k="service" />
            </div>
            <div className="field">
              <label htmlFor="bk-date">Data preferencial</label>
              <input id="bk-date" type="date" className="input" min={minDate} value={data.date} onChange={set('date')} />
            </div>
            <div className="field">
              <label htmlFor="bk-time">Horário preferencial</label>
              <select id="bk-time" className="input" value={data.time} onChange={set('time')}>
                <option value="">Sem preferência</option>
                {booking.times.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="field sm:col-span-2">
              <label htmlFor="bk-phone">Telefone *</label>
              <input id="bk-phone" type="tel" inputMode="tel" className="input" autoComplete="tel" placeholder="(00) 00000-0000" value={data.phone} onChange={set('phone')} required {...err('phone')} />
              <Msg k="phone" />
            </div>
            <div className="field sm:col-span-2">
              <label htmlFor="bk-notes">Observações</label>
              <textarea id="bk-notes" className="input min-h-[96px] resize-y" value={data.notes} onChange={set('notes')} />
            </div>
            <div className="flex flex-col-reverse gap-3 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs text-suave">* campos obrigatórios</span>
              <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                {status === 'sending' ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <CalendarCheck2 size={18} aria-hidden="true" />}
                {status === 'sending' ? 'Enviando simulação…' : 'Solicitar agendamento'}
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
