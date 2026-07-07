import { createFileRoute, redirect } from '@tanstack/react-router'
import SignIn from '../features/login/components/SignIn'
import { sessionQueryOptions } from '../context/SessionProvider'

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(sessionQueryOptions).catch(() => null)
    if (user) {
      throw redirect({ to: '/admin' })
    }
  },
  component: SignIn,
})
