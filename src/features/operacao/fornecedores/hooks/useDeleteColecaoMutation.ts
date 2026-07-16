import { useMutation, useQueryClient } from '@tanstack/react-query'

import { excluirColecao } from '@/service/colecao/ColecaoService'

export function useDeleteColecaoMutation(fornecedorId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (idColecao: string) => excluirColecao(idColecao),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['fornecedores', 'detail', fornecedorId] }),
  })
}
