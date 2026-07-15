import clsx from 'clsx';
import { Badge } from '@/components/Badge';
import { Container } from '@/components/Container';
import { FormContact } from '@/components/FormContact';
import { FormContactHeader } from '@/components/FormContactHeader';
import { GenericSection } from '@/components/GenericSection';

function ContactPitch() {
  return (
    <GenericSection
      eyebrow={<Badge>Contato</Badge>}
      title='Fale com a gente'
      content={
        <div className='mt-4 flex flex-col gap-4'>
          <p className='text-2xl font-semibold leading-snug text-indigo-50 md:text-3xl'>
            Transformamos ideias em produtos digitais que realmente funcionam.
          </p>
          <p className='max-w-prose text-indigo-300'>
            Construímos sistemas rápidos, escaláveis e pensados para resolver
            gargalos reais do seu negócio. Se você busca um parceiro técnico que
            entenda o que precisa ser construído — você está no lugar certo.
          </p>
          <strong className='text-indigo-100'>
            E aí, faz sentido conversar com a gente?
          </strong>
        </div>
      }
    />
  );
}

function ContactForm() {
  return (
    <div
      className={clsx(
        'mx-auto w-full max-w-xl rounded-2xl p-6 md:p-8',
        'border border-solid border-border-card',
        'bg-background-card/60 shadow-lg shadow-border-card backdrop-blur-sm',
      )}
    >
      <FormContactHeader />
      <FormContact />
    </div>
  );
}

export function Contact() {
  return (
    <Container>
      <div className='grid w-full max-w-6xl items-start gap-10 lg:grid-cols-2 lg:gap-16'>
        <ContactPitch />
        <ContactForm />
      </div>
    </Container>
  );
}
