import { z } from 'zod'

import { cpfSchema } from '@/validators/cpf'
import { emailSchema } from '@/validators/email'
import { telefoneSchema } from '@/validators/telefone'

export const usuarioAdminSchema = z.object({
  nm_pessoa: z
    .string()
    .min(1, { error: 'Informe o nome.' })
    .max(100, { error: 'O nome deve ter no máximo 100 caracteres.' }),
  nm_sobrenome: z
    .string()
    .min(1, { error: 'Informe o sobrenome.' })
    .max(100, { error: 'O sobrenome deve ter no máximo 100 caracteres.' }),
  nm_email: emailSchema,
  nm_email_contato: emailSchema,
  nm_telefone: telefoneSchema,
  cd_inscricao_nacional: cpfSchema,
  ds_senha: z.string().min(8, { error: 'A senha deve ter pelo menos 8 caracteres.' }),
  foto: z.union([z.instanceof(File), z.undefined()]),
})

export type UsuarioAdminFormValues = z.infer<typeof usuarioAdminSchema>
