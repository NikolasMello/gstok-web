import { z } from 'zod'

export const signUpSchema = z
  .object({
    nome: z
      .string()
      .min(1, { error: 'Informe seu nome.' })
      .max(100, { error: 'O nome deve ter no máximo 100 caracteres.' }),
    email: z
      .email({ error: 'Informe um endereço de e-mail válido.' })
      .max(150, { error: 'O e-mail deve ter no máximo 150 caracteres.' }),
    password: z.string().min(8, { error: 'A senha deve ter pelo menos 8 caracteres.' }),
    confirmPassword: z.string().min(1, { error: 'Confirme sua senha.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  })

export type SignUpFormValues = z.infer<typeof signUpSchema>
