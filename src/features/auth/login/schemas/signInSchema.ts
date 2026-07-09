import { z } from 'zod'

import { emailSchema } from '@/validators/email'

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(6, { error: 'A senha deve ter pelo menos 6 caracteres.' }),
})

export type SignInFormValues = z.infer<typeof signInSchema>
