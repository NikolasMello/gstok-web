import { queryOptions, useQuery } from '@tanstack/react-query'

import { obterTiposProduto } from '@/service/tipoProduto/TipoProdutoService'

export function tiposProdutoQueryOptions() {
  return queryOptions({
    queryKey: ['tiposProduto', 'list'] as const,
    queryFn: obterTiposProduto,
  })
}

export function useTiposProdutoQuery() {
  return useQuery(tiposProdutoQueryOptions())
}
