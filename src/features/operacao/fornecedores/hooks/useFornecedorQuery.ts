import { queryOptions, useQuery } from '@tanstack/react-query'

import { obterFornecedor } from '@/service/fornecedor/FornecedorService'

/** Compartilhado com o loader da rota de edição (context.queryClient.ensureQueryData) e o componente. */
export function fornecedorQueryOptions(id: string) {
  return queryOptions({
    queryKey: ['fornecedores', 'detail', id] as const,
    queryFn: () => obterFornecedor(id),
  })
}

export function useFornecedorQuery(id: string) {
  return useQuery(fornecedorQueryOptions(id))
}
