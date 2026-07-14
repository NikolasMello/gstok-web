import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { criarFornecedor } from '@/service/fornecedor/FornecedorService'

export function useCreateFornecedorMutation() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: criarFornecedor,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['fornecedores', 'list'] })
      await navigate({ to: '/admin/fornecedores' })
    },
  })
}
