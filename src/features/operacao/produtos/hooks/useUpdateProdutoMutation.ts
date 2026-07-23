import { useMutation, useQueryClient } from '@tanstack/react-query'

import { atualizarProduto } from '@/service/produto/ProdutoService'
import type { ProdutoUpdateDto } from '@/service/produto/RequestDTOs'

export function useUpdateProdutoMutation(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: ProdutoUpdateDto) => atualizarProduto(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['produtos', 'list'] })
      await queryClient.invalidateQueries({ queryKey: ['produtos', 'detail', id] })
    },
  })
}
