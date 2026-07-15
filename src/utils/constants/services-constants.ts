import { CardListModel } from '@/models/card-list-model';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { IoCodeSlashOutline, IoGlobeOutline } from 'react-icons/io5';

const basePath = '/services/info';

export const servicesCards: CardListModel[] = [
  {
    title: 'Desenvolvimento',
    buttonDescription: 'Saiba mais',
    href: `${basePath}#desenvolvimento`,
    content: `Sites e sistemas construídos do zero pro seu negócio — rápidos, estáveis e sem template genérico. A ponte entre um problema real e uma solução que continua funcionando quando você crescer.`,
    icon: IoCodeSlashOutline,
  },
  {
    title: 'Design de websites',
    buttonDescription: 'Saiba mais',
    href: `${basePath}#design-de-websites`,
    content: `Sua primeira impressão no mundo online, feita pra transmitir confiança em segundos. Um espaço que reflete a qualidade do seu negócio antes mesmo do cliente ler uma linha.`,
    icon: IoGlobeOutline,
  },
  {
    title: 'SEO',
    buttonDescription: 'Saiba mais',
    href: `${basePath}#seo`,
    content: `Aparecer pra quem já está procurando o que você oferece. As estratégias que colocam sua empresa no caminho do cliente certo — no momento em que ele decide comprar.`,
    icon: HiOutlineMagnifyingGlass,
  },
];
