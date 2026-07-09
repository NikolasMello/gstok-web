import { createFileRoute, redirect } from '@tanstack/react-router'

import { SessaoProvider,sessionQueryOptions } from '../../context/SessaoProvider'
import AdminTemplate from '../../templates/AdminTemplate'

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
    <SessaoProvider>
      <AdminTemplate />
    </SessaoProvider>
  )
}
