import { z } from 'zod'

import type { Estacao } from '@/service/shared/enums'

const precoSchema = z.number({ error: 'Informe o valor.' }).nonnegative({ error: 'O valor não pode ser negativo.' })

export const produtoSchema = z.object({
  cd_sku: z
    .string()
    .min(1, { error: 'Informe o SKU.' })
    .max(50, { error: 'O SKU deve ter no máximo 50 caracteres.' }),
  nm_produto: z
    .string()
    .min(1, { error: 'Informe o nome do produto.' })
    .max(150, { error: 'O nome deve ter no máximo 150 caracteres.' }),
  ds_produto: z.string().max(2000, { error: 'A descrição deve ter no máximo 2000 caracteres.' }),
  vl_preco: precoSchema,
  vl_venda: precoSchema,
  tp_estacao: z.enum(['Inverno', 'Verao', 'Todas'], { error: 'Selecione a estação.' }),
  /** Só existe para popular o Autocomplete de coleção em cascata — o backend não recebe id_fornecedor, só id_colecao. */
  id_fornecedor: z.string().min(1, { error: 'Selecione o fornecedor.' }),
  id_colecao: z.string().min(1, { error: 'Selecione a coleção.' }),
  imagens: z.array(z.instanceof(File)),
})

/**
 * tp_estacao aceita '' e vl_preco/vl_venda aceitam null apenas como estado inicial "nada
 * preenchido" (o FormNumberField/NumberField.Root trabalha com `number | null`) — o schema
 * exige valores válidos para submeter.
 */
export type ProdutoFormValues = Omit<z.infer<typeof produtoSchema>, 'tp_estacao' | 'vl_preco' | 'vl_venda'> & {
  tp_estacao: Estacao | ''
  vl_preco: number | null
  vl_venda: number | null
}
