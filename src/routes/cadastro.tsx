import { createFileRoute, redirect } from '@tanstack/react-router'

import { sessionQueryOptions } from '../context/SessaoProvider'
import Cadastro from '../features/auth/cadastro/components/Cadastro'

export const Route = createFileRoute('/cadastro')({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(sessionQueryOptions).catch(() => null)
    if (user) {
      throw redirect({ to: '/admin/usuarios' })
    }
  },
  component: Cadastro,
})
