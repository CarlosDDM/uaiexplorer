import { AboutValues } from '@/components/AboutValues';
import { LinkButton } from '@/components/Link';
import { ABOUT_INTRO, ABOUT_TITLE } from '@/utils/constants/about-constants';

type AboutProps = {
  titleAs?: 'h1' | 'h2';
};

// Versão compacta para a home: o texto fica à esquerda e os valores num painel escuro
export function About({ titleAs: Title = 'h2' }: AboutProps) {
  const valuesHeading = Title === 'h1' ? 'h2' : 'h3';

  return (
    <div className='mx-auto grid w-full max-w-6xl gap-12 px-4 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-center md:gap-16'>
      <div className='text-left'>
        <Title className='text-3xl leading-tight font-bold text-balance text-indigo-50 md:text-4xl'>
          {ABOUT_TITLE}
        </Title>
        <p className='mt-5 max-w-md text-lg leading-relaxed text-indigo-100'>
          {ABOUT_INTRO}
        </p>
        <LinkButton variant='transparent' href='/about' className='mt-8 w-fit'>
          Conheça a UAI Explorer
        </LinkButton>
      </div>

      <div className='rounded-2xl border border-border-card bg-background-black-default/85 p-6 md:p-8'>
        <AboutValues layout='list' headingAs={valuesHeading} />
      </div>
    </div>
  );
}
