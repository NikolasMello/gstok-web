import { queryOptions, useQuery } from '@tanstack/react-query'

import { obterColecoesPorFornecedor } from '@/service/colecao/ColecaoService'

export function colecoesQueryOptions(fornecedorId: string) {
  return queryOptions({
    queryKey: ['colecoes', 'porFornecedor', fornecedorId] as const,
    queryFn: () => obterColecoesPorFornecedor(fornecedorId),
  })
}

/** Usado pelo Autocomplete de coleção em cascata: só busca depois que um fornecedor é selecionado. */
export function useColecoesQuery(fornecedorId: string | undefined) {
  return useQuery({ ...colecoesQueryOptions(fornecedorId ?? ''), enabled: Boolean(fornecedorId) })
}
