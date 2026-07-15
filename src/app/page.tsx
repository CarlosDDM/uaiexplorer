import { Hero } from '@/components/landing/Hero';
import { UniverseAnimation } from '@/components/UniverseAnimation';
import { Services } from '@/components/landing/Services';
import { Contact } from '@/components/landing/Contact';
import { About } from '@/components/landing/About';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  description:
    'Criamos landing pages, e-commerces e plataformas web sob medida — do pequeno negócio à grande empresa. Soluções digitais rápidas, escaláveis e focadas em conversão.',
};

export default function HomePage() {
  return (
    <main className='select-none flex flex-col items-center'>
      <section id='inicio' className='w-full scroll-mt-24'>
        <Hero />
      </section>

      <section id='sobre' className='w-full scroll-mt-24'>
        <UniverseAnimation>
          <About />
        </UniverseAnimation>
      </section>

      <section id='servicos' className='w-full scroll-mt-24'>
        <Services />
      </section>

      <hr className='mx-auto my-6 h-px w-full max-w-6xl border-0 bg-gradient-to-r from-transparent via-border-card to-transparent md:my-10' />

      <section id='contato' className='w-full scroll-mt-24 pb-8'>
        <Contact />
      </section>
    </main>
  );
}
