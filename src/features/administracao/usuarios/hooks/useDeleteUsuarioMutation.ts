import { useMutation, useQueryClient } from '@tanstack/react-query'

import { excluirUsuario } from '@/service/usuario/UsuarioService'

export function useDeleteUsuarioMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => excluirUsuario(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['usuarios', 'list'] }),
  })
}
