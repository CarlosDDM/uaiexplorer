import { About } from '@/components/landing/About';
import { LinkButton } from '@/components/Link';
import { TechStack } from '@/components/TechStack';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre nós',
};

function AboutCta() {
  return (
    <div className='flex flex-col items-center gap-4 rounded-2xl border border-solid border-border-card bg-background-card/40 p-8 text-center backdrop-blur-sm md:p-12'>
      <h2 className='text-xl font-semibold text-indigo-50 md:text-2xl'>
        Vamos conversar sobre o seu projeto?
      </h2>
      <p className='max-w-xl text-indigo-300'>
        Conta o que você precisa e a gente responde em até 24h.
      </p>
      <LinkButton href='/contact'>Fale com a gente</LinkButton>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className='mx-auto min-h-svh w-full max-w-6xl px-4 pt-32 pb-20'>
      <div className='flex flex-col gap-24'>
        <About titleAs='h1' />
        <TechStack />
        <AboutCta />
      </div>
    </main>
  );
}
