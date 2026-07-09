import { isPhone } from 'brazilian-values'
import { z } from 'zod'

export const telefoneSchema = z
  .string()
  .min(1, { error: 'Informe o telefone.' })
  .refine(isPhone, { error: 'Informe um telefone válido.' })
