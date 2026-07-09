import { createFileRoute, redirect } from '@tanstack/react-router'

import { sessionQueryOptions } from '../context/SessaoProvider'
import Login from '../features/auth/login/components/Login'

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(sessionQueryOptions).catch(() => null)
    if (user) {
      throw redirect({ to: '/admin/usuarios' })
    }
  },
  component: Login,
})
