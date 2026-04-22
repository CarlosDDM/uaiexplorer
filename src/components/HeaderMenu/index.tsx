'use client';
import { NavListModel } from '@/models/nav-list-model';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';

export function HeaderMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuPath: NavListModel[] = [
    { label: 'Home', href: '/' },
    { label: 'Sobre nós', href: '/about' },
    { label: 'Serviços', href: '/services' },
    { label: 'Contato', href: '/contact' },
  ];

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

  return (
    <nav
      ref={navRef}
      className='flex items-center gap-4 relative bg-transparent'
    >
      <ul className='hidden md:flex items-center gap-6 group-hover:'>
        {menuPath.map(item => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={clsx(
                'text-indigo-50 transition duration-300 hover:text-indigo-300',
                'relative pb-1',
                'after:content-[""] after:absolute after:bottom-0 after:left-1/2',
                'after:w-0 after:h-0.5 after:bg-indigo-50',
                'after:transition-all after:duration-300 after:ease-in-out',
                'hover:after:w-1/2 hover:after:left-1/4',
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        aria-expanded={isMenuOpen}
        aria-controls='mobile-menu'
        onClick={toggleMenu}
        className={clsx(
          'cursor-pointer md:hidden text-indigo-50',
          'flex items-center gap-3',
          'transition duration-300 hover:text-indigo-300',
        )}
      >
        Menu
        {isMenuOpen ? (
          <IoMdClose
            size={25}
            aria-label='Fechar menu'
            aria-description='Fechar menu'
          />
        ) : (
          <GiHamburgerMenu
            size={25}
            aria-label='Abrir menu'
            aria-description='Abrir menu'
          />
        )}
      </button>

      {isMenuOpen && (
        <ul
          className={clsx(
            'md:hidden',
            'flex flex-col ',
            'gap-2 absolute right-0 top-8 w-40 z-50',
            'bg-white p-4 rounded shadow-lg  text-blue-950',
            'text-center',
          )}
        >
          {menuPath.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className='block transition duration-300 hover:bg-slate-200 rounded'
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
