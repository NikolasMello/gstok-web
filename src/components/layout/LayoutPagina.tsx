import type { PropsWithChildren, ReactNode } from 'react'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

type LayoutPaginaProps = PropsWithChildren<{
  title: string
  action?: ReactNode
}>

const LayoutPagina = ({ title, action, children }: LayoutPaginaProps) => {
  return (
    <Stack
      spacing={3}
      sx={(t) => ({
        minHeight: 'calc(100dvh-92px)',
        width: '100%',
        maxWidth: t.breakpoints.values.xl,
      })}
    >
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {action}
      </Stack>
      {children}
    </Stack>
  )
}

export default LayoutPagina
