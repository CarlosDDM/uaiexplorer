import { Hero } from '@/components/landing/Hero';
import { UniverseAnimation } from '@/components/UniverseAnimation';
import { Services } from '@/components/landing/Services';
import { Container } from '@/components/Container';
import { Contact } from '@/components/landing/Contact';
import { About } from '@/components/landing/About';

export default function HomePage() {
  return (
    <main className='select-none'>
      <Container className='flex flex-col'>
        <Hero />
        <UniverseAnimation>
          <About />
        </UniverseAnimation>
        <Services />
        <Contact />
      </Container>
    </main>
  );
}
