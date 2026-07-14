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

import { FORNECEDORES_PAGE_SIZE, useFornecedoresQuery } from '../hooks/useFornecedoresQuery'
import FornecedorCard from './FornecedorCard'

const routeApi = getRouteApi('/admin/fornecedores/')

export default function Fornecedores() {
  const { page = 1 } = routeApi.useSearch()
  const navigate = routeApi.useNavigate()

  const { data, isFetching, isPlaceholderData } = useFornecedoresQuery(page, FORNECEDORES_PAGE_SIZE)
  const totalPages = data?.total_pages ?? 0

  return (
    <LayoutPagina
      title="Fornecedores"
      action={
        <Button
          component={RouterLink}
          to="/admin/fornecedores/novo"
          variant="contained"
          startIcon={<AddRoundedIcon />}
        >
          Novo fornecedor
        </Button>
      }
    >
      <Box sx={{ position: 'relative', opacity: isPlaceholderData ? 0.6 : 1 }}>
        <Grid container spacing={2}>
          {data?.items.map((fornecedor) => (
            <Grid key={fornecedor.id_fornecedor} size={{ xs: 12, sm: 6, md: 4 }}>
              <FornecedorCard fornecedor={fornecedor} />
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
            Nenhum fornecedor encontrado.
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
