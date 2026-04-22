import clsx from 'clsx';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};
export function Container({ children, className = '' }: ContainerProps) {
  return (
    <section
      className={clsx('px-4 flex items-center justify-center', className)}
    >
      {children}
    </section>
  );
}
