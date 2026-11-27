import { LinkButton } from '@/components/Link';

export default function NotFound() {
  return (
    <main className='mx-auto flex min-h-svh w-full max-w-4xl flex-col items-center justify-center px-4 pt-24 pb-16 text-center'>
      <span className='rounded-full border border-border-card bg-background-card/80 px-4 py-1 text-xs font-semibold tracking-widest text-button-default'>
        404
      </span>

      <h1 className='mt-6 font-display text-3xl font-bold tracking-tight text-balance text-indigo-50 md:text-5xl'>
        Página não encontrada
      </h1>

      <p className='mt-4 max-w-md text-base leading-relaxed text-indigo-200 md:text-lg'>
        O endereço que você acessou não existe ou foi movido. Que tal voltar
        para o início ou falar direto com a nossa equipe?
      </p>

      <div className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row'>
        <LinkButton href='/'>Voltar para o início</LinkButton>
        <LinkButton href='/contact' variant='transparent'>
          Fale com a gente
        </LinkButton>
      </div>
    </main>
  );
}
