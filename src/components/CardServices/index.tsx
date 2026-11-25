import clsx from 'clsx';
import Link from 'next/link';
import type { IconType } from 'react-icons';
import { IoArrowForward } from 'react-icons/io5';

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
        '[&>svg]:h-6 [&>svg]:w-6 md:[&>svg]:h-7 md:[&>svg]:w-7',
        'text-button-default',
        'w-fit rounded-full border border-solid border-border-card p-3',
        'bg-linear-to-br from-background-navy to-background-card',
        'shadow-md shadow-border-card',
        'transition duration-300 ease-out motion-reduce:transition-none',
        'motion-safe:group-hover:scale-105',
        'group-hover:border-border-card-hover group-hover:shadow-shadow-card-hover',
      )}
    >
      <Icon aria-hidden />
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
        'group relative flex h-full w-full flex-col gap-5 overflow-hidden p-6 md:p-7',
        'rounded-2xl border border-solid border-border-card',
        'bg-background-card/90 shadow-md shadow-border-card/40',
        'transition duration-300 ease-out motion-reduce:transition-none',
        'motion-safe:hover:-translate-y-1 hover:border-border-card-hover hover:shadow-lg hover:shadow-shadow-card-hover',
        'focus-within:border-border-card-hover',
      )}
    >
      {/* filete de luz no topo do card no hover */}
      <span
        aria-hidden
        className={clsx(
          'pointer-events-none absolute inset-x-6 top-0 h-px',
          'bg-linear-to-r from-transparent via-button-default to-transparent',
          'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
        )}
      />

      <CardIcon icon={icon} />

      <div className='flex flex-col gap-3'>
        <h3
          className={clsx(
            'text-xl leading-snug font-bold tracking-tight text-indigo-50 md:text-2xl',
            'transition-colors duration-300 group-hover:text-button-default',
          )}
        >
          {title}
        </h3>
        <p className='text-sm leading-relaxed text-indigo-200 md:text-base/relaxed'>
          {content}
        </p>
      </div>

      <Link
        href={href}
        aria-label={`${buttonDescription} sobre ${title}`}
        className={clsx(
          'mt-auto inline-flex w-fit items-center gap-2 pt-2',
          'text-sm font-semibold text-button-default md:text-base',
          // o ::after cobre o card inteiro, então qualquer clique no card abre o link
          'after:absolute after:inset-0 after:rounded-2xl after:content-[""]',
          'focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-button-default/60',
        )}
      >
        {buttonDescription}
        <IoArrowForward
          aria-hidden
          className='h-4 w-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1 motion-reduce:transition-none'
        />
      </Link>
    </article>
  );
}
