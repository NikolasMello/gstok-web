import { createFileRoute, redirect } from '@tanstack/react-router'
import AdminTemplate from '../../templates/AdminTemplate'
import { sessionQueryOptions, SessionProvider } from '../../context/SessionProvider'

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(sessionQueryOptions).catch(() => null)
    if (!user) {
      throw redirect({ to: '/login' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SessionProvider>
      <AdminTemplate />
    </SessionProvider>
  )
}
