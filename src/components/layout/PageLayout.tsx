import { PropsWithChildren } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <Stack
      spacing={3}
      sx={(t) => ({
        minHeight: 'calc(100dvh-92px)',
        width: '100%',
        maxWidth: t.breakpoints.values.xl,
      })}
    >
      <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
        <Typography component="h1" variant="h4">
          Titulo
        </Typography>
        <Button variant="contained">Teste</Button>
      </Stack>
      {children}
    </Stack>
  )
}

export default PageLayout
