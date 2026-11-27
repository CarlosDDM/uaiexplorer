import { CardServices } from '@/components/CardServices';
import { GenericSection } from '@/components/GenericSection';
import { LinkButton } from '@/components/Link';
import { servicesCards } from '@/utils/constants/services-constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Serviços',
  description:
    'Desenvolvimento web personalizado, Web Design focado em conversão e SEO técnico para escalar sua presença digital.',
  alternates: {
    canonical: '/services',
  },
};

function ServicesHeader() {
  return (
    <GenericSection
      className='mx-auto max-w-3xl text-center'
      title='Transforme seus negócios com nossos serviços'
      titleAs='h1'
      content={
        <div className='mt-4 flex flex-col items-center gap-6'>
          <p className='text-indigo-300'>
            Soluções digitais sob medida para escalar seus resultados e otimizar
            sua operação.
          </p>
          <LinkButton href='/contact'>Converse com a gente</LinkButton>
        </div>
      }
    />
  );
}

function ServicesGrid() {
  return (
    <ul className='mx-auto mt-16 grid max-w-md grid-cols-1 gap-6 md:max-w-none md:grid-cols-2 lg:grid-cols-3'>
      {servicesCards.map(card => (
        <li key={card.title} className='flex'>
          <CardServices {...card} />
        </li>
      ))}
    </ul>
  );
}

export default function ServicesPage() {
  return (
    <main className='mx-auto min-h-svh w-full max-w-6xl px-4 pt-32 pb-20'>
      <ServicesHeader />
      <ServicesGrid />
    </main>
  );
}
