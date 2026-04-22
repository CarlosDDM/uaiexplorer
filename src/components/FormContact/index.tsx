'use client';

import clsx from 'clsx';
import { GenericInput } from '../GenericInput';
import { PhoneInput } from '../PhoneInput';
import { TextareaInput } from '../TextareaInput';
import { Button } from '../Button';
import { useActionState, useEffect } from 'react';
import { FormAction } from '@/actions/form-action';
import { InitialFormData } from '@/lib/form/schema-form';
import { toastMessage } from '@/adapters/toast-adapter';

export function FormContact() {
  const [state, action, isPending] = useActionState(FormAction, {
    formState: InitialFormData.parse({}),
    errors: [],
    success: false,
  });

  const { formState } = state;

  useEffect(() => {
    if (state.errors.length > 0) {
      toastMessage.dismiss();
      state.errors.forEach(error => {
        toastMessage.error(error);
      });
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.success) {
      toastMessage.dismiss();
      toastMessage.success('Menssagem enviada com successo');
    }
  }, [state.success]);

  return (
    <div>
      <form
        action={action}
        className={clsx(
          'flex flex-col px-4 py-2 gap-4 items-center justify-center',
          'max-w-md md:max-w-2xl mx-auto w-full',
          '[&>div]:w-full',
        )}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
          <GenericInput
            labelText='Nome'
            placeholder='Digite o seu nome'
            type='text'
            name='name'
            defaultValue={formState.name}
            required
          />
          <PhoneInput
            labelText='Telefone'
            name='phone'
            defaultValue={formState.phone}
          />
        </div>
        <GenericInput
          labelText='E-mail'
          placeholder='Digite o e-mail'
          type='email'
          name='email'
          defaultValue={formState.email}
          required
        />

        <TextareaInput
          labelText='Mensagem'
          placeholder='Digite sua mensagem'
          name='message'
          defaultValue={formState.message}
          required
        />

        <Button type='submit'>Enviar</Button>
      </form>
    </div>
  );
}
