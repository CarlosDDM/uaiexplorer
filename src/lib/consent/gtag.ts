import type { ConsentChoice } from './consent-store';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// O GTM só reconhece comandos `consent` quando recebe o objeto `arguments`
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- os parâmetros só documentam a assinatura
export function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params -- o GTM exige o objeto arguments
  window.dataLayer.push(arguments);
}

type ConsentValue = 'granted' | 'denied';

export const CONSENT_DEFAULT = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
} as const;

export function toConsentModeState({ analytics, marketing }: ConsentChoice) {
  const value = (on: boolean): ConsentValue => (on ? 'granted' : 'denied');
  return {
    analytics_storage: value(analytics),
    ad_storage: value(marketing),
    ad_user_data: value(marketing),
    ad_personalization: value(marketing),
  };
}

// Apaga cookies do Google no host atual e no domínio pai (sem www)
export function clearGoogleCookies() {
  const host = window.location.hostname;
  const parent = `.${host.replace(/^www\./, '')}`;
  const names = document.cookie
    .split(';')
    .map(cookie => cookie.split('=')[0].trim())
    .filter(name => name === '_ga' || name === '_gcl_au' || /^_ga_/.test(name));

  for (const name of names) {
    const base = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    document.cookie = base;
    document.cookie = `${base}; domain=${host}`;
    document.cookie = `${base}; domain=${parent}`;
  }
}
