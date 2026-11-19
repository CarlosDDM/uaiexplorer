import clsx from 'clsx';
import { CardServices } from '@/components/CardServices';
import { Carousel } from '@/components/Carousel';
import { GenericSection } from '@/components/GenericSection';
import { LinkButton } from '@/components/Link';
import { servicesCards } from '@/utils/constants/services-constants';

const SERVICES_DESCRIPTION =
  'Transformamos ideias em soluções digitais sob medida para o seu negócio. Descubra como nossa tecnologia pode escalar seus resultados e otimizar sua operação diária.';

function ServicesDescription() {
  return (
    <p className='max-w-2xl leading-relaxed text-indigo-200 md:text-lg/relaxed'>
      {SERVICES_DESCRIPTION}
    </p>
  );
}

function ServicesShowcase() {
  return (
    // mobile: 1 card por vez com uma "espiada" no próximo; tablet: 2; desktop: os 3 lado a lado
    <Carousel slideClassName='basis-[88%] sm:basis-1/2 lg:basis-1/3'>
      {servicesCards.map(card => (
        <CardServices key={card.title} {...card} />
      ))}
    </Carousel>
  );
}

function ServicesCta({ className }: { className?: string }) {
  return (
    <LinkButton
      href='/services'
      variant='transparent'
      className={clsx('w-fit shrink-0', className)}
    >
      Ver todos os serviços
    </LinkButton>
  );
}

export function Services() {
  return (
    // mobile: título → cards → botão | desktop: título e botão na mesma linha, cards embaixo
    <div
      className={clsx(
        'mx-auto grid w-full max-w-6xl grid-cols-1 gap-y-10 px-4 py-16',
        'md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-x-10 md:py-24',
      )}
    >
      <GenericSection
        className='min-w-0'
        title='O que podemos te oferecer'
        content={<ServicesDescription />}
      />

      <ServicesCta className='order-last md:order-none md:mb-2' />

      <div className='min-w-0 md:col-span-2'>
        <ServicesShowcase />
      </div>
    </div>
  );
}
