import { createFileRoute } from '@tanstack/react-router'

import EditarUsuario from '@/features/administracao/usuarios/components/EditarUsuario'
import { usuarioQueryOptions } from '@/features/administracao/usuarios/hooks/useUsuarioQuery'

export const Route = createFileRoute('/admin/usuarios/$id/editar')({
  loader: ({ context: { queryClient }, params: { id } }) =>
    queryClient.ensureQueryData(usuarioQueryOptions(id as string)),
  component: EditarUsuario,
})
