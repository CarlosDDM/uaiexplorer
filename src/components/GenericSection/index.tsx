import clsx from 'clsx';

type GenericSectionTitle = 'h1' | 'h2' | 'h3';

type GenericSectionProps = {
  title: string;
  content?: React.ReactNode;
  eyebrow?: React.ReactNode;
  titleAs?: GenericSectionTitle;
  children?: React.ReactNode;
} & Omit<React.ComponentProps<'section'>, 'title' | 'content' | 'children'>;

export function GenericSection({
  title,
  content,
  eyebrow,
  titleAs: Title = 'h2',
  children,
  ...props
}: GenericSectionProps) {
  const titleStyle = clsx(
    'font-bold mb-4 tracking-tight text-balance',
    Title === 'h1' &&
      clsx(
        'text-4xl md:text-6xl leading-[1.1]',
        'bg-gradient-to-b from-indigo-50 to-indigo-300/80 bg-clip-text text-transparent',
      ),
    Title === 'h2' && 'text-2xl md:text-4xl leading-tight',
    Title === 'h3' && 'text-xl md:text-2xl leading-snug',
  );

  return (
    <section {...props}>
      <div className='py-2'>
        {eyebrow && <div className='mb-6'>{eyebrow}</div>}
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
