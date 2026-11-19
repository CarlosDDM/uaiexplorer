'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

type ServiceInfoNavItem = {
  id: string;
  title: string;
};

type ServiceInfoNavProps = {
  items: ServiceInfoNavItem[];
};

export function ServiceInfoNav({ items }: ServiceInfoNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);

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
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label='Serviços nesta página'
      className='sticky top-20 z-40 mt-12 flex justify-center'
    >
      <ul
        className={clsx(
          'flex max-w-full gap-1 overflow-x-auto rounded-full p-1',
          'border border-solid border-border-card bg-background-black-default/70 shadow-lg backdrop-blur-md',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
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
                  'block rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap',
                  'transition duration-300 ease-out',
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
  );
}
