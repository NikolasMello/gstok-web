import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'

import type { ProdutoResumoResponseDto } from '@/service/produto/ResponseDTOs'

const formatadorMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const formatadorData = new Intl.DateTimeFormat('pt-BR')

const columns: GridColDef<ProdutoResumoResponseDto>[] = [
  {
    field: 'avatar',
    headerName: '',
    width: 56,
    sortable: false,
    filterable: false,
    renderCell: ({ row }) => <Avatar variant="rounded" src={row.avatar?.url} alt={row.nm_produto} />,
  },
  { field: 'nm_produto', headerName: 'Produto', flex: 1.5, minWidth: 180 },
  {
    field: 'nm_marca',
    headerName: 'Marca',
    flex: 1,
    minWidth: 120,
    valueGetter: (_value, row) => row.nm_marca ?? '-',
  },
  {
    field: 'nm_tipo',
    headerName: 'Tipo',
    flex: 1,
    minWidth: 120,
    valueGetter: (_value, row) => row.nm_tipo ?? '-',
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
    width: 110,
    renderCell: ({ value }) => (
      <Chip label={value === 'Inverno' ? 'Inverno' : 'Verão'} size="small" variant="outlined" />
    ),
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
    field: 'ts_criacao',
    headerName: 'Criado em',
    width: 130,
    valueFormatter: (value: string) => formatadorData.format(new Date(value)),
  },
]

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
  return (
    <DataGrid
      autoHeight
      disableColumnMenu
      disableRowSelectionOnClick
      getRowId={(row) => row.id_produto}
      rows={produtos}
      columns={columns}
      loading={loading}
      rowCount={rowCount}
      paginationMode="server"
      paginationModel={{ page: page - 1, pageSize }}
      onPaginationModelChange={(model) => onPageChange(model.page + 1)}
      pageSizeOptions={[pageSize]}
      localeText={{ noRowsLabel: 'Nenhum produto encontrado.' }}
    />
  )
}
