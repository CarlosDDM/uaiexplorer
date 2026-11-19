'use client';
import { useState } from 'react';
import { GenericInput } from '../GenericInput';
import { phoneMask } from '@/utils/masks/phone-mask';

type PhoneInputProps = {
  labelText?: string;
} & Omit<React.ComponentProps<'input'>, 'type'>;

export function PhoneInput({
  labelText,
  defaultValue = '',
  ...props
}: PhoneInputProps) {
  const [phone, setPhone] = useState(() => phoneMask(String(defaultValue)));
  const [prevDefaultValue, setPrevDefaultValue] = useState(defaultValue);

  if (defaultValue !== prevDefaultValue) {
    setPrevDefaultValue(defaultValue);
    setPhone(phoneMask(String(defaultValue)));
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(phoneMask(e.target.value));
  }
  return (
    <GenericInput
      pattern='\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}'
      placeholder='(31) 99999-9999'
      labelText={labelText}
      {...props}
      type='tel'
      value={phone}
      onChange={handleOnChange}
    />
  );
}
