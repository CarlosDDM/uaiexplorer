import { AboutValues } from '@/components/AboutValues';
import { GenericSection } from '@/components/GenericSection';
import { LinkButton } from '@/components/Link';
import { TechStack } from '@/components/TechStack';
import {
  ABOUT_INTRO,
  ABOUT_MANIFESTO,
  ABOUT_TITLE,
} from '@/utils/constants/about-constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre nós',
  description:
    'Conheça a UAIExplorer: nossos valores, nossa abordagem técnica e as tecnologias modernas que usamos para construir sites e sistemas sob medida.',
  alternates: {
    canonical: '/about',
  },
};

function AboutCta() {
  return (
    <div className='flex w-full flex-col items-center gap-4 rounded-2xl border border-solid border-border-card bg-background-card/40 p-8 text-center backdrop-blur-sm md:p-12'>
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
      <div className='mx-auto flex w-full max-w-5xl flex-col gap-24'>
        <GenericSection
          className='text-center'
          title={ABOUT_TITLE}
          titleAs='h1'
          content={
            <p className='mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-indigo-200'>
              {ABOUT_INTRO}
            </p>
          }
        />
        <AboutValues layout='columns' headingAs='h2' />
        {/* Manifesto: único momento de destaque tipográfico da página */}
        <blockquote className='mx-auto w-full max-w-3xl border-l-2 border-button-default pl-6 text-left font-display text-2xl leading-snug text-balance text-indigo-50 md:text-3xl'>
          {ABOUT_MANIFESTO}
        </blockquote>
        <TechStack />
        <AboutCta />
      </div>
    </main>
  );
}
