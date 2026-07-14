import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'

import { obterProdutos } from '@/service/produto/ProdutoService'
import type { ProdutoFiltroDto } from '@/service/produto/RequestDTOs'

export const PRODUTOS_PAGE_SIZE = 10

/** Compartilhado com o loader da rota (context.queryClient.ensureQueryData) e o componente. */
export function produtosQueryOptions(
  page: number,
  pageSize: number = PRODUTOS_PAGE_SIZE,
  filtro?: ProdutoFiltroDto,
) {
  return queryOptions({
    queryKey: ['produtos', 'list', page, pageSize, filtro] as const,
    queryFn: () => obterProdutos({ page, pageSize, filtro }),
    placeholderData: keepPreviousData,
  })
}

export function useProdutosQuery(page: number, pageSize: number = PRODUTOS_PAGE_SIZE, filtro?: ProdutoFiltroDto) {
  return useQuery(produtosQueryOptions(page, pageSize, filtro))
}
