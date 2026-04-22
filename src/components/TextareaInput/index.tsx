import clsx from 'clsx';
import { useId } from 'react';

type TextareaInputProps = {
  labelText?: string;
} & React.ComponentProps<'textarea'>;

export function TextareaInput({
  labelText = '',
  ...props
}: TextareaInputProps) {
  const id = useId();
  return (
    <div className='flex flex-col gap-2'>
      {labelText && (
        <label
          className='text-xs text-slate-400 uppercase tracking-wider'
          htmlFor={id}
        >
          {labelText}
        </label>
      )}
      <textarea
        {...props}
        className={clsx(
          'w-full',
          'bg-white/5',
          'border border-white/10',
          'rounded-lg',
          'px-3.5 py-3',
          'text-slate-200',
          'placeholder:text-slate-500',
          'outline-none',
          'transition',
          'focus:border-blue-500',
          'focus:bg-white/10',
          'resize-none',
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
