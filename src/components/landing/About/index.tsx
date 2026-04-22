import { Container } from '@/components/Container';
import { GenericSection } from '@/components/GenericSection';

export function About() {
  return (
    <Container>
      <GenericSection
        className='text-center'
        title='Somos uma equipe apaixonada por tecnologia e inovação.'
        content={
          <div className='flex flex-col items-center gap-8 mt-4'>
            <p className='text-indigo-300 max-w-2xl text-lg leading-relaxed'>
              Ajudamos empresas e empreendedores a escalar seus negócios através
              de soluções web modernas, rápidas e pensadas exclusivamente para
              cada necessidade.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl text-left'>
              <div className='flex flex-col gap-2'>
                <span className='text-blue-400 text-2xl font-bold'>01</span>
                <h3 className='text-indigo-50 font-semibold'>Missão</h3>
                <p className='text-indigo-300 text-sm leading-relaxed'>
                  Capacitar nossos clientes com sistemas robustos e soluções
                  digitais que geram eficiência e resultados reais.
                </p>
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-blue-400 text-2xl font-bold'>02</span>
                <h3 className='text-indigo-50 font-semibold'>Abordagem</h3>
                <p className='text-indigo-300 text-sm leading-relaxed'>
                  Não entregamos pacotes prontos. Mergulhamos no seu negócio
                  para desenhar a estratégia e a arquitetura ideais para o seu
                  momento.
                </p>
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-blue-400 text-2xl font-bold'>03</span>
                <h3 className='text-indigo-50 font-semibold'>Tecnologia</h3>
                <p className='text-indigo-300 text-sm leading-relaxed'>
                  Desenvolvemos com o que há de mais atual no mercado para
                  garantir plataformas ágeis, seguras e prontas para escalar.
                </p>
              </div>
            </div>

            <p className='text-sm/tight md:text-lg mt-8 text-indigo-200 max-w-4xl'>
              Acreditamos que a tecnologia deve ser um acelerador, não um
              obstáculo. Nossa equipe trabalha para transformar requisitos
              complexos em produtos digitais sólidos, cuidando de toda a jornada
              técnica para que você possa focar no que realmente importa: o
              crescimento da sua empresa.
            </p>
          </div>
        }
      />
    </Container>
  );
}
