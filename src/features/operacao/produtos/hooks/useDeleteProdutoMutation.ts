import { useMutation, useQueryClient } from '@tanstack/react-query'

import { excluirProduto } from '@/service/produto/ProdutoService'

export function useDeleteProdutoMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => excluirProduto(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['produtos', 'list'] }),
  })
}
