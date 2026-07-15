import { Container } from '@/components/Container';
import { Contact } from '@/components/landing/Contact';
import { SocialMedias } from '@/components/SocialMedias';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contato',
};

export default function ContactPage() {
  return (
    <Container as='main'>
      <div className='flex min-h-dvh flex-col items-center justify-center gap-8 pt-24 pb-8 md:pt-24'>
        <Contact />
        <SocialMedias />
      </div>
    </Container>
  );
}
