'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { LinkButton } from '../Link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import { NAV_ITEMS } from '@/utils/constants/nav-constants';

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

  // Escape fecha o menu
  useEffect(() => {
    if (!isMenuOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsMenuOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

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
                  'relative pb-1 transition-colors duration-300',
                  'after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-center after:bg-button-default after:content-[""]',
                  'after:transition-transform after:duration-300 after:ease-in-out motion-reduce:after:transition-none',
                  active
                    ? 'text-indigo-50 after:scale-x-100'
                    : 'text-indigo-200 after:scale-x-0 hover:text-indigo-50 hover:after:scale-x-50',
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <LinkButton href='/contact' className='ml-8 hidden md:flex'>
        Orçamento
      </LinkButton>

      <button
        type='button'
        aria-expanded={isMenuOpen}
        aria-controls='mobile-menu'
        onClick={toggleMenu}
        className={clsx(
          // min-h/min-w ampliam a área de toque; -mr compensa o padding sem mudar o visual
          'flex min-h-11 min-w-11 cursor-pointer items-center justify-end gap-2 text-indigo-50 md:hidden',
          '-mr-2 pr-2',
          'transition duration-300 hover:text-indigo-300',
        )}
      >
        Menu
        {isMenuOpen ? (
          <IoMdClose size={24} aria-hidden />
        ) : (
          <GiHamburgerMenu size={24} aria-hidden />
        )}
      </button>

      {isMenuOpen &&
        // portal: o header tem backdrop-blur e viraria o referencial do fixed
        createPortal(
          <div
            aria-hidden
            onClick={() => setIsMenuOpen(false)}
            className='fixed inset-x-0 top-16 bottom-0 z-90 bg-black/50 md:hidden motion-safe:animate-[fade-in_200ms_ease-out]'
          />,
          document.body,
        )}

      {isMenuOpen && (
        <ul
          id='mobile-menu'
          className={clsx(
            'absolute right-0 top-13 z-50 w-56 md:hidden motion-safe:animate-[fade-in_200ms_ease-out]',
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
                    'flex min-h-11 items-center rounded-lg px-3 text-base transition duration-300',
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
          <li className='mt-1'>
            <LinkButton
              href='/contact'
              onClick={toggleMenu}
              className='w-full max-w-none'
            >
              Orçamento
            </LinkButton>
          </li>
        </ul>
      )}
    </nav>
  );
}
