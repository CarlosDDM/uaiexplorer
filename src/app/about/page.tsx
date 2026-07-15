import { Container } from '@/components/Container';
import { About } from '@/components/landing/About';
import { TechStack } from '@/components/TechStack';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre-nós',
};

export default function AboutPage() {
  return (
    <Container as='main'>
      <div className='min-h-dvh flex flex-col justify-center items-center mt-20'>
        <About />
        <div className='my-8'>
          <TechStack />
        </div>
      </div>
    </Container>
  );
}
