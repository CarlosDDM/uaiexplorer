import { Fragment } from 'react';
import { Badge } from '@/components/Badge';
import { GenericSection } from '@/components/GenericSection';
import { LinkButton } from '@/components/Link';
import {
  serviceDetails,
  type ServiceDetail,
  type ServiceFeature,
} from '@/utils/constants/service-details-constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Detalhes dos serviços',
};

function ServiceFeatureCard({ title, content }: ServiceFeature) {
  return (
    <li className='flex flex-col gap-2 rounded-xl border border-solid border-border-card bg-background-card/60 p-5 backdrop-blur-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-border-card-hover hover:shadow-lg hover:shadow-shadow-card-hover'>
      <h3 className='font-semibold text-indigo-50'>{title}</h3>
      <p className='text-sm leading-relaxed text-indigo-300'>{content}</p>
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
  return (
    <GenericSection
      id={id}
      className='scroll-mt-24'
      title={title}
      content={
        <div className='mt-3 flex flex-col gap-4'>
          <p className='max-w-3xl text-lg leading-relaxed text-indigo-200'>
            {subtitle}
          </p>
          <p className='max-w-3xl leading-relaxed text-indigo-300'>
            {description}
          </p>
        </div>
      }
    >
      <ul className='mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {features.map(feature => (
          <ServiceFeatureCard key={feature.title} {...feature} />
        ))}
      </ul>
    </GenericSection>
  );
}

function ServicesInfoCta() {
  return (
    <div className='mt-20 flex flex-col items-center gap-4 rounded-2xl border border-solid border-border-card bg-background-card/40 p-8 text-center backdrop-blur-sm'>
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

export default function InfoPage() {
  return (
    <main className='mx-auto min-h-svh w-full max-w-6xl px-4 pt-32 pb-20'>
      <GenericSection
        className='mx-auto max-w-3xl text-center'
        eyebrow={<Badge>Detalhes dos serviços</Badge>}
        title='Entenda o que cada serviço faz por você'
        titleAs='h1'
        content={
          <p className='mt-4 text-indigo-300'>
            Um mergulho em como Desenvolvimento, Web Design e SEO se conectam
            para transformar sua presença digital.
          </p>
        }
      />

      <div className='mt-16 flex flex-col gap-16'>
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
