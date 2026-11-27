'use client';
import { openCookiePreferences } from '@/lib/consent/open-preferences';

type CookiePreferencesButtonProps = Omit<
  React.ComponentProps<'button'>,
  'type' | 'onClick'
>;

export function CookiePreferencesButton(props: CookiePreferencesButtonProps) {
  return <button {...props} type='button' onClick={openCookiePreferences} />;
}
