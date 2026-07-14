import { useState } from 'react'

import { getRouteApi } from '@tanstack/react-router'

import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'

import LayoutPagina from '@/components/layout/LayoutPagina'
import type { ProdutoFiltroDto } from '@/service/produto/RequestDTOs'

import { PRODUTOS_PAGE_SIZE, useProdutosQuery } from '../hooks/useProdutosQuery'
import ProdutosDataGrid from './ProdutosDataGrid'
import ProdutosFiltroDrawer, { type ProdutosFiltro } from './ProdutosFiltroDrawer'

const routeApi = getRouteApi('/admin/produtos/')

export default function Produtos() {
  const { page = 1, nmProduto, nmTipo, cdSku, idFornecedor, tpEstacao, flAtivo } = routeApi.useSearch()
  const navigate = routeApi.useNavigate()
  const [filtroAberto, setFiltroAberto] = useState(false)

  const filtroAtual: ProdutosFiltro = { nmProduto, nmTipo, cdSku, idFornecedor, tpEstacao, flAtivo }

  const filtro: ProdutoFiltroDto = {
    nm_produto: nmProduto,
    nm_tipo: nmTipo,
    cd_sku: cdSku,
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
        <Badge badgeContent={filtrosAtivos} color="primary">
          <Button variant="outlined" startIcon={<FilterListRoundedIcon />} onClick={() => setFiltroAberto(true)}>
            Filtros
          </Button>
        </Badge>
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
