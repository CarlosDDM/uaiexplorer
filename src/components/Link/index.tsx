import clsx from 'clsx';
import Link from 'next/link';
import type { ComponentProps } from 'react';

type ButtonBorderVariants = 'default' | 'transparent' | 'none';
type ButtonVariants = 'default' | 'transparent';
type ButtonSizes = 'sm' | 'md' | 'lg';

type LinkButtonProps = {
  variant?: ButtonVariants;
  sizes?: ButtonSizes;
  borderVariant?: ButtonBorderVariants;
} & ComponentProps<typeof Link>;

export function LinkButton({
  sizes = 'md',
  variant = 'default',
  borderVariant = 'default',
  ...props
}: LinkButtonProps) {
  const buttonVariants: Record<ButtonVariants, string> = {
    default: clsx(
      'bg-button-default',
      'text-indigo-50',
      'hover:bg-button-default-hover',
    ),
    transparent: clsx(
      'bg-button-transparent',
      'text-white',
      'hover:bg-button-transparent-hover',
    ),
  };

  const buttonSizes: Record<ButtonSizes, string> = {
    sm: clsx(
      'text-xs/tight',
      'py-1',
      'px-2',
      'rounded-sm',
      '[&_svg]:w-3',
      '[&_svg]:h-3',
      'gap-1',
    ),
    md: clsx(
      'text-base/tight',
      'py-2',
      'px-4',
      'rounded-md',
      '[&_svg]:w-4',
      '[&_svg]:h-4',
      'gap-2',
    ),
    lg: clsx(
      'text-lg/tight',
      'py-4',
      'px-8',
      'rounded-lg',
      '[&_svg]:w-5',
      '[&_svg]:h-5',
      'gap-3',
    ),
  };

  const buttonBorderVariants: Record<ButtonBorderVariants, string> = {
    default: clsx('border', 'border-button-default'),
    transparent: clsx('border', 'border-button-transparent'),
    none: '',
  };

  const linkClasses = clsx(
    buttonVariants[variant],
    buttonSizes[sizes],
    buttonBorderVariants[borderVariant],
    'cursor-pointer',
    'flex',
    'items-center',
    'justify-center',
    'transition',
    'max-w-75',
    'text-center',
    props.className,
  );

  return <Link {...props} className={linkClasses} />;
}
