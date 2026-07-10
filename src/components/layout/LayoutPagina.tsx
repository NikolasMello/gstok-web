import type { PropsWithChildren, ReactNode } from 'react'

import Container, { type ContainerProps } from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

type LayoutPaginaProps = PropsWithChildren<{
  title: string
  action?: ReactNode
  maxWidth?: ContainerProps['maxWidth']
}>

const LayoutPagina = ({ title, action, maxWidth = 'xl', children }: LayoutPaginaProps) => {
  return (
    <Container
      maxWidth={maxWidth}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        minHeight: 'calc(100dvh-92px)',
        width: '100%',
      }}
    >
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {action}
      </Stack>
      {children}
    </Container>
  )
}

export default LayoutPagina
