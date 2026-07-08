import { z } from 'zod'

export const signInSchema = z.object({
  email: z.email({ error: 'Informe um endereço de e-mail válido.' }),
  password: z.string().min(6, { error: 'A senha deve ter pelo menos 6 caracteres.' }),
})

export type SignInFormValues = z.infer<typeof signInSchema>
