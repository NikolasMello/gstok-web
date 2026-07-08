import { ThemeProvider } from '@mui/material/styles'

import { customTheme } from './customTheme'

interface AppThemeProps {
  children: React.ReactNode
}

export default function AppTheme(props: AppThemeProps) {
  const { children } = props

  return (
    <ThemeProvider theme={customTheme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}
