'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
import { Button } from '@/components/Button';
import {
  getConsentSnapshot,
  getServerConsentSnapshot,
  saveConsent,
  subscribeConsent,
  type ConsentChoice,
} from '@/lib/consent/consent-store';
import { OPEN_PREFERENCES_EVENT } from '@/lib/consent/open-preferences';
import {
  clearGoogleCookies,
  gtag,
  toConsentModeState,
} from '@/lib/consent/gtag';
import { GTM_ID } from '@/utils/constants/site-constants';
import { ConsentSignal } from './ConsentSignal';
import { PreferencesDialog } from './PreferencesDialog';

const ACCEPT_ALL: ConsentChoice = { analytics: true, marketing: true };
const REJECT_ALL: ConsentChoice = { analytics: false, marketing: false };

export function CookieConsent() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState<ConsentChoice>(REJECT_ALL);

  // Sempre lê o valor mais recente sem recriar o listener do evento
  const consentRef = useRef(consent);
  useEffect(() => {
    consentRef.current = consent;
  }, [consent]);

  useEffect(() => {
    const open = () => {
      const current = consentRef.current;
      setDraft(
        current
          ? { analytics: current.analytics, marketing: current.marketing }
          : REJECT_ALL,
      );
      const dialog = dialogRef.current;
      if (dialog && !dialog.open) dialog.showModal();
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, open);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, open);
  }, []);

  function save(next: ConsentChoice) {
    const prev = consent;
    const revokes =
      !!prev &&
      ((prev.analytics && !next.analytics) ||
        (prev.marketing && !next.marketing));

    if (revokes) {
      // GTM já carregado: só recarregar tira o Google da página de vez
      gtag('consent', 'update', toConsentModeState(next));
      clearGoogleCookies();
      saveConsent(next);
      window.location.reload();
      return;
    }

    saveConsent(next);
    dialogRef.current?.close();
  }

  function openFromBanner() {
    setDraft(REJECT_ALL);
    dialogRef.current?.showModal();
  }

  const showBanner = consent === null;
  const loadGtm = !!consent && (consent.analytics || consent.marketing);

  return (
    <>
      {loadGtm && (
        <>
          {/* vem antes do GTM: o layout effect roda antes de qualquer script */}
          <ConsentSignal
            analytics={consent.analytics}
            marketing={consent.marketing}
          />
          <GoogleTagManager gtmId={GTM_ID} />
        </>
      )}

      {showBanner && (
        <div
          role='region'
          aria-label='Aviso de cookies'
          className={clsx(
            'fixed inset-x-0 bottom-0 z-100',
            'pb-0 md:px-4 md:pb-6',
            'pointer-events-none',
          )}
        >
          <div
            className={clsx(
              'pointer-events-auto mx-auto flex max-w-3xl flex-col gap-3 rounded-t-xl p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:gap-6 md:rounded-xl md:p-5',
              'border border-solid border-border-card bg-background-card/95 shadow-2xl shadow-black/50 backdrop-blur-md',
              'md:flex-row md:items-center md:gap-6',
              'motion-safe:animate-banner-in',
            )}
          >
            <p className='text-[13px] leading-snug text-indigo-200 md:flex-1 md:text-sm md:leading-relaxed'>
              Usamos armazenamento essencial para o site funcionar e, com a sua
              permissão, cookies de estatística e marketing carregados pelo
              Google Tag Manager.{' '}
              <Link
                href='/privacidade'
                className='text-button-default underline underline-offset-2 hover:text-indigo-50'
              >
                Política de privacidade
              </Link>
              .
            </p>
            <div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2 md:shrink-0'>
              <div className='grid grid-cols-2 gap-2 sm:flex'>
                <Button
                  sizes='md'
                  className='sm:min-w-28'
                  onClick={() => save(ACCEPT_ALL)}
                >
                  Aceitar
                </Button>
                <Button
                  sizes='md'
                  className='sm:min-w-28'
                  onClick={() => save(REJECT_ALL)}
                >
                  Recusar
                </Button>
              </div>
              <button
                type='button'
                onClick={openFromBanner}
                className={clsx(
                  'min-h-10 cursor-pointer text-sm text-indigo-200 underline underline-offset-2 hover:text-indigo-50',
                  'sm:min-h-0 sm:rounded-md sm:border sm:border-solid sm:border-button-default sm:px-4 sm:py-2 sm:text-base/tight sm:font-medium sm:text-white sm:no-underline sm:hover:bg-button-transparent-hover',
                  'rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button-default/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                )}
              >
                Personalizar
              </button>
            </div>
          </div>
        </div>
      )}

      <PreferencesDialog
        ref={dialogRef}
        draft={draft}
        onChange={setDraft}
        onSave={() => save(draft)}
        onAcceptAll={() => save(ACCEPT_ALL)}
        onRejectAll={() => save(REJECT_ALL)}
      />
    </>
  );
}
