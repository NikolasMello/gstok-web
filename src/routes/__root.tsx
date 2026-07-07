import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { CssBaseline } from '@mui/material'
import type { QueryClient } from '@tanstack/react-query'
import { NotificationProvider } from '../context/NotificationProvider'
import AppTheme from '../theme/AppTheme'
import { SessionProvider } from '../context/SessionProvider'

const RootLayout = () => (
  <AppTheme disableCustomTheme>
    <CssBaseline enableColorScheme />
    <NotificationProvider>
      <SessionProvider>
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
      </SessionProvider>
    </NotificationProvider>
  </AppTheme>
)

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootLayout,
})
