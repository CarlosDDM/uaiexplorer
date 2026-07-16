export type ServiceFeature = {
  title: string;
  content: string;
};

export type ServiceDetail = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: ServiceFeature[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    id: 'desenvolvimento',
    title: 'Desenvolvimento',
    subtitle: 'A engenharia de soluções únicas.',
    description:
      'Diferente de usar softwares prontos que forçam sua empresa a se adaptar a eles, o desenvolvimento personalizado inverte essa lógica: a tecnologia é construída para servir ao seu processo. É a criação de ecossistemas digitais onde cada funcionalidade existe por um motivo estratégico.',
    features: [
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
    ],
  },
  {
    id: 'design-de-websites',
    title: 'Web Design',
    subtitle: 'A arquitetura visual e funcional da sua presença online.',
    description:
      'Não se trata apenas de "fazer um site bonito", mas de projetar um ambiente digital que traduza os valores da empresa e guie o visitante de forma intuitiva. É a combinação de psicologia das cores, tipografia e layout para criar uma interface atraente e eficiente.',
    features: [
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
    ],
  },
  {
    id: 'seo',
    title: 'SEO',
    subtitle: 'A estratégia de encontro.',
    description:
      'SEO (Otimização para Motores de Busca) é a ciência de tornar o seu site legível e relevante para os algoritmos de busca. Enquanto o design cuida de quem já chegou, o SEO foca em trazer as pessoas certas até você de forma orgânica — sem pagar por anúncios.',
    features: [
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
    ],
  },
];
