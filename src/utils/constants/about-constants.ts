import type { IconType } from 'react-icons';
import {
  IoCodeSlashOutline,
  IoCompassOutline,
  IoFlagOutline,
} from 'react-icons/io5';

export type AboutValue = {
  title: string;
  description: string;
  icon: IconType;
};

export const ABOUT_TITLE =
  'Somos uma equipe apaixonada por tecnologia e inovação.';

export const ABOUT_INTRO =
  'Ajudamos empresas e empreendedores a escalar seus negócios através de soluções web modernas, rápidas e pensadas exclusivamente para cada necessidade.';

export const ABOUT_MANIFESTO =
  'Acreditamos que a tecnologia deve ser um acelerador, não um obstáculo. Nossa equipe trabalha para transformar requisitos complexos em produtos digitais sólidos, cuidando de toda a jornada técnica para que você possa focar no que realmente importa: o crescimento da sua empresa.';

export const ABOUT_VALUES: AboutValue[] = [
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
