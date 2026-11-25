import clsx from 'clsx';
import Image from 'next/image';
import { HERO_BG_URL } from '@/utils/constants/image-constants';
import { Container } from '../../Container';
import { GenericSection } from '../../GenericSection';
import { LinkButton } from '../../Link';

const HERO_ACTIONS = [
  { href: '/contact', variant: 'default', label: 'Faça um orçamento' },
  // âncora na própria home: rola suavemente até a seção de serviços
  { href: '#servicos', variant: 'transparent', label: 'Veja nossos serviços' },
] as const;

function HeroBackground() {
  return (
    <div
      aria-hidden
      className={clsx(
        'pointer-events-none absolute top-0 -bottom-px left-1/2 -z-10 w-screen -translate-x-1/2',
        'overflow-hidden',
      )}
    >
      {/* imagem base */}
      <Image
        src={HERO_BG_URL}
        alt=''
        fill
        loading='eager'
        fetchPriority='high'
        sizes='100vw'
        className='object-cover object-center'
      />
      {/* tint azul por cima da imagem */}
      <div className='absolute inset-0 bg-[rgba(1,9,94,0.82)]' />
      {/* vinheta radial pra escurecer as bordas */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent,transparent_45%,rgba(0,3,24,0.7))]' />
      {/* fade suave na base para fundir sem linha seca com o fundo estelar abaixo */}
      <div className='absolute inset-x-0 bottom-0 h-36 bg-linear-to-b from-transparent via-space/65 to-space md:h-48' />
    </div>
  );
}

function HeroActions() {
  return (
    <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
      {HERO_ACTIONS.map(({ href, variant, label }) => (
        <LinkButton key={href} href={href} variant={variant}>
          {label}
        </LinkButton>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <Container>
      <div className='relative flex min-h-svh w-full flex-col items-center justify-center'>
        <HeroBackground />

        <GenericSection
          title='Sua presença digital com o impacto que sua marca merece.'
          content={
            <p className='mx-auto max-w-2xl pb-8 leading-relaxed text-indigo-200 md:text-xl'>
              Do pequeno negócio à grande empresa, temos a solução digital ideal
              para alavancar suas vendas. Criamos desde Landing Pages focadas em
              conversão até plataformas de E-commerce completas.
            </p>
          }
          titleAs='h1'
          className='mx-auto w-full max-w-150 text-center md:max-w-200'
        >
          <HeroActions />
        </GenericSection>
      </div>
    </Container>
  );
}
