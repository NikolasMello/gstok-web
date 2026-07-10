import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteUsuario } from '@/service/usuario/UsuarioService'

export function useDeleteUsuarioMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteUsuario(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['usuarios', 'list'] }),
  })
}
