import { Contact } from '@/components/landing/Contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Solicite um orçamento ou tire dúvidas sobre seu projeto digital pelo formulário de contato ou direto pelo WhatsApp.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <main className='mx-auto min-h-svh w-full max-w-6xl px-4 pt-32 pb-20'>
      <Contact titleAs='h1' />
    </main>
  );
}
