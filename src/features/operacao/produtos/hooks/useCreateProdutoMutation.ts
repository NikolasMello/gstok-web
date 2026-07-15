import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { criarProduto } from '@/service/produto/ProdutoService'

export function useCreateProdutoMutation() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: criarProduto,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['produtos', 'list'] })
      await navigate({ to: '/admin/produtos' })
    },
  })
}
