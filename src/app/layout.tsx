import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ToastifyContainer } from '@/ToastifyContainer';

export const metadata: Metadata = {
  title: {
    default: 'UAIExplorer',
    template: '%s | UAIExplorer',
  },
  description: '...',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang='pt-BR'>
      <body>
        <Header />
        {children}
        <Footer />
        <ToastifyContainer />
      </body>
    </html>
  );
}
