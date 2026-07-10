import { z } from 'zod'

import { emailSchema } from '@/validators/email'
import { senhaSchema } from '@/validators/senha'

export const signUpSchema = z
  .object({
    nome: z
      .string()
      .min(1, { error: 'Informe seu nome.' })
      .max(100, { error: 'O nome deve ter no máximo 100 caracteres.' }),
    email: emailSchema,
    password: senhaSchema,
    confirmPassword: z.string().min(1, { error: 'Confirme sua senha.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  })

export type SignUpFormValues = z.infer<typeof signUpSchema>
