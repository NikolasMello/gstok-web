import { queryOptions, useQuery } from '@tanstack/react-query'

import { obterFornecedores } from '@/service/fornecedor/FornecedorService'

/** Usado para popular o autocomplete de fornecedor no filtro de produtos; não há endpoint de busca por nome. */
const FORNECEDORES_PAGE_SIZE = 100

export function fornecedoresQueryOptions() {
  return queryOptions({
    queryKey: ['fornecedores', 'list', 1, FORNECEDORES_PAGE_SIZE] as const,
    queryFn: () => obterFornecedores({ page: 1, pageSize: FORNECEDORES_PAGE_SIZE }),
  })
}

export function useFornecedoresQuery(enabled: boolean) {
  return useQuery({ ...fornecedoresQueryOptions(), enabled })
}
