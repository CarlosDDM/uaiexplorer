import clsx from 'clsx';
import {
  ABOUT_VALUES,
  type AboutValue,
} from '@/utils/constants/about-constants';

type AboutValuesProps = {
  headingAs: 'h2' | 'h3';
  layout: 'columns' | 'list';
};

type AboutValueItemProps = AboutValue & AboutValuesProps;

function AboutValueItem({
  title,
  description,
  icon: Icon,
  headingAs: Heading,
  layout,
}: AboutValueItemProps) {
  if (layout === 'list') {
    return (
      <li className='flex items-start gap-4 border-t border-border-card py-5 first:border-t-0'>
        <span className='grid h-11 w-11 shrink-0 place-content-center rounded-full border border-border-card bg-background-card/70'>
          <Icon className='h-5 w-5 text-button-default' aria-hidden />
        </span>
        <div className='flex flex-col gap-1'>
          <Heading className='font-semibold text-indigo-50'>{title}</Heading>
          <p className='leading-relaxed text-indigo-200'>{description}</p>
        </div>
      </li>
    );
  }

  return (
    <li className='flex flex-col gap-3 border-t border-border-card-hover pt-6 text-left'>
      <Icon className='h-7 w-7 text-button-default' aria-hidden />
      <Heading className='text-lg font-semibold text-indigo-50'>
        {title}
      </Heading>
      <p className='leading-relaxed text-indigo-300'>{description}</p>
    </li>
  );
}

export function AboutValues({ headingAs, layout }: AboutValuesProps) {
  return (
    <ul
      role='list'
      className={clsx(
        layout === 'columns' && 'grid w-full gap-8 md:grid-cols-3 md:gap-10',
        layout === 'list' && 'flex flex-col',
      )}
    >
      {ABOUT_VALUES.map(value => (
        <AboutValueItem
          key={value.title}
          headingAs={headingAs}
          layout={layout}
          {...value}
        />
      ))}
    </ul>
  );
}
