export const CONSENT_STORAGE_KEY = 'uai-cookie-consent';
const CONSENT_CHANGE_EVENT = 'uai:consentimento-alterado';
const CONSENT_VERSION = 1;

export type ConsentChoice = {
  analytics: boolean;
  marketing: boolean;
};

export type StoredConsent = ConsentChoice & {
  version: number;
  updatedAt: string;
};

// undefined = servidor (ainda não sabemos); null = sem escolha salva
export type ConsentSnapshot = StoredConsent | null | undefined;

function parseConsent(raw: string | null): StoredConsent | null {
  if (!raw) return null;
  try {
    const data: unknown = JSON.parse(raw);
    if (typeof data !== 'object' || data === null) return null;
    const { version, analytics, marketing, updatedAt } = data as Record<
      string,
      unknown
    >;
    if (
      version !== CONSENT_VERSION ||
      typeof analytics !== 'boolean' ||
      typeof marketing !== 'boolean' ||
      typeof updatedAt !== 'string'
    ) {
      return null;
    }
    return { version, analytics, marketing, updatedAt };
  } catch {
    return null;
  }
}

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

// useSyncExternalStore exige a mesma referência enquanto o valor não muda
let cachedRaw: string | null = null;
let cachedValue: StoredConsent | null = null;

export function getConsentSnapshot(): ConsentSnapshot {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedValue = parseConsent(raw);
  }
  return cachedValue;
}

export function getServerConsentSnapshot(): ConsentSnapshot {
  return undefined;
}

export function subscribeConsent(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === CONSENT_STORAGE_KEY) onChange();
  };
  window.addEventListener('storage', onStorage);
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  };
}

export function saveConsent({ analytics, marketing }: ConsentChoice) {
  const value: StoredConsent = {
    version: CONSENT_VERSION,
    analytics,
    marketing,
    updatedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // storage bloqueado: a escolha vale só até recarregar
  }
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}
