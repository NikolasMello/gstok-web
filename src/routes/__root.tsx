import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { CssBaseline } from '@mui/material'
import type { QueryClient } from '@tanstack/react-query'
import { NotificationProvider } from '../context/NotificationProvider'
import AppTheme from '../theme/AppTheme'

const RootLayout = () => (
  <AppTheme disableCustomTheme>
    <CssBaseline enableColorScheme />
    <NotificationProvider>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </NotificationProvider>
  </AppTheme>
)

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootLayout,
})
