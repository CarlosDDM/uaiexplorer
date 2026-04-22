import clsx from 'clsx';

type GenericSectionTitle = 'h1' | 'h2' | 'h3';

type GenericSectionProps = {
  title: string;
  content?: React.ReactNode;
  titleAs?: GenericSectionTitle;
  children?: React.ReactNode;
} & Omit<React.ComponentProps<'section'>, 'title' | 'content' | 'children'>;

export function GenericSection({
  title,
  content,
  titleAs: Title = 'h2',
  children,
  ...props
}: GenericSectionProps) {
  const titleStyle = clsx(
    'font-bold mb-4',
    Title === 'h1' && 'text-4xl',
    Title === 'h2' && 'text-2xl',
    Title === 'h3' && 'text-xl',
  );

  return (
    <section {...props}>
      <div className='py-2'>
        <Title className={titleStyle}>{title}</Title>
        {typeof content === 'string' ? (
          <p className='text-sm/tight mb-8'>{content}</p>
        ) : (
          content
        )}
        {children}
      </div>
    </section>
  );
}
