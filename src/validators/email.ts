import { z } from 'zod'

export const emailSchema = z
  .email({ error: 'Informe um endereço de e-mail válido.' })
  .max(150, { error: 'O e-mail deve ter no máximo 150 caracteres.' })
