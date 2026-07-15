import clsx from 'clsx';
import { GenericSection } from '../GenericSection';
import { LinkButton } from '../Link';
import type { IconType } from 'react-icons';

type CardServicesProps = {
  title: string;
  content: string;
  href: string;
  buttonDescription: string;
  icon: IconType;
};

function CardIcon({ icon: Icon }: { icon: IconType }) {
  return (
    <div
      className={clsx(
        '[&>svg]:h-6 [&>svg]:w-6 md:[&>svg]:h-8 md:[&>svg]:w-8',
        'text-button-default',
        'rounded-full border border-solid border-border-card p-3',
        'bg-linear-to-br from-background-navy to-background-card',
        'shadow-md shadow-border-card',
        'transition duration-300 ease-out',
        'group-hover:scale-105',
        'group-hover:border-border-card-hover group-hover:shadow-shadow-card-hover',
      )}
    >
      <Icon />
    </div>
  );
}

export function CardServices({
  buttonDescription,
  content,
  href,
  icon,
  title,
}: CardServicesProps) {
  return (
    <article
      className={clsx(
        'group select-none',
        'flex min-h-85 w-full max-w-80 flex-col items-start gap-4 p-6',
        'rounded-xl border border-solid border-border-card',
        'bg-background-card shadow-md shadow-border-card backdrop-blur-sm',
        'hover:-translate-y-1',
        'hover:border-border-card-hover hover:shadow-lg hover:shadow-shadow-card-hover',
        'transition duration-300 ease-out',
      )}
    >
      <CardIcon icon={icon} />

      <GenericSection
        title={title}
        content={content}
        titleAs='h3'
        className={clsx(
          'w-full text-left',
          '[&_h3]:transition-colors [&_h3]:duration-300',
          'group-hover:[&_h3]:text-button-default',
        )}
      />

      <LinkButton
        variant='default'
        href={href}
        aria-label={`Saiba mais sobre ${title}`}
        className='mt-auto w-full'
      >
        {buttonDescription}
      </LinkButton>
    </article>
  );
}
