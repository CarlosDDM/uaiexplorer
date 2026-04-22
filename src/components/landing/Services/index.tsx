import { CardServices } from '@/components/CardServices';
import { Carousel } from '@/components/Carousel';
import { GenericSection } from '@/components/GenericSection';
import { servicesCards } from '@/utils/constants/services-constants';

export function Services() {
  return (
    <div className='p-4 min-h-150 grid place-content-center mx-auto'>
      <GenericSection
        className='min-w-0'
        title='O que podemos te oferecer'
        content={
          <p className='mb-16 md:text-lg/tight'>
            Transformamos ideias em soluções digitais sob medida para o seu
            negócio. Descubra como nossa tecnologia pode escalar seus resultados
            e otimizar sua operação diária.
          </p>
        }
      >
        <Carousel>
          {servicesCards.map(card => (
            <div key={`${card.title}`} className='flex-none'>
              <CardServices {...card} />
            </div>
          ))}
        </Carousel>
      </GenericSection>
    </div>
  );
}
