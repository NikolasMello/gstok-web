import { z } from 'zod'

import { emailSchema } from '@/validators/email'
import { telefoneSchema } from '@/validators/telefone'

export const dadosPessoaisSchema = z.object({
  nm_pessoa: z
    .string()
    .min(1, { error: 'Informe o nome.' })
    .max(100, { error: 'O nome deve ter no máximo 100 caracteres.' }),
  nm_sobrenome: z
    .string()
    .min(1, { error: 'Informe o sobrenome.' })
    .max(100, { error: 'O sobrenome deve ter no máximo 100 caracteres.' }),
  nm_telefone: telefoneSchema,
  nm_email_contato: emailSchema,
  foto: z.union([z.instanceof(File), z.undefined()]),
})

export type DadosPessoaisFormValues = z.infer<typeof dadosPessoaisSchema>
