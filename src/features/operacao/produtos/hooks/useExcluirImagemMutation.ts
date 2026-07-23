import { useMutation, useQueryClient } from '@tanstack/react-query'

import { excluirImagem } from '@/service/imagemProduto/ImagemProdutoService'

export function useExcluirImagemMutation(produtoId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => excluirImagem(produtoId, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['produtos', 'detail', produtoId] }),
  })
}
