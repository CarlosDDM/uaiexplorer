import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { LOGO_URL } from '@/utils/constants/image-constants';
import { NAV_ITEMS } from '@/utils/constants/nav-constants';
import { SOCIAL_LINKS } from '@/utils/constants/social-constants';

const headingStyle = 'mb-4 text-sm font-semibold text-indigo-50';
const linkStyle = clsx(
  'py-1 text-sm text-indigo-300 transition duration-300 hover:text-indigo-50',
  'rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button-default',
);

export function Footer() {
  return (
    <footer className='w-full border-t border-border-card bg-background-black-default pt-12 pb-6'>
      <div className='mx-auto max-w-6xl px-4'>
        <div className='grid gap-10 md:grid-cols-[2fr_1fr_1fr]'>
          <div className='flex flex-col gap-4'>
            <Image
              src={LOGO_URL}
              alt='UAI Explorer'
              width={128}
              height={32}
              className='h-auto w-32'
            />
            <p className='max-w-xs text-sm text-indigo-300'>
              Sites, sistemas e SEO sob medida para o seu negócio.
            </p>
          </div>

          <nav aria-label='Rodapé'>
            <h2 className={headingStyle}>Navegação</h2>
            <ul role='list' className='flex flex-col gap-1'>
              {NAV_ITEMS.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(linkStyle, 'inline-block')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={headingStyle}>Contato</h2>
            <ul role='list' className='flex flex-col gap-1'>
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={clsx(
                      linkStyle,
                      'inline-flex items-center gap-2',
                    )}
                  >
                    <Icon aria-hidden />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='mt-10 border-t border-border-card pt-6 pb-24 md:pb-6'>
          <p className='text-xs text-indigo-300/80'>
            &copy; {new Date().getFullYear()} UAI Explorer. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
