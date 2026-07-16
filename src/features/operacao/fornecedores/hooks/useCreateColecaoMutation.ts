import { useMutation, useQueryClient } from '@tanstack/react-query'

import { criarColecao } from '@/service/colecao/ColecaoService'

export function useCreateColecaoMutation(fornecedorId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (nmColecao: string) =>
      criarColecao({ id_fornecedor: fornecedorId, nm_colecao: nmColecao }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['fornecedores', 'detail', fornecedorId] }),
  })
}
