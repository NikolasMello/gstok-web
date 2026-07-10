import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import Usuarios from '@/features/administracao/usuarios/components/Usuarios'
import {
  USUARIOS_PAGE_SIZE,
  usuariosQueryOptions,
} from '@/features/administracao/usuarios/hooks/useUsuariosQuery'

const usuariosSearchSchema = z.object({
  page: z.number().int().min(1).optional(),
})

export const Route = createFileRoute('/admin/usuarios/')({
  validateSearch: usuariosSearchSchema,
  loaderDeps: ({ search: { page = 1 } }) => ({ page }),
  loader: ({ context: { queryClient }, deps: { page } }) =>
    queryClient.ensureQueryData(usuariosQueryOptions(page, USUARIOS_PAGE_SIZE)),
  component: Usuarios,
})
