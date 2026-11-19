import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { getWhatsAppLink } from '@/utils/constants/contact-constants';

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
  icon: IconType;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'WhatsApp',
    href: getWhatsAppLink(),
    handle: 'Fale direto com a gente',
    icon: FaWhatsapp,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/uai_explorer',
    handle: '@uai_explorer',
    icon: FaInstagram,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/UAI.Explorer',
    handle: 'UAI.Explorer',
    icon: FaFacebook,
  },
];
