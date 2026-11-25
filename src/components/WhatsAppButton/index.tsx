'use client';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppLink } from '@/utils/constants/contact-constants';

export function WhatsAppButton() {
  const pathname = usePathname();

  // /contact já lista o canal e o botão cobriria os campos no mobile
  if (pathname === '/contact') return null;

  return (
    <a
      href={getWhatsAppLink()}
      target='_blank'
      rel='noopener noreferrer'
      aria-label='Fale com a gente pelo WhatsApp (abre em nova aba)'
      className={clsx(
        'group fixed z-90 flex items-center gap-3',
        'right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))]',
        'md:right-6 md:bottom-6',
        'focus-visible:outline-none',
      )}
    >
      {/* rótulo que aparece ao passar o mouse / focar (só desktop) */}
      <span
        aria-hidden
        className={clsx(
          'pointer-events-none hidden md:block',
          'rounded-full border border-solid border-border-card bg-background-card/90 px-4 py-2',
          'text-sm font-medium text-indigo-50 shadow-lg backdrop-blur-md',
          'opacity-0 transition duration-300 ease-out motion-safe:translate-x-2 motion-reduce:transition-none',
          'group-hover:opacity-100 motion-safe:group-hover:translate-x-0',
          'group-focus-visible:opacity-100 motion-safe:group-focus-visible:translate-x-0',
        )}
      >
        Fale com a gente
      </span>

      <span
        className={clsx(
          'relative grid h-14 w-14 place-content-center rounded-full',
          'bg-whatsapp text-white shadow-lg shadow-whatsapp/30',
          'transition duration-300 ease-out motion-reduce:transition-none',
          'group-hover:bg-whatsapp-hover group-hover:shadow-xl group-hover:shadow-whatsapp/40 motion-safe:group-hover:scale-105',
          'motion-safe:group-active:scale-95',
          'group-focus-visible:ring-2 group-focus-visible:ring-whatsapp/60 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background',
          '[&>svg]:h-7 [&>svg]:w-7',
        )}
      >
        {/* pulso de atenção: roda poucas vezes ao carregar e para */}
        <span
          aria-hidden
          className='absolute inset-0 -z-10 rounded-full bg-whatsapp/50 motion-safe:animate-ping motion-safe:[animation-iteration-count:3]'
        />
        <FaWhatsapp aria-hidden />
      </span>
    </a>
  );
}
