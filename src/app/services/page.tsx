import { CardServices } from '@/components/CardServices';
import { Container } from '@/components/Container';
import { GenericSection } from '@/components/GenericSection';
import { LinkButton } from '@/components/Link';
import { servicesCards } from '@/utils/constants/services-constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Serviços',
};

export default function ServicesPage() {
  return (
    <Container>
      <div className='mt-20 min-h-dvh'>
        <GenericSection
          className='text-center'
          title='Transforme seus negócios com nossos serviços'
          titleAs='h1'
          content={
            <div className='flex flex-col items-center gap-4 mb-12'>
              <p className='text-indigo-300 max-w-xl'>
                Soluções digitais sob medida para escalar seus resultados e
                otimizar sua operação.
              </p>
              <LinkButton href='/contact'>Converse com a gente</LinkButton>
            </div>
          }
        >
          <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {servicesCards.map(card => (
              <li key={`${card.title}`}>
                <CardServices {...card} />
              </li>
            ))}
          </ul>
        </GenericSection>
      </div>
    </Container>
  );
}
