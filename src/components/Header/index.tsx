'use client';
import Image from 'next/image';
import Link from 'next/link';
import { HeaderMenu } from '../HeaderMenu';
import clsx from 'clsx';
import { useState, useEffect } from 'react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        'p-2 flex items-center justify-evenly w-full transition duration-300',
        'fixed z-100',
        scrolled ? 'bg-background-black-default shadow-md' : 'bg-transparent',
      )}
    >
      <Link href='/'>
        <Image
          src='/logo.svg'
          alt='Logo uaiexplorer'
          priority
          width={0}
          height={0}
          className='w-37.5 h-auto'
        />
      </Link>
      <HeaderMenu />
    </header>
  );
}
