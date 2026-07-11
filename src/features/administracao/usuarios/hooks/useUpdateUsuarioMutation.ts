import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import type { UsuarioUpdateDto } from '@/service/usuario/RequestDTOs'
import { atualizarUsuario } from '@/service/usuario/UsuarioService'

export function useUpdateUsuarioMutation(id: string) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: UsuarioUpdateDto) => atualizarUsuario(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['usuarios', 'list'] })
      await queryClient.invalidateQueries({ queryKey: ['usuarios', 'detail', id] })
      await navigate({ to: '/admin/usuarios' })
    },
  })
}
