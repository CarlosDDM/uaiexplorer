import clsx from 'clsx';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CookiePreferencesButton } from '@/components/CookiePreferencesButton';
import { getWhatsAppLink } from '@/utils/constants/contact-constants';
import { SOCIAL_LINKS } from '@/utils/constants/social-constants';

export const metadata: Metadata = {
  title: 'Política de privacidade',
  description:
    'Saiba quais dados a UAI Explorer coleta, para quê usamos, como funcionam os cookies e como exercer seus direitos pela LGPD.',
  alternates: {
    canonical: '/privacidade',
  },
};

const INSTAGRAM_URL =
  SOCIAL_LINKS.find(({ label }) => label === 'Instagram')?.href ??
  'https://www.instagram.com/uai_explorer';

const linkStyle = clsx(
  'text-button-default underline underline-offset-2 transition-colors hover:text-indigo-50',
  'rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button-default',
);

const SECTIONS = [
  { id: 'quem-somos', title: 'Quem somos' },
  { id: 'dados-coletados', title: 'Dados que coletamos' },
  { id: 'finalidades', title: 'Finalidades e bases legais' },
  { id: 'cookies', title: 'Cookies e Google Tag Manager' },
  { id: 'compartilhamento', title: 'Compartilhamento' },
  { id: 'transferencia-internacional', title: 'Transferência internacional' },
  { id: 'retencao', title: 'Por quanto tempo guardamos' },
  { id: 'direitos', title: 'Seus direitos' },
  { id: 'seguranca', title: 'Segurança' },
  { id: 'alteracoes', title: 'Alterações desta política' },
] as const;

type SectionId = (typeof SECTIONS)[number]['id'];

function PolicySection({
  id,
  index,
  children,
}: {
  id: SectionId;
  index: number;
  children: React.ReactNode;
}) {
  const title = SECTIONS[index].title;
  const headingId = `${id}-titulo`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className='flex scroll-mt-24 flex-col gap-4'
    >
      <h2
        id={headingId}
        className='text-2xl leading-tight font-bold tracking-tight text-balance text-indigo-50'
      >
        {index + 1}. {title}
      </h2>
      {children}
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className='leading-relaxed text-indigo-200'>{children}</p>;
}

function List({ children }: { children: React.ReactNode }) {
  return (
    <ul
      role='list'
      className='flex list-disc flex-col gap-2 pl-6 leading-relaxed text-indigo-200 marker:text-button-default'
    >
      {children}
    </ul>
  );
}

const COOKIE_ROWS = [
  {
    category: 'Essenciais',
    examples: 'uai-cookie-consent (armazenamento local)',
    purpose: 'Guarda a sua escolha sobre cookies.',
    duration: 'Até você mudar a escolha ou limpar o navegador.',
  },
  {
    category: 'Estatísticas',
    examples: '_ga e _ga_<ID>',
    purpose:
      'Distinguir visitantes e manter o estado da sessão no Google Analytics.',
    duration: 'Até 2 anos.',
  },
  {
    category: 'Marketing',
    examples: '_gcl_au',
    purpose: 'Mensurar conversões de anúncios do Google.',
    duration: 'Até 90 dias.',
  },
];

const COLUMNS = [
  ['category', 'Categoria'],
  ['examples', 'Exemplos'],
  ['purpose', 'Finalidade'],
  ['duration', 'Duração'],
] as const;

