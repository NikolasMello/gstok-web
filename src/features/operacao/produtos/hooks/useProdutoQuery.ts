import { queryOptions, useQuery } from '@tanstack/react-query'

import { obterProduto } from '@/service/produto/ProdutoService'

/** Compartilhado com o loader da rota de edição (context.queryClient.ensureQueryData) e o componente. */
export function produtoQueryOptions(id: string) {
  return queryOptions({
    queryKey: ['produtos', 'detail', id] as const,
    queryFn: () => obterProduto(id),
  })
}

export function useProdutoQuery(id: string) {
  return useQuery(produtoQueryOptions(id))
}
