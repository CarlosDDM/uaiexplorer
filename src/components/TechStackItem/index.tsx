import clsx from 'clsx';
import { IconType } from 'react-icons';

type TechStackItemProps = {
  name: string;
  color: string;
  icon: IconType;
};
export function TechStackItem({
  name,
  icon: Icon,
  color = '',
}: TechStackItemProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-2 p-3',
        'rounded-lg border border-white/5 bg-white/3',
        'hover:bg-white/[0.07] hover:border-white/10',
        'transition duration-300',
      )}
    >
      <Icon color={color} className={clsx(`w-6 h-6`)} />
      <span className='text-[11px] text-slate-400'>{name}</span>
    </div>
  );
}
