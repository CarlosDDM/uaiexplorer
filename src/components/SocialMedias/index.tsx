import clsx from 'clsx';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export function SocialMedias() {
  const SocialMedia = [
    {
      href: 'https://www.facebook.com/UAI.Explorer',
      icon: <FaFacebook />,
      aria_label: 'Facebook',
      hover_color: 'text-blue-500',
    },
    {
      href: 'https://www.instagram.com/uai_explorer',
      icon: <FaInstagram />,
      aria_label: 'Instagram',
      hover_color: 'text-pink-500',
    },
    {
      href: 'https://wa.me/*',
      icon: <FaWhatsapp />,
      aria_label: 'Whatsapp',
      hover_color: 'text-green-500',
    },
  ];

  return (
    <div>
      <div className='flex items-center gap-2 w-full max-w-md'>
        <div className='flex-1 h-px bg-indigo-800' />
        <span className='text-indigo-500 text-xs uppercase tracking-widest'>
          OU
        </span>
        <div className='flex-1 h-px bg-indigo-800' />
      </div>
      <div className='p-4'>
        <p className='text-lg pb-4'>Nos contate em nossas redes sociais</p>
        <ul
          className={clsx(
            'flex gap-4 justify-center items-center p-2',
            '[&>li>a>*]:w-8 [&>li>a>*]:h-8',
            '[&>li>a>*]:transition [&>li>a>*]:duration-300',
          )}
        >
          {SocialMedia.map((item, i) => (
            <li key={`${i}-${item.aria_label}`}>
              <a
                href={item.href}
                aria-label={item.aria_label}
                rel='noopener noreferrer'
                target='_blank'
                className={clsx(`hover:${item.hover_color}`)}
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
