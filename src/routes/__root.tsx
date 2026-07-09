import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { CssBaseline } from '@mui/material'

import { NotificacaoProvider } from '../context/NotificacaoProvider'
import AppTheme from '../theme/AppTheme'

const RootLayout = () => (
  <AppTheme>
    <CssBaseline enableColorScheme />
    <NotificacaoProvider>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </NotificacaoProvider>
  </AppTheme>
)

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootLayout,
})
