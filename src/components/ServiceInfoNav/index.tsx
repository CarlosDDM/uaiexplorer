'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

type ServiceInfoNavItem = {
  id: string;
  title: string;
};

type ServiceInfoNavProps = {
  items: ServiceInfoNavItem[];
};

export function ServiceInfoNav({ items }: ServiceInfoNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const [isStuck, setIsStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // destaca a aba da seção que está passando pelo meio da tela
  useEffect(() => {
    const sections = items
      .map(item => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.find(entry => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    sections.forEach(section => observer.observe(section));

    // no fim da página a última seção pode não chegar à faixa do observer
    const lastId = items[items.length - 1]?.id;
    const handleScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom && lastId) setActiveId(lastId);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items]);

  // detecta quando a barra encosta no Header (64px) para preencher toda a largura sem fresta
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting && entry.boundingClientRect.top <= 64);
      },
      { rootMargin: '-64px 0px 0px 0px', threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden className='h-px w-full' />
      <nav
        aria-label='Serviços nesta página'
        className={clsx(
          'sticky top-16 z-40 mt-10 flex w-full justify-center border-b px-4 transition-colors duration-200',
          isStuck
            ? 'border-border-card bg-background-black-default/95 py-2.5 shadow-md backdrop-blur-md'
            : 'border-transparent bg-transparent py-1',
        )}
      >
        <ul
          className={clsx(
            'flex max-w-full gap-1 overflow-x-auto rounded-full p-1',
            '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
            isStuck
              ? 'border border-solid border-border-card bg-background-card/80'
              : 'border border-solid border-border-card bg-background-black-default/70 shadow-lg backdrop-blur-md',
          )}
        >
          {items.map(item => {
            const active = item.id === activeId;

            return (
              <li key={item.id} className='shrink-0'>
                <a
                  href={`#${item.id}`}
                  aria-current={active ? 'location' : undefined}
                  className={clsx(
                    'block rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap sm:px-4 sm:py-2 sm:text-sm',
                    'transition duration-300 ease-out motion-reduce:transition-none',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button-default/60',
                    active
                      ? 'bg-button-default text-indigo-50 shadow-md shadow-button-default/30'
                      : 'text-indigo-200 hover:bg-white/5 hover:text-indigo-50',
                  )}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
