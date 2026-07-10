import { z } from 'zod'

export const senhaSchema = z
  .string()
  .min(8, { error: 'A senha deve ter pelo menos 8 caracteres.' })
  .refine((value) => /[a-z]/.test(value), {
    error: 'A senha deve conter ao menos uma letra minúscula.',
  })
  .refine((value) => /[A-Z]/.test(value), {
    error: 'A senha deve conter ao menos uma letra maiúscula.',
  })
  .refine((value) => /\d/.test(value), { error: 'A senha deve conter ao menos um número.' })
