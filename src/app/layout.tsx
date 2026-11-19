import type { Metadata } from 'next';
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ToastifyContainer } from '@/ToastifyContainer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

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

export const metadata: Metadata = {
  title: {
    default: 'UAIExplorer',
    template: '%s | UAIExplorer',
  },
  description:
    'UAIExplorer — desenvolvimento de landing pages, e-commerces e plataformas web sob medida, com design focado em conversão e SEO.',
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
