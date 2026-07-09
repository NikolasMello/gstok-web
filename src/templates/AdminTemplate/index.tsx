import { Outlet } from '@tanstack/react-router'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { alpha } from '@mui/material/styles'

import BarraSuperiorAdmin from './components/BarraSuperiorAdmin'
import Cabecalho from './components/Cabecalho'
import MenuLateral from './components/MenuLateral'

const AdminTemplate = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <MenuLateral />
      <BarraSuperiorAdmin />
      {/* Main content */}
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            : alpha(theme.palette.background.default, 1),
          overflow: 'auto',
        })}
      >
        <Stack
          spacing={3}
          sx={{
            alignItems: 'center',
            mx: 3,
            pb: 5,
            mt: { xs: 8, md: 0 },
          }}
        >
          <Cabecalho />
          <Outlet />
        </Stack>
      </Box>
    </Box>
  )
}

export default AdminTemplate
