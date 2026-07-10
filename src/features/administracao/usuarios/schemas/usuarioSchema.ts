import { z } from 'zod'

import { cpfSchema } from '@/validators/cpf'
import { emailSchema } from '@/validators/email'
import { senhaSchema } from '@/validators/senha'
import { telefoneSchema } from '@/validators/telefone'

const usuarioBaseSchema = z.object({
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
  foto: z.union([z.instanceof(File), z.undefined()]),
})

export const usuarioCreateSchema = usuarioBaseSchema.extend({
  ds_senha: senhaSchema,
})

/**
 * Sem o campo senha (não exibido na edição) — mas `ds_senha` segue no shape (sem regra) só para bater
 * com o tipo de UsuarioFormValues, já que o UsuarioForm reusa o mesmo `defaultValues`/`onSubmit` para
 * os dois modos. `cd_inscricao_nacional` também fica sem regra: quando ausente o campo some desabilitado
 * (ver UsuarioForm) e não pode ser preenchido pelo usuário, então exigir o formato de CPF travaria o form.
 */
export const usuarioEditSchema = usuarioBaseSchema.extend({
  cd_inscricao_nacional: z.string(),
  ds_senha: z.string(),
})

export type UsuarioFormValues = z.infer<typeof usuarioCreateSchema>
