import { queryOptions, useQuery } from '@tanstack/react-query'

import { obterColecao } from '@/service/colecao/ColecaoService'

/**
 * Usado para descobrir o fornecedor de um produto já cadastrado a partir do colecao_id
 * (ProdutoResponseDto não traz id_fornecedor, só colecao_id), para popular o autocomplete
 * de fornecedor em cascata no formulário de edição.
 */
export function colecaoQueryOptions(id: string) {
  return queryOptions({
    queryKey: ['colecoes', 'detail', id] as const,
    queryFn: () => obterColecao(id),
  })
}

export function useColecaoQuery(id: string) {
  return useQuery(colecaoQueryOptions(id))
}
