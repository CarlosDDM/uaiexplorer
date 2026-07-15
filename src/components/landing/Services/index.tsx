import { Badge } from '@/components/Badge';
import { CardServices } from '@/components/CardServices';
import { Carousel } from '@/components/Carousel';
import { GenericSection } from '@/components/GenericSection';
import { LinkButton } from '@/components/Link';
import { servicesCards } from '@/utils/constants/services-constants';

const SERVICES_DESCRIPTION =
  'Transformamos ideias em soluções digitais sob medida para o seu negócio. Descubra como nossa tecnologia pode escalar seus resultados e otimizar sua operação diária.';

function ServicesDescription() {
  return (
    <p className='mb-16 max-w-2xl md:text-lg/tight'>{SERVICES_DESCRIPTION}</p>
  );
}

function ServicesShowcase() {
  return (
    <Carousel>
      {servicesCards.map(card => (
        <CardServices key={card.title} {...card} />
      ))}
    </Carousel>
  );
}

function ServicesCta() {
  return (
    <LinkButton
      href='/services'
      variant='transparent'
      className='mt-10 w-fit'
      aria-label='Ver todos os serviços'
    >
      Ver todos os serviços
    </LinkButton>
  );
}

export function Services() {
  return (
    <div className='mx-auto flex min-h-150 max-w-6xl flex-col justify-center p-4'>
      <GenericSection
        className='min-w-0'
        eyebrow={<Badge>Nossos serviços</Badge>}
        title='O que podemos te oferecer'
        content={<ServicesDescription />}
      >
        <ServicesShowcase />
        <ServicesCta />
      </GenericSection>
    </div>
  );
}
