import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { criarUsuarioAdmin } from '@/service/usuario/UsuarioService'

export function useCreateUsuarioAdminMutation() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: criarUsuarioAdmin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['usuarios', 'list'] })
      await navigate({ to: '/admin/usuarios' })
    },
  })
}
