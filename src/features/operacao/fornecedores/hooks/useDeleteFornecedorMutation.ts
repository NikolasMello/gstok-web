import { useMutation, useQueryClient } from '@tanstack/react-query'

import { excluirFornecedor } from '@/service/fornecedor/FornecedorService'

export function useDeleteFornecedorMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => excluirFornecedor(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['fornecedores', 'list'] }),
  })
}
