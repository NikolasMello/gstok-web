import { createFileRoute } from '@tanstack/react-router'

import NovoUsuario from '../../../features/administracao/usuarios/components/NovoUsuario'

export const Route = createFileRoute('/admin/usuarios/novo')({
  component: NovoUsuario,
})
