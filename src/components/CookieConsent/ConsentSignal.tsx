'use client';
import { useLayoutEffect, useRef } from 'react';
import { CONSENT_DEFAULT, gtag, toConsentModeState } from '@/lib/consent/gtag';

type ConsentSignalProps = {
  analytics: boolean;
  marketing: boolean;
};

// Envia o Consent Mode ao dataLayer antes do GTM iniciar.
// O `default` vai uma única vez por carregamento; o `update`, a cada mudança.
export function ConsentSignal({ analytics, marketing }: ConsentSignalProps) {
  const defaultSent = useRef(false);
  const lastSent = useRef('');

  useLayoutEffect(() => {
    if (!defaultSent.current) {
      gtag('consent', 'default', CONSENT_DEFAULT);
      defaultSent.current = true;
    }
    // evita repetir o mesmo update (ex.: reexecução do StrictMode em dev)
    const key = `${analytics}-${marketing}`;
    if (lastSent.current === key) return;
    lastSent.current = key;
    gtag('consent', 'update', toConsentModeState({ analytics, marketing }));
  }, [analytics, marketing]);

  return null;
}
