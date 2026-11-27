import z from 'zod';
import { phoneDigits } from '@/utils/masks/phone-mask';

const FormBaseSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty({ message: 'Nome não pode ser vazio' })
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .max(30, 'O nome deve ter no máximo 30 caracteres'),
  email: z
    .string()
    .trim()
    .nonempty({ message: 'E-mail é obrigatório' })
    .pipe(z.email({ message: 'Digite um e-mail válido' }))
    .transform(val => val.toLowerCase()),
  phone: z
    .string()
    .trim()
    .transform(val => phoneDigits(val) || undefined)
    .refine(val => !val || (val.length >= 10 && val.length <= 11), {
      message: 'Telefone inválido. Informe DDD + número',
    })
    .optional(),
  message: z
    .string()
    .min(10, 'A mensagem deve conter no mínimo 10 caracteres')
    .max(200, 'A mensagem pode ter no máximo 200 caracteres'),
});

export const InitialFormData = z.object({
  name: z.string().default(''),
  email: z.string().default(''),
  phone: z.string().default(''),
  message: z.string().default(''),
});

export const FormParseSchema = FormBaseSchema;

export type FormDataSchema = z.infer<typeof FormBaseSchema>;
export type FormDataDto = z.infer<typeof InitialFormData>;
