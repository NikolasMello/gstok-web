import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'

import { obterFornecedores } from '@/service/fornecedor/FornecedorService'

export const FORNECEDORES_PAGE_SIZE = 6

/** Compartilhado com o loader da rota (context.queryClient.ensureQueryData) e o componente. */
export function fornecedoresQueryOptions(page: number, pageSize: number = FORNECEDORES_PAGE_SIZE) {
  return queryOptions({
    queryKey: ['fornecedores', 'list', page, pageSize] as const,
    queryFn: () => obterFornecedores({ page, pageSize }),
    placeholderData: keepPreviousData,
  })
}

export function useFornecedoresQuery(page: number, pageSize: number = FORNECEDORES_PAGE_SIZE) {
  return useQuery(fornecedoresQueryOptions(page, pageSize))
}
