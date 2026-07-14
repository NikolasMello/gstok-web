import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { atualizarFornecedor } from '@/service/fornecedor/FornecedorService'
import type { FornecedorUpdateDto } from '@/service/fornecedor/RequestDTOs'

export function useUpdateFornecedorMutation(id: string) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: FornecedorUpdateDto) => atualizarFornecedor(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['fornecedores', 'list'] })
      await queryClient.invalidateQueries({ queryKey: ['fornecedores', 'detail', id] })
      await navigate({ to: '/admin/fornecedores' })
    },
  })
}
