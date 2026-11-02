import type { BookingService } from '@/data/site';
import { contact } from '@/data/site';

export interface BookingData {
  tutor: string;
  pet: string;
  animal: string;
  service: BookingService | '';
  date: string;
  time: string;
  phone: string;
  notes: string;
}

export const emptyBooking: BookingData = { tutor: '', pet: '', animal: '', service: '', date: '', time: '', phone: '', notes: '' };

export type BookingErrors = Partial<Record<keyof BookingData, string>>;

export function validateBooking(d: BookingData): BookingErrors {
  const e: BookingErrors = {};
  if (d.tutor.trim().length < 2) e.tutor = 'Informe o nome do responsável.';
  if (d.pet.trim().length < 1) e.pet = 'Informe o nome do pet.';
  if (!d.animal) e.animal = 'Selecione o tipo de animal.';
  if (!d.service) e.service = 'Selecione o serviço desejado.';
  if (d.phone.replace(/\D/g, '').length < 10) e.phone = 'Informe um telefone com DDD.';
  return e;
}

/** Máscara simples (00) 00000-0000 */
export function maskPhone(v: string): string {
  const n = v.replace(/\D/g, '').slice(0, 11);
  if (n.length <= 2) return n.length ? `(${n}` : '';
  if (n.length <= 6) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
  if (n.length <= 10) return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
  return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
}

/**
 * PONTO DE INTEGRAÇÃO
 * Hoje: simulação local — nada é enviado nem armazenado.
 * Futuro: trocar o corpo por uma chamada à API do sistema de agendamento
 * ou abrir o WhatsApp Business com `buildWhatsAppLink`.
 */
export async function submitBooking(_data: BookingData): Promise<{ ok: true; demo: true }> {
  await new Promise((r) => setTimeout(r, 700));
  return { ok: true, demo: true };
}

/** Pronto para uso quando houver número real em `contact.whatsappNumber`. */
export function buildWhatsAppLink(d: BookingData): string | null {
  if (!contact.whatsappNumber) return null; // demo: sem link funcional
  const msg = [
    `Olá! Gostaria de agendar: ${d.service}`,
    `Responsável: ${d.tutor}`,
    `Pet: ${d.pet} (${d.animal})`,
    d.date && `Data preferencial: ${d.date}${d.time ? ' às ' + d.time : ''}`,
    d.notes && `Observações: ${d.notes}`,
  ].filter(Boolean).join('\n');
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}