function CookieTable() {
  return (
    <>
      {/* a partir de sm: tabela */}
      <div className='hidden overflow-x-auto rounded-xl border border-solid border-border-card sm:block'>
        <table className='w-full min-w-xl border-collapse text-left text-sm'>
          <caption className='sr-only'>Cookies usados pelo site</caption>
          <thead className='bg-background-card text-indigo-50'>
            <tr>
              {COLUMNS.map(([key, label]) => (
                <th key={key} scope='col' className='px-4 py-3 font-semibold'>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='text-indigo-200'>
            {COOKIE_ROWS.map(row => (
              <tr key={row.category} className='border-t border-border-card'>
                <th
                  scope='row'
                  className='px-4 py-3 align-top font-semibold text-indigo-50'
                >
                  {row.category}
                </th>
                <td className='px-4 py-3 align-top'>{row.examples}</td>
                <td className='px-4 py-3 align-top'>{row.purpose}</td>
                <td className='px-4 py-3 align-top'>{row.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* abaixo de sm: cards empilhados */}
      <ul role='list' className='flex flex-col gap-3 sm:hidden'>
        {COOKIE_ROWS.map(row => (
          <li
            key={row.category}
            className='flex flex-col gap-2 rounded-xl border border-solid border-border-card bg-background-card/60 p-4'
          >
            <h3 className='font-semibold text-indigo-50'>{row.category}</h3>
            <dl className='flex flex-col gap-2 text-sm text-indigo-200'>
              {COLUMNS.slice(1).map(([key, label]) => (
                <div key={key}>
                  <dt className='text-indigo-300'>{label}</dt>
                  <dd>{row[key]}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function PrivacyPage() {
  return (
    <main className='mx-auto min-h-svh w-full max-w-3xl px-4 pt-32 pb-20'>
      <h1
        className={clsx(
          'mb-4 text-4xl leading-[1.1] font-bold tracking-tight text-balance md:text-6xl',
          'bg-gradient-to-b from-indigo-50 to-indigo-300/80 bg-clip-text text-transparent',
        )}
      >
        Política de privacidade
      </h1>
      <p className='text-sm text-indigo-300'>
        Última atualização: 27 de novembro de 2026
      </p>

      <nav
        aria-labelledby='sumario-titulo'
        className='mt-8 rounded-xl border border-solid border-border-card bg-background-card/40 p-5'
      >
        <h2 id='sumario-titulo' className='mb-3 font-semibold text-indigo-50'>
          Nesta página
        </h2>
        <ol className='grid list-decimal gap-x-8 gap-y-1 pl-6 text-indigo-200 marker:text-indigo-300 sm:grid-cols-2'>
          {SECTIONS.map(({ id, title }) => (
            <li key={id}>
              <a href={`#${id}`} className={clsx(linkStyle, 'inline-block py-1')}>
                {title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className='mt-12 flex flex-col gap-12'>
        <PolicySection id='quem-somos' index={0}>
          <P>
            A UAI Explorer, responsável por este site (uaiexplorer.com.br), é a
            controladora dos dados pessoais tratados aqui.
          </P>
          {/* TODO: incluir razão social, CNPJ e e-mail do encarregado (DPO) quando o cliente informar */}
          <P>
            Para assuntos de privacidade, fale com a gente pelos canais
            oficiais:
          </P>
          <List>
            <li>
              formulário de contato em{' '}
              <Link href='/contact' className={linkStyle}>
                /contact
              </Link>
              ;
            </li>
            <li>
              <a
                href={getWhatsAppLink()}
                target='_blank'
                rel='noopener noreferrer'
                className={linkStyle}
              >
                WhatsApp
              </a>
              ;
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target='_blank'
                rel='noopener noreferrer'
                className={linkStyle}
              >
                Instagram
              </a>
              .
            </li>
          </List>
        </PolicySection>

        <PolicySection id='dados-coletados' index={1}>
          <List>
            <li>
              <strong className='text-indigo-50'>Formulário de contato:</strong>{' '}
              nome, e-mail, telefone (opcional) e mensagem. Esses dados são
              enviados ao serviço de e-mail que usamos, para que a equipe receba
              o pedido e responda.
            </li>
            <li>
              <strong className='text-indigo-50'>
                Navegação, com consentimento:
              </strong>{' '}
              dados de uso coletados pelas ferramentas carregadas pelo Google
              Tag Manager, como páginas visitadas, tempo de visita, tipo de
              dispositivo e navegador, região aproximada e identificadores de
              cookies.
            </li>
            <li>
              <strong className='text-indigo-50'>Registros técnicos:</strong> a
              infraestrutura de hospedagem pode registrar endereço IP, data e
              hora de acesso e dados do navegador, por segurança. Esses
              registros de acesso podem ser guardados pelo prazo exigido pelo
              Marco Civil da Internet (Lei 12.965/2014).
            </li>
            <li>
              <strong className='text-indigo-50'>Canais externos:</strong> ao
              clicar em WhatsApp, Instagram ou Facebook, você vai para
              plataformas da Meta, que têm políticas próprias. Se falar com a
              gente por lá, usamos o que você enviar para responder.
            </li>
          </List>
        </PolicySection>

        <PolicySection id='finalidades' index={2}>
          <P>
            Tratamos seus dados apenas para os fins abaixo, com base na Lei
            Geral de Proteção de Dados (LGPD, art. 7º):
          </P>
          <List>
            <li>
              <strong className='text-indigo-50'>
                Responder pedidos de contato e orçamento:
              </strong>{' '}
              procedimentos preliminares de contrato a pedido do titular (art.
              7º, V) e legítimo interesse (art. 7º, IX).
            </li>
            <li>
              <strong className='text-indigo-50'>Estatísticas e marketing:</strong>{' '}
              consentimento (art. 7º, I), que pode ser revogado a qualquer
              momento.
            </li>
            <li>
              <strong className='text-indigo-50'>
                Segurança e registros de acesso:
              </strong>{' '}
              cumprimento de obrigação legal (art. 7º, II) e legítimo interesse.
            </li>
          </List>
        </PolicySection>

        <PolicySection id='cookies' index={3}>
          <P>
            O Google Tag Manager (GTM) é uma ferramenta do Google que carrega
            outras ferramentas (tags) no site, por exemplo o Google Analytics 4
            e, eventualmente, tags de mensuração de anúncios.
          </P>
          <P>
            Ele só é carregado depois do seu consentimento e respeita as
            categorias que você escolher.
          </P>
          <CookieTable />
          <P>
            A tabela traz exemplos das ferramentas que podem ser usadas via GTM.
            A lista pode mudar conforme as ferramentas ativadas.
          </P>
          <P>
            Para mudar a sua escolha a qualquer momento, use o botão abaixo ou o
            link &quot;Preferências de cookies&quot; no rodapé do site.
          </P>
          <div>
            <CookiePreferencesButton
              className={clsx(
                'inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md px-4 py-2 font-medium',
                'border border-solid border-button-default bg-button-default text-indigo-50 transition duration-300 hover:bg-button-default-hover',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button-default/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              )}
            >
              Gerenciar preferências de cookies
            </CookiePreferencesButton>
          </div>
        </PolicySection>

        <PolicySection id='compartilhamento' index={4}>
          <P>Compartilhamos dados apenas com:</P>
          <List>
            <li>Google LLC, quando há consentimento;</li>
            <li>provedores de hospedagem e de envio de e-mail;</li>
            <li>Meta, quando você usa esses canais.</li>
          </List>
          <P>Não vendemos dados pessoais.</P>
        </PolicySection>

        <PolicySection id='transferencia-internacional' index={5}>
          <P>
            O Google pode tratar dados fora do Brasil, inclusive nos Estados
            Unidos, com as salvaguardas previstas no art. 33 da LGPD.
          </P>
        </PolicySection>

        <PolicySection id='retencao' index={6}>
          <P>
            Guardamos seus dados de contato pelo tempo necessário para responder
            e acompanhar a negociação. Depois disso, eles são excluídos, salvo
            se houver obrigação legal de mantê-los. Os cookies seguem os prazos
            da tabela da seção 4.
          </P>
        </PolicySection>

        <PolicySection id='direitos' index={7}>
          <P>Pela LGPD (art. 18), você pode pedir:</P>
          <List>
            <li>confirmação de que tratamos seus dados e acesso a eles;</li>
            <li>correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>anonimização, bloqueio ou eliminação de dados;</li>
            <li>portabilidade dos dados;</li>
            <li>informação sobre com quem compartilhamos seus dados;</li>
            <li>revogação do consentimento;</li>
            <li>oposição a um tratamento, quando houver descumprimento da lei;</li>
            <li>
              reclamação à Autoridade Nacional de Proteção de Dados (ANPD), em{' '}
              <a
                href='https://www.gov.br/anpd'
                target='_blank'
                rel='noopener noreferrer'
                className={linkStyle}
              >
                gov.br/anpd
              </a>
              .
            </li>
          </List>
          <P>
            Para exercer esses direitos, use os canais da seção 1. Respondemos a
            pedidos de acesso completos em até 15 dias, conforme o art. 19 da
            LGPD.
          </P>
        </PolicySection>

        <PolicySection id='seguranca' index={8}>
          <P>
            Usamos conexão HTTPS e restringimos o acesso aos dados a quem
            precisa deles para atender você.
          </P>
        </PolicySection>

        <PolicySection id='alteracoes' index={9}>
          <P>
            Podemos atualizar esta política. A data no topo da página indica a
            última atualização.
          </P>
        </PolicySection>
      </div>
    </main>
  );
}
