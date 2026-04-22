import { Container } from '@/components/Container';
import { FormContact } from '@/components/FormContact';
import { FormContactHeader } from '@/components/FormContactHeader';
import { GenericSection } from '@/components/GenericSection';

export function Contact() {
  return (
    <Container>
      <GenericSection
        title='Fale com a gente'
        content={
          <div className='flex flex-col gap-4'>
            <p className='text-2xl md:text-3xl font-semibold text-indigo-50 leading-snug'>
              Transformamos ideias em produtos digitais que realmente funcionam.
            </p>
            <p className='max-w-prose text-indigo-300'>
              Construímos sistemas rápidos, escaláveis e pensados para resolver
              gargalos reais do seu negócio. Se você busca um parceiro técnico
              que entenda o que precisa ser construído — você está no lugar
              certo.
            </p>
            <strong className='text-indigo-100'>
              E aí, faz sentido conversar com a gente?
            </strong>
          </div>
        }
      >
        <FormContactHeader />
        <FormContact />
      </GenericSection>
    </Container>
  );
}
