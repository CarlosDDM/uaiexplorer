import { CardListModel } from '@/models/card-list-model';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { IoCodeSlashOutline, IoGlobeOutline } from 'react-icons/io5';

const basePath = '/services/info';

export const servicesCards: CardListModel[] = [
  {
    title: 'Desenvolvimento',
    buttonDescription: 'Saiba mais sobre desenvolvimento',
    href: `${basePath}#desenvolvimento`,
    content: `É o processo de transformar ideias em aplicativos, sites ou sistemas que facilitam o nosso dia a dia. É a ponte entre um problema do mundo real e uma solução digital inteligente.`,
    icon: IoCodeSlashOutline,
  },
  {
    title: 'Design de websites',
    buttonDescription: 'Saiba mais sobre design de websites',
    href: `${basePath}#design-de-websites`,
    content: `É o aperto de mão digital entre uma empresa e seus clientes. É a construção de um espaço que transmite confiança e profissionalismo, garantindo que a primeira impressão no mundo online seja o reflexo fiel da qualidade do negócio.`,
    icon: IoGlobeOutline,
  },
  {
    title: 'SEO',
    buttonDescription: 'Saiba mais sobre SEO',
    href: `${basePath}#seo`,
    content: `É o conjunto de estratégias que torna sua empresa visível para quem procura uma solução. É o caminho que guia o cliente certo através do mar de informações da internet até a porta da sua vitrine digital.`,
    icon: HiOutlineMagnifyingGlass,
  },
];
