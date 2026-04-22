'use server';

import {
  FormDataSchema,
  FormParseSchema,
  InitialFormData,
} from '@/lib/form/schema-form';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';

type FormActionState = {
  formState: FormDataSchema;
  errors: string[];
  success: boolean;
};

export async function FormAction(
  prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
      success: false,
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = FormParseSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error);
    return {
      formState: InitialFormData.parse(formDataToObj),
      errors: errors,
      success: false,
    };
  }

  const validFormData = zodParsedObj.data;

  //TODO endpoint de enviar email com logica de retorno

  return {
    formState: InitialFormData.parse({}),
    errors: [],
    success: true,
  };
}
