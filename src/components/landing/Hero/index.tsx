import clsx from 'clsx';
import { Container } from '../../Container';
import { GenericSection } from '../../GenericSection';
import { LinkButton } from '../../Link';
import Image from 'next/image';

export function Hero() {
  return (
    <Container>
      <GenericSection
        title='Sua presença digital com o impacto que sua marca merece.'
        content={
          <p className='pb-8 md:text-2xl'>
            Do pequeno negócio à grande empresa, temos a solução digital ideal
            para alavancar suas vendas. Criamos desde Landing Pages focadas em
            conversão até plataformas de E-commerce completas.
          </p>
        }
        titleAs='h1'
        className={clsx(
          'min-h-dvh flex flex-col items-center justify-center',
          'text-center max-w-150 md:max-w-200 mx-auto',
        )}
      >
        <div className='absolute inset-0 -z-10'>
          <Image
            src='/hero-bg.webp'
            alt='teia com pontos referenciando roteamento feito pelo roteadores'
            fill
            className='object-cover opacity-20'
          />
        </div>

        <div className='flex gap-4 items-center justify-center'>
          <LinkButton href='/contact' variant='default'>
            Faça um orçamento
          </LinkButton>
          <LinkButton href='/services' variant='transparent'>
            Veja nossos serviços
          </LinkButton>
        </div>
      </GenericSection>
    </Container>
  );
}
