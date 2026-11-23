'use client';

import clsx from 'clsx';
import { GenericInput } from '../GenericInput';
import { PhoneInput } from '../PhoneInput';
import { TextareaInput } from '../TextareaInput';
import { Button } from '../Button';
import { useActionState, useEffect } from 'react';
import {
  submitContactForm,
  type ContactFormState,
} from '@/lib/form/submit-contact-form';
import { InitialFormData } from '@/lib/form/schema-form';
import { toastMessage } from '@/adapters/toast-adapter';

export function FormContact() {
  const [state, action, isPending] = useActionState(submitContactForm, {
    formState: InitialFormData.parse({}),
    errors: [],
    success: false,
  } satisfies ContactFormState);

  const { formState } = state;

  // Depende do state inteiro: useActionState gera um objeto novo a cada envio,
  // então dois sucessos seguidos também disparam o toast.
  useEffect(() => {
    if (state.errors.length > 0) {
      toastMessage.dismiss();
      state.errors.forEach(error => {
        toastMessage.error(error);
      });
    } else if (state.success) {
      toastMessage.dismiss();
      toastMessage.success('Mensagem enviada com sucesso');
    }
  }, [state]);

  return (
    <div>
      <form
        action={action}
        className={clsx(
          'flex flex-col py-2 gap-4 justify-center',
          'max-w-md md:max-w-2xl mx-auto w-full',
          '[&>div]:w-full relative',
        )}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
          <GenericInput
            labelText='Nome'
            placeholder='Seu nome'
            type='text'
            name='name'
            minLength={3}
            maxLength={30}
            defaultValue={formState.name}
            required
          />
          <PhoneInput
            labelText='Telefone (opcional)'
            name='phone'
            defaultValue={formState.phone}
          />
        </div>
        <GenericInput
          labelText='E-mail'
          placeholder='voce@empresa.com.br'
          type='email'
          name='email'
          defaultValue={formState.email}
          required
        />

        <TextareaInput
          labelText='Mensagem'
          placeholder='Conte um pouco sobre o seu projeto'
          name='message'
          rows={5}
          minLength={10}
          maxLength={200}
          defaultValue={formState.message}
          required
        />

        {/* honeypot: fora da tela, bots preenchem; a API descarta se vier preenchido */}
        <div
          aria-hidden='true'
          inert
          className='absolute -left-[9999px] w-px h-px overflow-hidden'
        >
          <label htmlFor='contact_url'>Site</label>
          <input
            id='contact_url'
            type='text'
            name='contact_url'
            tabIndex={-1}
            autoComplete='off'
            defaultValue=''
          />
        </div>

        <Button
          type='submit'
          disabled={isPending}
          aria-busy={isPending}
          className='w-full max-w-none'
        >
          {isPending ? 'Enviando…' : 'Enviar mensagem'}
        </Button>
      </form>
    </div>
  );
}
