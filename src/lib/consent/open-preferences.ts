export const OPEN_PREFERENCES_EVENT = 'uai:abrir-preferencias-cookies';

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}
