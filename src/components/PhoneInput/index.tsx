'use client';
import { GenericInput } from '../GenericInput';
import { phoneMask } from '@/utils/masks/phone-mask';

type PhoneInputProps = {
  labelText?: string;
} & Omit<React.ComponentProps<'input'>, 'type'>;

export function PhoneInput({
  labelText,
  defaultValue = '',
  onChange,
  ...props
}: PhoneInputProps) {
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.currentTarget.value = phoneMask(e.currentTarget.value);
    onChange?.(e);
  }
  return (
    <GenericInput
      pattern='\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}'
      placeholder='(31) 99999-9999'
      maxLength={15}
      inputMode='numeric'
      autoComplete='tel-national'
      labelText={labelText}
      {...props}
      type='tel'
      defaultValue={phoneMask(String(defaultValue))}
      onChange={handleOnChange}
    />
  );
}
