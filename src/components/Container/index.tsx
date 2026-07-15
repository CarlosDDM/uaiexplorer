import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type ContainerProps<T extends ElementType = 'div'> = {
  as?: T;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children'>;

export function Container<T extends ElementType = 'div'>({
  as,
  className,
  children,
  ...props
}: ContainerProps<T>) {
  const Component: ElementType = as ?? 'div';

  return (
    <Component
      className={clsx('px-4 flex items-center justify-center', className)}
      {...props}
    >
      {children}
    </Component>
  );
}
