import clsx from 'clsx';
import Image from 'next/image';
import { IoFlashOutline, IoRocketOutline, IoTimeOutline } from 'react-icons/io5';
import { HERO_BG_URL } from '@/utils/constants/image-constants';
import { Container } from '../../Container';
import { GenericSection } from '../../GenericSection';
import { LinkButton } from '../../Link';

const HERO_ACTIONS = [
  { href: '/contact', variant: 'default', label: 'Faça um orçamento' },
  // âncora na própria home: rola suavemente até a seção de serviços
  { href: '#servicos', variant: 'transparent', label: 'Veja nossos serviços' },
] as const;

const HERO_HIGHLIGHTS = [
  { icon: IoRocketOutline, label: 'Projetos sob medida, sem template' },
  { icon: IoTimeOutline, label: 'Resposta em até 24h' },
  { icon: IoFlashOutline, label: 'SEO e performance desde o início' },
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
        <LinkButton
          key={href}
          href={href}
          variant={variant}
          className='w-full max-w-xs sm:w-auto'
        >
          {label}
        </LinkButton>
      ))}
    </div>
  );
}

function HeroHighlights() {
  return (
    <ul className='mx-auto mt-10 flex flex-col items-center gap-3 text-sm text-indigo-200 md:mt-12 lg:flex-row lg:justify-center lg:gap-0 lg:relative lg:left-1/2 lg:w-max lg:-translate-x-1/2'>
      {HERO_HIGHLIGHTS.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className='flex items-center gap-2 lg:px-6 lg:not-first:border-l lg:not-first:border-white/15 lg:whitespace-nowrap'
        >
          <Icon aria-hidden className='h-4 w-4 shrink-0 text-button-default' />
          {label}
        </li>
      ))}
    </ul>
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
          <HeroHighlights />
        </GenericSection>
      </div>
    </Container>
  );
}
