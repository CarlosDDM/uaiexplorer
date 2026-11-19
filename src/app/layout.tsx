import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ToastifyContainer } from '@/ToastifyContainer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

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
    <html lang='pt-BR' data-scroll-behavior='smooth'>
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
