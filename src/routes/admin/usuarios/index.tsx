import { createFileRoute } from '@tanstack/react-router'

import Usuarios from '../../../features/administracao/usuarios/components/Usuarios'

export const Route = createFileRoute('/admin/usuarios/')({
  component: Usuarios,
})
