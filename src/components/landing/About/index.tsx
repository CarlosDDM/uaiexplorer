import clsx from 'clsx';
import { Badge } from '@/components/Badge';
import { Container } from '@/components/Container';
import { GenericSection } from '@/components/GenericSection';

const ABOUT_VALUES = [
  {
    step: '01',
    title: 'Missão',
    description:
      'Capacitar nossos clientes com sistemas robustos e soluções digitais que geram eficiência e resultados reais.',
  },
  {
    step: '02',
    title: 'Abordagem',
    description:
      'Não entregamos pacotes prontos. Mergulhamos no seu negócio para desenhar a estratégia e a arquitetura ideais para o seu momento.',
  },
  {
    step: '03',
    title: 'Tecnologia',
    description:
      'Desenvolvemos com o que há de mais atual no mercado para garantir plataformas ágeis, seguras e prontas para escalar.',
  },
];

type AboutValue = (typeof ABOUT_VALUES)[number];

function AboutValueCard({ step, title, description }: AboutValue) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-3 p-6 text-left',
        'rounded-xl border border-solid border-border-card',
        'bg-background-card/60 shadow-md shadow-border-card backdrop-blur-sm',
        'transition duration-300 ease-out',
        'hover:-translate-y-1 hover:border-border-card-hover hover:shadow-lg hover:shadow-shadow-card-hover',
      )}
    >
      <span className='text-2xl font-bold text-blue-400'>{step}</span>
      <h3 className='font-semibold text-indigo-50'>{title}</h3>
      <p className='text-sm leading-relaxed text-indigo-300'>{description}</p>
    </div>
  );
}

function AboutValues() {
  return (
    <div className='grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-3'>
      {ABOUT_VALUES.map(value => (
        <AboutValueCard key={value.step} {...value} />
      ))}
    </div>
  );
}

export function About() {
  return (
    <Container>
      <GenericSection
        className='text-center'
        eyebrow={<Badge>Sobre nós</Badge>}
        title='Somos uma equipe apaixonada por tecnologia e inovação.'
        content={
          <div className='mt-4 flex flex-col items-center gap-8'>
            <p className='max-w-2xl text-lg leading-relaxed text-indigo-300'>
              Ajudamos empresas e empreendedores a escalar seus negócios através
              de soluções web modernas, rápidas e pensadas exclusivamente para
              cada necessidade.
            </p>

            <AboutValues />

            <p className='mt-8 max-w-4xl text-sm/tight text-indigo-200 md:text-lg'>
              Acreditamos que a tecnologia deve ser um acelerador, não um
              obstáculo. Nossa equipe trabalha para transformar requisitos
              complexos em produtos digitais sólidos, cuidando de toda a jornada
              técnica para que você possa focar no que realmente importa: o
              crescimento da sua empresa.
            </p>
          </div>
        }
      />
    </Container>
  );
}
