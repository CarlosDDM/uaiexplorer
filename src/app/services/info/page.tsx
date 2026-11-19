import { Fragment } from 'react';
import clsx from 'clsx';
import { IoCheckmark } from 'react-icons/io5';
import { GenericSection } from '@/components/GenericSection';
import { LinkButton } from '@/components/Link';
import { ServiceInfoNav } from '@/components/ServiceInfoNav';
import {
  serviceDetails,
  type ServiceDetail,
  type ServiceFeature,
} from '@/utils/constants/service-details-constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Detalhes dos serviços',
};

function ServiceFeatureItem({ title, content }: ServiceFeature) {
  return (
    <li
      className={clsx(
        'group flex gap-4 rounded-xl p-5',
        'border border-solid border-border-card bg-background-card/60 backdrop-blur-sm',
        'transition duration-300 ease-out',
        'hover:border-border-card-hover hover:shadow-lg hover:shadow-shadow-card-hover',
      )}
    >
      <span
        aria-hidden
        className={clsx(
          'mt-0.5 grid h-8 w-8 shrink-0 place-content-center rounded-full',
          'border border-solid border-border-card bg-button-default/10 text-button-default',
          'transition duration-300 group-hover:border-border-card-hover group-hover:bg-button-default/20',
          '[&>svg]:h-4 [&>svg]:w-4',
        )}
      >
        <IoCheckmark />
      </span>

      <div className='flex flex-col gap-1.5'>
        <h3 className='font-semibold text-indigo-50'>{title}</h3>
        <p className='text-sm leading-relaxed text-indigo-300'>{content}</p>
      </div>
    </li>
  );
}

function ServiceInfoBlock({
  id,
  title,
  subtitle,
  description,
  features,
}: ServiceDetail) {
  const headingId = `${id}-titulo`;

  return (
    // scroll-mt desconta o header fixo + o menu de abas ao pular para a âncora
    <section
      id={id}
      aria-labelledby={headingId}
      className='grid scroll-mt-40 grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12'
    >
      {/* coluna de texto: fica presa no topo enquanto a lista rola (desktop) */}
      <div className='flex flex-col gap-4 lg:sticky lg:top-40 lg:col-span-5 lg:self-start'>
        <h2
          id={headingId}
          className='text-2xl leading-tight font-bold tracking-tight text-balance text-indigo-50 md:text-4xl'
        >
          {title}
        </h2>
        <p className='text-lg leading-relaxed text-indigo-200'>{subtitle}</p>
        <p className='leading-relaxed text-indigo-300'>{description}</p>
      </div>

      <ul className='flex flex-col gap-4 lg:col-span-7'>
        {features.map(feature => (
          <ServiceFeatureItem key={feature.title} {...feature} />
        ))}
      </ul>
    </section>
  );
}

function ServicesInfoCta() {
  return (
    <div className='mt-24 flex flex-col items-center gap-4 rounded-2xl border border-solid border-border-card bg-background-card/40 p-8 text-center backdrop-blur-sm md:p-12'>
      <h2 className='text-xl font-semibold text-indigo-50 md:text-2xl'>
        Pronto pra tirar sua ideia do papel?
      </h2>
      <p className='max-w-xl text-indigo-300'>
        Conta o que você precisa e a gente desenha a solução ideal pro seu
        momento.
      </p>
      <LinkButton href='/contact'>Fale com a gente</LinkButton>
    </div>
  );
}

const navItems = serviceDetails.map(({ id, title }) => ({ id, title }));

export default function InfoPage() {
  return (
    <main className='mx-auto min-h-svh w-full max-w-6xl px-4 pt-32 pb-20'>
      <GenericSection
        className='mx-auto max-w-3xl text-center'
        title='Entenda o que cada serviço faz por você'
        titleAs='h1'
        content={
          <p className='mt-4 text-indigo-300'>
            Um mergulho em como Desenvolvimento, Web Design e SEO se conectam
            para transformar sua presença digital.
          </p>
        }
      />

      <ServiceInfoNav items={navItems} />

      <div className='mt-12 flex flex-col gap-16 md:mt-16 md:gap-24'>
        {serviceDetails.map((detail, index) => (
          <Fragment key={detail.id}>
            {index > 0 && (
              <hr className='h-px w-full border-0 bg-gradient-to-r from-transparent via-border-card to-transparent' />
            )}
            <ServiceInfoBlock {...detail} />
          </Fragment>
        ))}
      </div>

      <ServicesInfoCta />
    </main>
  );
}
