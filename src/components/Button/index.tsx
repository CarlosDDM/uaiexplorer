import clsx from 'clsx';

type ButtonBorderVariants = 'default' | 'transparent' | 'none';
type ButtonVariants = 'default' | 'transparent';
type ButtonSizes = 'sm' | 'md' | 'lg';
type ButtonProps = {
  variant?: ButtonVariants;
  sizes?: ButtonSizes;
  borderVariant?: ButtonBorderVariants;
} & React.ComponentProps<'button'>;

export function Button({
  sizes = 'md',
  variant = 'default',
  borderVariant = 'default',
  ...props
}: ButtonProps) {
  const buttonVariants: Record<ButtonVariants, string> = {
    default: clsx(
      'bg-button-default',
      'text-indigo-50',
      'shadow-lg shadow-button-default/30',
      'hover:bg-button-default-hover',
      'hover:shadow-xl hover:shadow-button-default/40',
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

  const buttonClasses = clsx(
    buttonVariants[variant],
    buttonSizes[sizes],
    buttonBorderVariants[borderVariant],
    'cursor-pointer',
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'transition duration-300 ease-out',
    'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button-default/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50',
    'max-w-75',
    props.className,
  );

  return <button {...props} className={buttonClasses} />;
}
