import clsx from 'clsx';
import { Container } from '../../Container';
import { GenericSection } from '../../GenericSection';
import { LinkButton } from '../../Link';

const HERO_ACTIONS = [
  { href: '/contact', variant: 'default', label: 'Faça um orçamento' },
  { href: '/services', variant: 'transparent', label: 'Veja nossos serviços' },
] as const;

function HeroBackground() {
  return (
    <div
      aria-hidden
      className={clsx(
        'pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2',
        'overflow-hidden',
      )}
    >
      {/* imagem base */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat [background-image:url('/hero-bg.webp')]" />
      {/* tint azul por cima da imagem */}
      <div className='absolute inset-0 bg-[rgba(1,9,94,0.82)]' />
      {/* vinheta radial pra escurecer as bordas */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent,transparent_45%,rgba(0,3,24,0.7))]' />
    </div>
  );
}

function HeroBadge() {
  return (
    <span
      className={clsx(
        'mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm',
        'border border-border-card bg-background-card/60 text-indigo-200 backdrop-blur-sm',
      )}
    >
      <span className='relative flex h-2 w-2'>
        <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-button-default opacity-75' />
        <span className='relative inline-flex h-2 w-2 rounded-full bg-button-default' />
      </span>
      Desenvolvimento web sob medida
    </span>
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
      <div className='relative flex min-h-dvh w-full flex-col items-center justify-center'>
        <HeroBackground />

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
          className='mx-auto w-full max-w-150 text-center md:max-w-200'
        >
          <HeroBadge />
          <HeroActions />
        </GenericSection>
      </div>
    </Container>
  );
}
