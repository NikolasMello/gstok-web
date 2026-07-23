import { useState } from 'react'

import { useNavigate } from '@tanstack/react-router'

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { DataGrid, GridActionsCellItem, type GridColDef } from '@mui/x-data-grid'

import { ChipEstacao } from '@/components/ui/ChipEstacao'
import type { ProdutoResumoResponseDto } from '@/service/produto/ResponseDTOs'
import type { Estacao } from '@/service/shared/enums'

import ExcluirProdutoDialog from './ExcluirProdutoDialog'

const formatadorMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

function criarColunas(
  onEditar: (produto: ProdutoResumoResponseDto) => void,
  onExcluir: (produto: ProdutoResumoResponseDto) => void,
): GridColDef<ProdutoResumoResponseDto>[] {
  return [
    {
      field: 'nm_produto',
      headerName: 'Produto',
      flex: 2,
      minWidth: 260,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', height: '100%', py: 2 }}>
          <Avatar
            variant="rounded"
            src={row.avatar?.url}
            alt={row.nm_produto}
            sx={{ width: 64, height: 64 }}
          />
          <Stack spacing={0.5} sx={{ justifyContent: 'center', height: '100%' }}>
            <Typography sx={{ fontWeight: 600 }} noWrap title={row.nm_produto}>
              {row.nm_produto}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              noWrap
              title={row.nm_tipo ?? undefined}
            >
              {row.nm_tipo ?? '-'}
            </Typography>
          </Stack>
        </Stack>
      ),
    },
    {
      field: 'nm_marca',
      headerName: 'Marca',
      flex: 1,
      minWidth: 120,
      valueGetter: (_value, row) => row.nm_marca ?? '-',
    },
    {
      field: 'nm_colecao',
      headerName: 'Coleção',
      flex: 1,
      minWidth: 140,
      valueGetter: (_value, row) => row.nm_colecao ?? '-',
    },
    {
      field: 'tp_estacao',
      headerName: 'Estação',
      headerAlign: 'center',
      align: 'center',
      width: 150,
      renderCell: ({ value }) => <ChipEstacao estacao={value as Estacao} size="small" />,
    },
    {
      field: 'vl_venda',
      headerName: 'Preço',
      width: 120,
      align: 'right',
      headerAlign: 'right',
      valueFormatter: (value: number) => formatadorMoeda.format(value),
    },
    {
      field: 'acoes',
      type: 'actions',
      headerName: 'Ações',
      width: 100,
      getActions: ({ row }) => [
        <GridActionsCellItem
          key="editar"
          icon={<EditRoundedIcon />}
          label="Editar"
          onClick={() => onEditar(row)}
        />,
        <GridActionsCellItem
          key="excluir"
          icon={<DeleteRoundedIcon />}
          label="Excluir"
          onClick={() => onExcluir(row)}
        />,
      ],
    },
  ]
}

type ProdutosDataGridProps = {
  produtos: ProdutoResumoResponseDto[]
  rowCount: number
  page: number
  pageSize: number
  loading?: boolean
  onPageChange: (page: number) => void
}

export default function ProdutosDataGrid({
  produtos,
  rowCount,
  page,
  pageSize,
  loading,
  onPageChange,
}: ProdutosDataGridProps) {
  const [produtoParaExcluir, setProdutoParaExcluir] = useState<ProdutoResumoResponseDto | null>(
    null,
  )
  const navigate = useNavigate()

  return (
    <>
      <DataGrid
        autoHeight
        disableColumnMenu
        disableRowSelectionOnClick
        rowHeight={96}
        getRowId={(row) => row.id_produto}
        rows={produtos}
        columns={criarColunas(
          (produto) =>
            void navigate({ to: '/admin/produtos/$id/editar', params: { id: produto.id_produto } }),
          setProdutoParaExcluir,
        )}
        loading={loading}
        rowCount={rowCount}
        paginationMode="server"
        paginationModel={{ page: page - 1, pageSize }}
        onPaginationModelChange={(model) => onPageChange(model.page + 1)}
        pageSizeOptions={[pageSize]}
        localeText={{ noRowsLabel: 'Nenhum produto encontrado.' }}
      />

      <ExcluirProdutoDialog
        produto={produtoParaExcluir}
        onClose={() => setProdutoParaExcluir(null)}
      />
    </>
  )
}
