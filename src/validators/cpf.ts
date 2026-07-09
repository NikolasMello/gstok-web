import { isCPF } from 'brazilian-values'
import { z } from 'zod'

export const cpfSchema = z
  .string()
  .min(1, { error: 'Informe o CPF.' })
  .refine(isCPF, { error: 'Informe um CPF válido.' })
