import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { BookingService } from '@/data/site';

interface BookingCtx { isOpen: boolean; service: BookingService | ''; open: (service?: BookingService) => void; close: () => void; }

const Ctx = createContext<BookingCtx | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [service, setService] = useState<BookingService | ''>('');
  const open = useCallback((s?: BookingService) => { setService(s ?? ''); setOpen(true); }, []);
  const close = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ isOpen, service, open, close }), [isOpen, service, open, close]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBooking() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useBooking precisa estar dentro de <BookingProvider>');
  return c;
}
