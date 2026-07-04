import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { QueryClientProvider } from '@tanstack/react-query'
import AppTheme from '../theme/AppTheme'
import { CssBaseline } from '@mui/material'
import { NotificationProvider } from '../context/NotificationContext'
import { QueryErrorBridge } from '../context/QueryErrorBridge'
import { queryClient } from '../queryClient'

// eslint-disable-next-line react-refresh/only-export-components
const RootLayout = () => (
  <AppTheme disableCustomTheme>
    <CssBaseline enableColorScheme />
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <QueryErrorBridge />
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
      </NotificationProvider>
    </QueryClientProvider>
  </AppTheme>
)

export const Route = createRootRoute({ component: RootLayout })
