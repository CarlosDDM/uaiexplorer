import clsx from 'clsx';
import type { ReactNode } from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

type SocialMedia = {
  href: string;
  icon: ReactNode;
  label: string;
  hoverColor: string;
};

const socialMedias: SocialMedia[] = [
  {
    href: 'https://www.facebook.com/UAI.Explorer',
    icon: <FaFacebook />,
    label: 'Facebook',
    hoverColor: 'hover:text-blue-500 hover:border-blue-500/50',
  },
  {
    href: 'https://www.instagram.com/uai_explorer',
    icon: <FaInstagram />,
    label: 'Instagram',
    hoverColor: 'hover:text-pink-500 hover:border-pink-500/50',
  },
  {
    href: 'https://wa.me/*',
    icon: <FaWhatsapp />,
    label: 'Whatsapp',
    hoverColor: 'hover:text-green-500 hover:border-green-500/50',
  },
];

export function SocialMedias() {
  return (
    <div className='w-full max-w-md text-center'>
      <div className='flex items-center gap-2'>
        <div className='h-px flex-1 bg-indigo-800' />
        <span className='text-xs uppercase tracking-widest text-indigo-500'>
          OU
        </span>
        <div className='h-px flex-1 bg-indigo-800' />
      </div>

      <div className='p-4'>
        <p className='pb-4 text-lg'>Nos contate em nossas redes sociais</p>
        <ul className='flex items-center justify-center gap-4'>
          {socialMedias.map(item => (
            <li key={item.label}>
              <a
                href={item.href}
                aria-label={item.label}
                rel='noopener noreferrer'
                target='_blank'
                className={clsx(
                  'grid h-12 w-12 place-content-center rounded-full',
                  'border border-solid border-border-card bg-background-card/60 text-indigo-200 backdrop-blur-sm',
                  'transition duration-300 ease-out hover:-translate-y-1',
                  '[&>svg]:h-5 [&>svg]:w-5',
                  item.hoverColor,
                )}
              >
                {item.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
