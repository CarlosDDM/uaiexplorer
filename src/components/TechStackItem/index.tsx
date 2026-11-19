import clsx from 'clsx';
import { IconType } from 'react-icons';

type TechStackItemProps = {
  name: string;
  icon: IconType;
};

export function TechStackItem({ name, icon: Icon }: TechStackItemProps) {
  return (
    <li
      className={clsx(
        'flex items-center gap-3 rounded-lg border border-border-card',
        'bg-background-card/50 px-4 py-3 text-sm text-indigo-100',
      )}
    >
      <Icon className='h-5 w-5 text-indigo-200' aria-hidden />
      {name}
    </li>
  );
}
