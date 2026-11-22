import {
  FormDataDto,
  FormParseSchema,
  InitialFormData,
} from '@/lib/form/schema-form';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { phoneMask } from '@/utils/masks/phone-mask';

export type ContactFormState = {
  formState: FormDataDto;
  errors: string[];
  success: boolean;
};

const GENERIC_ERROR =
  'Não foi possível enviar sua mensagem agora. Tente de novo em instantes ou fale com a gente pelo WhatsApp.';

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = FormParseSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    return {
      formState: InitialFormData.parse(formDataToObj),
      errors: getZodErrorMessages(zodParsedObj.error),
      success: false,
    };
  }

  const fail = (message: string): ContactFormState => ({
    formState: InitialFormData.parse(formDataToObj),
    errors: [message],
    success: false,
  });

  // Acesso literal: o Next só inlina NEXT_PUBLIC_* assim.
  const baseUrl = process.env.NEXT_PUBLIC_MAIL_API_URL?.replace(/\/+$/, '');
  const slug = process.env.NEXT_PUBLIC_CONTACT_FORM_SLUG;

  if (!baseUrl || !slug) return fail(GENERIC_ERROR);

  const { name, email, phone, message } = zodParsedObj.data;
  // Nome do input evita autofill; a API exige a chave 'website' no corpo.
  const website = formData.get('contact_url');

  // As chaves viram os rótulos do e-mail recebido pela equipe; 'email' vira Reply-To.
  const body: Record<string, string> = {
    nome: name,
    email,
    ...(phone ? { telefone: phoneMask(phone) } : {}),
    mensagem: message,
    website: typeof website === 'string' ? website : '',
  };

  try {
    const res = await fetch(
      `${baseUrl}/v1/forms/${encodeURIComponent(slug)}/submissions`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10_000),
      },
    );

    if (res.ok) {
      return {
        formState: InitialFormData.parse({}),
        errors: [],
        success: true,
      };
    }
    if (res.status === 400) {
      return fail('Algum campo está inválido. Revise e tente de novo.');
    }
    if (res.status === 429) {
      return fail(
        'Muitas tentativas seguidas. Aguarde um minuto e tente de novo.',
      );
    }
    return fail(GENERIC_ERROR);
  } catch {
    return fail(GENERIC_ERROR);
  }
}
