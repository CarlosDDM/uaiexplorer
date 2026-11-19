type FormContactHeaderProps = {
  headingAs: 'h2' | 'h3';
};

export function FormContactHeader({
  headingAs: Heading,
}: FormContactHeaderProps) {
  return (
    <div className='mb-4'>
      <Heading className='text-xl font-semibold text-indigo-50'>
        Envie uma mensagem
      </Heading>
      <p className='mt-1 text-sm text-indigo-300'>Respondemos em até 24h.</p>
    </div>
  );
}
