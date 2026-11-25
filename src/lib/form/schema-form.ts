import z from 'zod';
import { phoneDigits } from '@/utils/masks/phone-mask';

const FormBaseSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty({ message: 'Nome não pode ser vazio' })
    .min(3, 'O nome deve ter no minimo 3 caracteres')
    .max(30, 'O nome deve ter no máximo 30 caracteres'),
  email: z
    .email({ message: 'E-mail é obrigatório' })
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
    .min(10, 'A menssagem deve conter no minimo 10 caracteres')
    .max(200, 'A menssagem pode ter no maximo 200 caracteres'),
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
