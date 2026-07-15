import { Container } from '@/components/Container';
import { GenericSection } from '@/components/GenericSection';

export default function InfoPage() {
  return (
    <Container as='main' className='px-8'>
      <div className='min-h-dvh mt-20 flex flex-col gap-12 pb-20'>
        <GenericSection
          className='scroll-mt-20'
          id='design-de-websites'
          title='Web Design'
          content={
            <p className='text-indigo-200 leading-relaxed max-w-3xl'>
              A arquitetura visual e funcional da sua presença online.
            </p>
          }
        />

        <p className='text-indigo-200 leading-relaxed'>
          Não se trata apenas de &ldquo;fazer um site bonito&rdquo;, mas de
          projetar um
          ambiente digital que traduza os valores da empresa e guie o visitante
          de forma intuitiva. É a combinação de psicologia das cores, tipografia
          e layout para criar uma interface atraente e eficiente.
        </p>

        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[
            {
              title: 'Primeira Impressão',
              content:
                'Em segundos, o design comunica se a empresa é moderna, confiável ou autoritária. É o "rosto" que define a credibilidade inicial.',
            },
            {
              title: 'Usabilidade (UX)',
              content:
                'Um bom design garante que o usuário não precise pensar para navegar. Se a informação é difícil de achar, o cliente vai embora.',
            },
            {
              title: 'Responsividade',
              content:
                'A capacidade do site se adaptar perfeitamente a qualquer tela, mantendo a qualidade da experiência.',
            },
          ].map(item => (
            <li
              key={item.title}
              className='flex flex-col gap-2 border border-white/10 bg-white/5 rounded-lg px-4 py-4'
            >
              <h3 className='font-semibold text-indigo-50'>{item.title}</h3>
              <p className='text-indigo-300 text-sm leading-relaxed'>
                {item.content}
              </p>
            </li>
          ))}
        </ul>
        <div className='h-px bg-white/10' />

        <div className='flex flex-col gap-12 pb-20'>
          <GenericSection
            className='scroll-mt-20'
            id='seo'
            title='SEO'
            content={
              <p className='text-indigo-200 leading-relaxed max-w-3xl'>
                A estratégia de encontro.
              </p>
            }
          />

          <p className='text-indigo-200 leading-relaxed'>
            SEO (Otimização para Motores de Busca) é a ciência de tornar o seu
            site legível e relevante para os algoritmos de busca. Enquanto o
            design cuida de quem já chegou, o SEO foca em trazer as pessoas
            certas até você de forma orgânica — sem pagar por anúncios.
          </p>

          <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[
              {
                title: 'Relevância de Conteúdo',
                content:
                  'O SEO identifica quais termos e dúvidas o seu público-alvo tem e garante que o seu site responda a essas perguntas com autoridade.',
              },
              {
                title: 'Autoridade Digital',
                content:
                  'Através de links e menções em outros sites, o SEO constrói a reputação da sua marca na web, sinalizando ao Google que você é uma referência no setor.',
              },
              {
                title: 'Otimização Técnica',
                content:
                  'Velocidade de carregamento, organização de código e segurança. Um site rápido e seguro não só agrada o usuário, mas é ativamente impulsionado pelos buscadores.',
              },
            ].map(item => (
              <li
                key={item.title}
                className='flex flex-col gap-2 border border-white/10 bg-white/5 rounded-lg px-4 py-4'
              >
                <h3 className='font-semibold text-indigo-50'>{item.title}</h3>
                <p className='text-indigo-300 text-sm leading-relaxed'>
                  {item.content}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className='h-px bg-white/10' />

        <GenericSection
          className='scroll-mt-20'
          id='desenvolvimento'
          title='Desenvolvimento'
          content={
            <p className='text-indigo-200 leading-relaxed max-w-3xl'>
              A engenharia de soluções únicas.
            </p>
          }
        />

        <p className='text-indigo-200 leading-relaxed'>
          Diferente de usar softwares prontos que forçam sua empresa a se
          adaptar a eles, o desenvolvimento personalizado inverte essa lógica: a
          tecnologia é construída para servir ao seu processo. É a criação de
          ecossistemas digitais onde cada funcionalidade existe por um motivo
          estratégico.
        </p>

        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[
            {
              title: 'Autonomia e Controle',
              content:
                'Ao criar uma ferramenta própria, você detém controle total sobre como os dados são manipulados. Isso elimina a dependência de plataformas de terceiros e suas limitações.',
            },
            {
              title: 'Eficiência Operacional',
              content:
                'Ferramentas personalizadas eliminam o excesso de cliques e funções inúteis, automatizando tarefas repetitivas específicas do seu dia a dia.',
            },
            {
              title: 'Escalabilidade Real',
              content:
                'Um sistema sob medida evolui junto com a empresa, permitindo adições de recursos e integrações complexas sempre que necessário.',
            },
            {
              title: 'Segurança e Centralização',
              content:
                'Permite criar camadas de segurança específicas para a sensibilidade dos seus dados, centralizando informações que antes ficariam espalhadas em diversas planilhas ou apps.',
            },
          ].map(item => (
            <li
              key={item.title}
              className='flex flex-col gap-2 border border-white/10 bg-white/5 rounded-lg px-4 py-4'
            >
              <h3 className='font-semibold text-indigo-50'>{item.title}</h3>
              <p className='text-indigo-300 text-sm leading-relaxed'>
                {item.content}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
