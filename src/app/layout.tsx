import type { Metadata } from 'next';
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ToastifyContainer } from '@/ToastifyContainer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { HERO_BG_URL } from '@/utils/constants/image-constants';
import { SITE_NAME, SITE_URL } from '@/utils/constants/site-constants';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});

const instrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

const SITE_DESCRIPTION =
  'UAIExplorer — desenvolvimento de landing pages, e-commerces e plataformas web sob medida, com design focado em conversão e SEO.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: HERO_BG_URL,
        width: 1200,
        height: 630,
        alt: 'UAIExplorer — Desenvolvimento Web, Design e SEO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [HERO_BG_URL],
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html
      lang='pt-BR'
      data-scroll-behavior='smooth'
      className={`${bricolage.variable} ${instrument.variable}`}
    >
      <body>
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
        <ToastifyContainer />
      </body>
    </html>
  );
}
