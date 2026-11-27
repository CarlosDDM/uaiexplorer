'use client';
import clsx from 'clsx';
import { useId, type Ref } from 'react';
import { Button } from '@/components/Button';
import type { ConsentChoice } from '@/lib/consent/consent-store';

type PreferencesDialogProps = {
  ref: Ref<HTMLDialogElement>;
  draft: ConsentChoice;
  onChange: (next: ConsentChoice) => void;
  onSave: () => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
};

type CategoryRowProps = {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onToggle?: () => void;
};

function CategoryRow({
  title,
  description,
  checked,
  disabled,
  onToggle,
}: CategoryRowProps) {
  const labelId = useId();
  const descId = useId();

  return (
    <li className='flex items-start justify-between gap-4 rounded-lg border border-solid border-border-card bg-background-navy/60 p-4'>
      <div className='flex flex-col gap-1'>
        <span id={labelId} className='font-semibold text-indigo-50'>
          {title}
        </span>
        <span id={descId} className='text-sm leading-relaxed text-indigo-300'>
          {description}
        </span>
      </div>
      <button
        type='button'
        role='switch'
        aria-checked={checked}
        aria-labelledby={labelId}
        aria-describedby={descId}
        disabled={disabled}
        onClick={onToggle}
        className={clsx(
          'relative mt-0.5 h-7 w-12 shrink-0 cursor-pointer rounded-full border border-solid border-border-card',
          'transition-colors duration-200 motion-reduce:transition-none',
          checked ? 'bg-button-default' : 'bg-background-black-default',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button-default/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:cursor-not-allowed disabled:opacity-60',
        )}
      >
        <span
          aria-hidden
          className={clsx(
            'absolute top-0.5 left-0.5 h-5.5 w-5.5 rounded-full bg-indigo-50',
            'transition-transform duration-200 motion-reduce:transition-none',
            checked && 'translate-x-5',
          )}
        />
      </button>
    </li>
  );
}

export function PreferencesDialog({
  ref,
  draft,
  onChange,
  onSave,
  onAcceptAll,
  onRejectAll,
}: PreferencesDialogProps) {
  const titleId = useId();

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      // clique no fundo escurecido fecha o painel
      onClick={event => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      className={clsx(
        'm-auto max-h-[90svh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-xl p-0',
        'border border-solid border-border-card bg-background-card text-indigo-50 shadow-2xl',
        'backdrop:bg-black/70',
      )}
    >
      <div className='flex flex-col gap-5 p-5 md:p-6'>
        <div className='flex flex-col gap-2'>
          <h2 id={titleId} className='text-xl font-bold text-indigo-50'>
            Preferências de cookies
          </h2>
          <p className='text-sm leading-relaxed text-indigo-300'>
            Escolha o que podemos usar. Você pode mudar de ideia quando quiser.
          </p>
        </div>

        <ul role='list' className='flex flex-col gap-3'>
          <CategoryRow
            title='Essenciais'
            description='Guardam a sua escolha de cookies neste navegador. Estão sempre ativos.'
            checked
            disabled
          />
          <CategoryRow
            title='Estatísticas'
            description='Nos ajudam a entender como o site é usado, para melhorá-lo (Google Analytics, via Google Tag Manager).'
            checked={draft.analytics}
            onToggle={() => onChange({ ...draft, analytics: !draft.analytics })}
          />
          <CategoryRow
            title='Marketing'
            description='Medem a eficácia de anúncios e permitem personalização de anúncios do Google.'
            checked={draft.marketing}
            onToggle={() => onChange({ ...draft, marketing: !draft.marketing })}
          />
        </ul>

        <div className='flex flex-col gap-2'>
          <Button onClick={onSave}>Salvar preferências</Button>
          <div className='grid grid-cols-2 gap-2'>
            <Button variant='transparent' onClick={onAcceptAll}>
              Aceitar todos
            </Button>
            <Button variant='transparent' onClick={onRejectAll}>
              Recusar todos
            </Button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
