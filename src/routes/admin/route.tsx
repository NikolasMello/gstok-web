import { createFileRoute, redirect } from '@tanstack/react-router'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import { SessaoProvider, sessionQueryOptions } from '../../context/SessaoProvider'
import AdminTemplate from '../../templates/AdminTemplate'

export const Route = createFileRoute('/admin')({
  loader: async ({ context }) => {
    const usuario = await context.queryClient.ensureQueryData(sessionQueryOptions).catch(() => null)
    if (!usuario) {
      throw redirect({ to: '/login' })
    }
    return { usuario }
  },
  pendingComponent: () => (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh' }}
    >
      <CircularProgress />
    </Box>
  ),
  component: RouteComponent,
})

function RouteComponent() {
  const { usuario } = Route.useLoaderData()

  return (
    <SessaoProvider usuario={usuario}>
      <AdminTemplate />
    </SessaoProvider>
  )
}
