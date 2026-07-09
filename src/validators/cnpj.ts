import { isCNPJ } from 'brazilian-values'
import { z } from 'zod'

export const cnpjSchema = z
  .string()
  .min(1, { error: 'Informe o CNPJ.' })
  .refine(isCNPJ, { error: 'Informe um CNPJ válido.' })
