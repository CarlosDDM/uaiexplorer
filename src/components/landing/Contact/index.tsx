import clsx from 'clsx';
import { FormContact } from '@/components/FormContact';
import { FormContactHeader } from '@/components/FormContactHeader';
import { GenericSection } from '@/components/GenericSection';
import { SOCIAL_LINKS } from '@/utils/constants/social-constants';

type ContactProps = {
  titleAs?: 'h1' | 'h2';
};

type SubHeading = 'h2' | 'h3';

const CONTACT_STEPS = [
  {
    title: 'Você conta o que precisa',
    description:
      'Pelo formulário ou pelo WhatsApp, do jeito que for mais fácil.',
  },
  {
    title: 'A gente responde em até 24h',
    description:
      'Com perguntas para entender o seu negócio e o objetivo do projeto.',
  },
  {
    title: 'Você recebe uma proposta',
    description: 'Com escopo, prazo e valor definidos antes de começar.',
  },
];

function ContactPitch({
  titleAs,
  subHeading: SubTitle,
}: {
  titleAs: 'h1' | 'h2';
  subHeading: SubHeading;
}) {
  const subTitleStyle = 'text-xl font-semibold text-indigo-50';

  return (
    <GenericSection
      title='Fale com a gente'
      titleAs={titleAs}
      content={
        <div className='mt-4 flex flex-col gap-10'>
          <p className='max-w-prose text-lg leading-relaxed text-indigo-200'>
            Transformamos ideias em produtos digitais que realmente funcionam.
            Se você busca um parceiro técnico que entenda o que precisa ser
            construído, você está no lugar certo.
          </p>

          <div>
            <SubTitle className={subTitleStyle}>Como funciona</SubTitle>
            <ol className='mt-4 flex flex-col gap-4'>
              {CONTACT_STEPS.map((step, index) => (
                <li key={step.title} className='flex items-start gap-3'>
                  <span className='grid h-7 w-7 shrink-0 place-content-center rounded-full border border-border-card-hover text-sm text-button-default'>
                    {index + 1}
                  </span>
                  <div>
                    <p className='font-semibold text-indigo-50'>{step.title}</p>
                    <p className='text-sm text-indigo-300'>
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <SubTitle className={subTitleStyle}>Prefere falar direto?</SubTitle>
            <ul className='mt-4 flex flex-col gap-3'>
              {SOCIAL_LINKS.map(({ label, href, handle, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={clsx(
                      'flex items-center gap-3 rounded-xl px-4 py-3',
                      'border border-border-card bg-background-card/50',
                      'transition-colors hover:border-border-card-hover',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button-default/60',
                    )}
                  >
                    <span className='grid h-9 w-9 shrink-0 place-content-center rounded-full border border-border-card text-indigo-100'>
                      <Icon className='h-4 w-4' aria-hidden='true' />
                    </span>
                    <span className='flex flex-col'>
                      <span className='font-medium text-indigo-50'>
                        {label}
                      </span>
                      <span className='text-sm text-indigo-300'>{handle}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
    />
  );
}

function ContactForm({ headingAs }: { headingAs: SubHeading }) {
  return (
    <div
      className={clsx(
        'mx-auto w-full max-w-xl rounded-2xl p-6 md:p-8 lg:sticky lg:top-28',
        'border border-solid border-border-card',
        'bg-background-card/60 shadow-lg shadow-border-card backdrop-blur-sm',
      )}
    >
      <FormContactHeader headingAs={headingAs} />
      <FormContact />
    </div>
  );
}

export function Contact({ titleAs = 'h2' }: ContactProps) {
  const subHeading: SubHeading = titleAs === 'h1' ? 'h2' : 'h3';

  return (
    <div className='mx-auto grid w-full max-w-6xl items-start gap-10 lg:grid-cols-2 lg:gap-16'>
      <ContactPitch titleAs={titleAs} subHeading={subHeading} />
      <ContactForm headingAs={subHeading} />
    </div>
  );
}
