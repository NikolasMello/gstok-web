import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import Produtos from '@/features/operacao/produtos/components/Produtos/Produtos'
import { PRODUTOS_PAGE_SIZE, produtosQueryOptions } from '@/features/operacao/produtos/hooks/useProdutosQuery'

const produtosSearchSchema = z.object({
  page: z.number().int().min(1).optional(),
  nmProduto: z.string().optional(),
  nmTipo: z.string().optional(),
  cdEan: z.string().optional(),
  idFornecedor: z.string().optional(),
  tpEstacao: z.enum(['Inverno', 'Verao', 'Todas']).optional(),
  flAtivo: z.boolean().optional(),
})

export const Route = createFileRoute('/admin/produtos/')({
  validateSearch: produtosSearchSchema,
  loaderDeps: ({ search: { page = 1, nmProduto, nmTipo, cdEan, idFornecedor, tpEstacao, flAtivo } }) => ({
    page,
    filtro: {
      nm_produto: nmProduto,
      nm_tipo: nmTipo,
      cd_ean: cdEan,
      id_fornecedor: idFornecedor,
      tp_estacao: tpEstacao,
      fl_ativo: flAtivo,
    },
  }),
  loader: ({ context: { queryClient }, deps: { page, filtro } }) =>
    queryClient.ensureQueryData(produtosQueryOptions(page, PRODUTOS_PAGE_SIZE, filtro)),
  component: Produtos,
})
