import { getRouteApi, Link as RouterLink } from '@tanstack/react-router'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import LayoutPagina from '@/components/layout/LayoutPagina'

import { useUsuariosQuery, USUARIOS_PAGE_SIZE } from '../hooks/useUsuariosQuery'
import UsuarioCard from './UsuarioCard'

const routeApi = getRouteApi('/admin/usuarios/')

export default function Usuarios() {
  const { page = 1 } = routeApi.useSearch()
  const navigate = routeApi.useNavigate()

  const { data, isFetching, isPlaceholderData } = useUsuariosQuery(page, USUARIOS_PAGE_SIZE)
  const totalPages = data?.total_pages ?? 0

  return (
    <LayoutPagina
      title="Usuários"
      action={
        <Button
          component={RouterLink}
          to="/admin/usuarios/novo"
          variant="contained"
          startIcon={<AddRoundedIcon />}
        >
          Novo usuário
        </Button>
      }
    >
      <Box sx={{ position: 'relative', opacity: isPlaceholderData ? 0.6 : 1 }}>
        <Grid container spacing={2}>
          {data?.items.map((usuario) => (
            <Grid key={usuario.id_usuario} size={{ xs: 12, sm: 6, md: 4 }}>
              <UsuarioCard usuario={usuario} />
            </Grid>
          ))}
        </Grid>

        {isFetching && (
          <Stack sx={{ alignItems: 'center', py: 4 }}>
            <CircularProgress size={28} />
          </Stack>
        )}

        {!isFetching && data?.items.length === 0 && (
          <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            Nenhum usuário encontrado.
          </Typography>
        )}
      </Box>

      {totalPages > 1 && (
        <Stack sx={{ alignItems: 'center' }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => {
              void navigate({ search: (prev) => ({ ...prev, page: value }) })
            }}
            color="primary"
          />
        </Stack>
      )}
    </LayoutPagina>
  )
}
