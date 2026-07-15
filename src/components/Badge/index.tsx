import type { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
};

export function Badge({ children }: BadgeProps) {
  return (
    <span className='inline-flex items-center gap-2 rounded-full border border-border-card bg-background-card/60 px-4 py-1.5 text-sm text-indigo-200 backdrop-blur-sm'>
      <span className='relative flex h-2 w-2'>
        <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-button-default opacity-75' />
        <span className='relative inline-flex h-2 w-2 rounded-full bg-button-default' />
      </span>
      {children}
    </span>
  );
}
