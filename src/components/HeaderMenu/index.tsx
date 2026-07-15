'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import type { NavListModel } from '@/models/nav-list-model';

const NAV_ITEMS: NavListModel[] = [
  { label: 'Home', href: '/' },
  { label: 'Sobre nós', href: '/about' },
  { label: 'Serviços', href: '/services' },
  { label: 'Contato', href: '/contact' },
];

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export function HeaderMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  function toggleMenu() {
    setIsMenuOpen(prev => !prev);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // fecha o menu ao navegar para outra rota
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset de UI ao mudar de rota
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav ref={navRef} className='relative flex items-center'>
      <ul className='hidden items-center gap-8 md:flex'>
        {NAV_ITEMS.map(item => {
          const active = isActive(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={clsx(
                  'relative pb-1 transition duration-300',
                  'after:absolute after:bottom-0 after:h-0.5 after:bg-button-default after:content-[""]',
                  'after:transition-all after:duration-300 after:ease-in-out',
                  active
                    ? 'text-indigo-50 after:left-0 after:w-full'
                    : 'text-indigo-200 after:left-1/2 after:w-0 hover:text-indigo-50 hover:after:left-1/4 hover:after:w-1/2',
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <button
        type='button'
        aria-expanded={isMenuOpen}
        aria-controls='mobile-menu'
        onClick={toggleMenu}
        className={clsx(
          'flex cursor-pointer items-center gap-2 text-indigo-50 md:hidden',
          'transition duration-300 hover:text-indigo-300',
        )}
      >
        Menu
        {isMenuOpen ? (
          <IoMdClose size={24} aria-label='Fechar menu' />
        ) : (
          <GiHamburgerMenu size={24} aria-label='Abrir menu' />
        )}
      </button>

      {isMenuOpen && (
        <ul
          id='mobile-menu'
          className={clsx(
            'absolute right-0 top-11 z-50 w-48 md:hidden',
            'flex flex-col gap-1 rounded-xl p-2',
            'border border-solid border-border-card bg-background-card/95 backdrop-blur-md',
            'shadow-lg shadow-border-card',
          )}
        >
          {NAV_ITEMS.map(item => {
            const active = isActive(pathname, item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={toggleMenu}
                  className={clsx(
                    'block rounded-lg px-3 py-2 text-sm transition duration-300',
                    active
                      ? 'bg-button-default/15 text-indigo-50'
                      : 'text-indigo-200 hover:bg-white/5 hover:text-indigo-50',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
