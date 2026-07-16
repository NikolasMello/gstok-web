import { useState } from 'react'

import { getRouteApi, Link as RouterLink } from '@tanstack/react-router'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import LayoutPagina from '@/components/layout/LayoutPagina'
import type { ProdutoFiltroDto } from '@/service/produto/RequestDTOs'

import { PRODUTOS_PAGE_SIZE, useProdutosQuery } from '../hooks/useProdutosQuery'
import ProdutosDataGrid from './ProdutosDataGrid'
import ProdutosFiltroDrawer, { type ProdutosFiltro } from './ProdutosFiltroDrawer'

const routeApi = getRouteApi('/admin/produtos/')

export default function Produtos() {
  const { page = 1, nmProduto, nmTipo, cdEan, idFornecedor, tpEstacao, flAtivo } = routeApi.useSearch()
  const navigate = routeApi.useNavigate()
  const [filtroAberto, setFiltroAberto] = useState(false)

  const filtroAtual: ProdutosFiltro = { nmProduto, nmTipo, cdEan, idFornecedor, tpEstacao, flAtivo }

  const filtro: ProdutoFiltroDto = {
    nm_produto: nmProduto,
    nm_tipo: nmTipo,
    cd_ean: cdEan,
    id_fornecedor: idFornecedor,
    tp_estacao: tpEstacao,
    fl_ativo: flAtivo,
  }
  const filtrosAtivos = Object.values(filtroAtual).filter((valor) => valor !== undefined).length

  const { data, isFetching } = useProdutosQuery(page, PRODUTOS_PAGE_SIZE, filtro)

  return (
    <LayoutPagina
      title="Produtos"
      action={
        <Stack direction="row" spacing={2}>
          <Badge badgeContent={filtrosAtivos} color="primary">
            <Button variant="outlined" startIcon={<FilterListRoundedIcon />} onClick={() => setFiltroAberto(true)}>
              Filtros
            </Button>
          </Badge>
          <Button component={RouterLink} to="/admin/produtos/novo" variant="contained" startIcon={<AddRoundedIcon />}>
            Novo produto
          </Button>
        </Stack>
      }
    >
      <ProdutosDataGrid
        produtos={data?.items ?? []}
        rowCount={data?.total_count ?? 0}
        page={page}
        pageSize={PRODUTOS_PAGE_SIZE}
        loading={isFetching}
        onPageChange={(nextPage) => {
          void navigate({ search: (prev) => ({ ...prev, page: nextPage }) })
        }}
      />

      <ProdutosFiltroDrawer
        open={filtroAberto}
        filtro={filtroAtual}
        onClose={() => setFiltroAberto(false)}
        onAplicar={(novoFiltro) => {
          void navigate({ search: () => ({ ...novoFiltro, page: 1 }) })
          setFiltroAberto(false)
        }}
        onLimpar={() => {
          void navigate({ search: () => ({ page: 1 }) })
          setFiltroAberto(false)
        }}
      />
    </LayoutPagina>
  )
}
