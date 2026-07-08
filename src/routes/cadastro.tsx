import { createFileRoute, redirect } from '@tanstack/react-router'

import { sessionQueryOptions } from '../context/SessionProvider'
import SignUp from '../features/auth/cadastro/components/SignUp'

export const Route = createFileRoute('/cadastro')({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(sessionQueryOptions).catch(() => null)
    if (user) {
      throw redirect({ to: '/admin/usuarios' })
    }
  },
  component: SignUp,
})
