import { IconType } from 'react-icons';
import {
  IoCodeSlashOutline,
  IoCompassOutline,
  IoFlagOutline,
} from 'react-icons/io5';
import { Badge } from '@/components/Badge';
import { Container } from '@/components/Container';
import { GenericSection } from '@/components/GenericSection';

type AboutProps = {
  titleAs?: 'h1' | 'h2';
};

type AboutValue = {
  title: string;
  description: string;
  icon: IconType;
};

const ABOUT_VALUES: AboutValue[] = [
  {
    title: 'Missão',
    icon: IoFlagOutline,
    description:
      'Capacitar nossos clientes com sistemas robustos e soluções digitais que geram eficiência e resultados reais.',
  },
  {
    title: 'Abordagem',
    icon: IoCompassOutline,
    description:
      'Não entregamos pacotes prontos. Mergulhamos no seu negócio para desenhar a estratégia e a arquitetura ideais para o seu momento.',
  },
  {
    title: 'Tecnologia',
    icon: IoCodeSlashOutline,
    description:
      'Desenvolvemos com o que há de mais atual no mercado para garantir plataformas ágeis, seguras e prontas para escalar.',
  },
];

type AboutValueItemProps = AboutValue & {
  headingAs: 'h2' | 'h3';
};

function AboutValueItem({
  title,
  description,
  icon: Icon,
  headingAs: Heading,
}: AboutValueItemProps) {
  return (
    <div className='flex flex-col gap-3 border-t border-border-card-hover pt-6 text-left'>
      <Icon className='h-7 w-7 text-button-default' aria-hidden />
      <Heading className='text-lg font-semibold text-indigo-50'>
        {title}
      </Heading>
      <p className='leading-relaxed text-indigo-300'>{description}</p>
    </div>
  );
}

function AboutValues({ headingAs }: { headingAs: 'h2' | 'h3' }) {
  return (
    <div className='grid w-full max-w-5xl gap-8 md:grid-cols-3 md:gap-10'>
      {ABOUT_VALUES.map(value => (
        <AboutValueItem key={value.title} headingAs={headingAs} {...value} />
      ))}
    </div>
  );
}

export function About({ titleAs = 'h2' }: AboutProps) {
  const valuesHeading = titleAs === 'h1' ? 'h2' : 'h3';

  return (
    <Container>
      <GenericSection
        className='text-center'
        eyebrow={<Badge>Sobre nós</Badge>}
        title='Somos uma equipe apaixonada por tecnologia e inovação.'
        titleAs={titleAs}
        content={
          <div className='mt-4 flex flex-col items-center gap-8'>
            <p className='max-w-2xl text-lg leading-relaxed text-indigo-200'>
              Ajudamos empresas e empreendedores a escalar seus negócios através
              de soluções web modernas, rápidas e pensadas exclusivamente para
              cada necessidade.
            </p>

            <AboutValues headingAs={valuesHeading} />

            {/* Manifesto: único momento de destaque tipográfico da página */}
            <blockquote className='mt-16 w-full max-w-3xl border-l-2 border-button-default pl-6 text-left font-display text-2xl leading-snug text-balance text-indigo-50 md:text-3xl'>
              Acreditamos que a tecnologia deve ser um acelerador, não um
              obstáculo. Nossa equipe trabalha para transformar requisitos
              complexos em produtos digitais sólidos, cuidando de toda a jornada
              técnica para que você possa focar no que realmente importa: o
              crescimento da sua empresa.
            </blockquote>
          </div>
        }
      />
    </Container>
  );
}
