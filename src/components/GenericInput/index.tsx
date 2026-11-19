import clsx from 'clsx';
import { useId } from 'react';

type GenericInputProps = {
  labelText?: string;
} & React.ComponentProps<'input'>;

export function GenericInput({ labelText = '', ...props }: GenericInputProps) {
  const id = useId();

  return (
    <div className='flex flex-col gap-2'>
      {labelText && (
        <label
          className='text-sm font-medium text-indigo-200'
          htmlFor={id}
        >
          {labelText}
        </label>
      )}
      <input
        {...props}
        className={clsx(
          'w-full',
          'bg-white/5',
          'border border-white/10',
          'rounded-lg',
          'px-3.5 py-3',
          'text-indigo-50',
          'placeholder:text-indigo-300/50',
          'outline-none',
          'transition',
          'focus:border-blue-500',
          'focus-visible:ring-2 focus-visible:ring-button-default/40',
          'focus:bg-white/10',
          'disabled:opacity-40',
          'disabled:cursor-not-allowed',
          'read-only:opacity-50',
          'read-only:cursor-not-allowed',
          props.className,
        )}
        id={id}
      />
    </div>
  );
}
