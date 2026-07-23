import { useMutation, useQueryClient } from '@tanstack/react-query'

import { reordenarImagens } from '@/service/imagemProduto/ImagemProdutoService'
import type { ReordenarImagensDto } from '@/service/imagemProduto/RequestDTOs'

export function useReordenarImagensMutation(produtoId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: ReordenarImagensDto) => reordenarImagens(produtoId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['produtos', 'detail', produtoId] }),
  })
}
