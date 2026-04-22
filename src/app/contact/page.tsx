import { Container } from '@/components/Container';
import { Contact } from '@/components/landing/Contact';
import { SocialMedias } from '@/components/SocialMedias';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contato',
};

export default function ContactPage() {
  return (
    <Container>
      <div className='min-h-dvh flex flex-col justify-center items-center mt-20 md:mt-16'>
        <Contact />
        <SocialMedias />
      </div>
    </Container>
  );
}
