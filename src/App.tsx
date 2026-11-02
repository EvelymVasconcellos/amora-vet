import { lazy, Suspense, useEffect, useState } from 'react';
import { BookingProvider, useBooking } from '@/hooks/useBooking';
import { ScrollTrigger } from '@/utils/gsap';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Space } from '@/components/Space';
import { Services } from '@/components/Services';
import { Grooming } from '@/components/Grooming';
import { Team } from '@/components/Team';
import { Testimonials } from '@/components/Testimonials';
import { Instagram } from '@/components/Instagram';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { StickyCTA } from '@/components/StickyCTA';

// Code splitting: o modal só é baixado na primeira abertura
const BookingModal = lazy(() => import('@/components/BookingModal'));

function ModalGate() {
  const { isOpen } = useBooking();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { if (isOpen) setLoaded(true); }, [isOpen]);
  return loaded ? <Suspense fallback={null}><BookingModal /></Suspense> : null;
}

export default function App() {
  useEffect(() => {
    // Recalcula posições após fontes e imagens (evita gatilhos desalinhados)
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  return (
    <BookingProvider>
      <Header />
      <main>
        <Hero />
        <Space />
        <About />
        <Services />
        <Grooming />
        <Team />
        <Testimonials />
        <Instagram />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <StickyCTA />
      <ModalGate />
    </BookingProvider>
  );
}
