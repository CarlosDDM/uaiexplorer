'use client';
import Image from 'next/image';
import Link from 'next/link';
import { HeaderMenu } from '../HeaderMenu';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-100 border-b transition duration-300',
        scrolled
          ? 'border-border-card bg-background-black-default/80 shadow-md backdrop-blur-md'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className='mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3'>
        <Link href='/' aria-label='UAIExplorer — página inicial'>
          <Image
            src='/logo.svg'
            alt='Logo uaiexplorer'
            priority
            width={0}
            height={0}
            className='h-auto w-37.5'
          />
        </Link>

        <HeaderMenu />
      </div>
    </header>
  );
}
