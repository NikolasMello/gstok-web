import { z } from 'zod'

import { cnpjSchema } from '@/validators/cnpj'

export const fornecedorSchema = z.object({
  cd_cnpj: cnpjSchema,
  nm_empresa: z
    .string()
    .min(1, { error: 'Informe a razão social.' })
    .max(150, { error: 'A razão social deve ter no máximo 150 caracteres.' }),
  nm_fantasia: z.string().max(150, { error: 'O nome fantasia deve ter no máximo 150 caracteres.' }),
  nm_marca: z.string().max(100, { error: 'A marca deve ter no máximo 100 caracteres.' }),
})

export type FornecedorFormValues = z.infer<typeof fornecedorSchema>
