import clsx from 'clsx';
import { Container } from '../Container';
import { GenericSection } from '../GenericSection';
import { LinkButton } from '../Link';
import { IconType } from 'react-icons';

type CardServicesProps = {
  title: string;
  content: string;
  href: string;
  buttonDescription: string;
  icon: IconType;
};

export function CardServices({
  buttonDescription,
  content,
  href,
  icon: Icon,
  title,
}: CardServicesProps) {
  return (
    <Container>
      <div
        className={clsx(
          'flex flex-col justify-center items-center',
          'border border-border-card border-solid rounded',
          'shadow-md shadow-border-card',
          'bg-background-card backdrop-blur-sm',
          'px-2 py-4',
          'max-w-80 md:min-w-80 min-h-85',
          'hover:border-border-card-hover hover:shadow-lg hover:shadow-shadow-card-hover',
          'transition-all',
          'select-none',
        )}
      >
        <div
          className={clsx(
            'self-start',
            '[&>svg]:w-6 [&>svg]:h-6',
            'md:[&>svg]:w-8 md:[&>svg]:h-8',
            'border p-3 rounded-full',
            'border-border-card border-solid',
            'shadow-md shadow-border-card',
            'bg-background-card',
          )}
        >
          <Icon />
        </div>
        <GenericSection
          title={title}
          content={content}
          titleAs='h3'
          className='text-left'
        >
          <LinkButton variant='default' href={href}>
            {buttonDescription}
          </LinkButton>
        </GenericSection>
      </div>
    </Container>
  );
}
