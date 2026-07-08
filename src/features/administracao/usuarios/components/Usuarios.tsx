import { useState } from 'react'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import type { GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import AddIcon from '@mui/icons-material/Add'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined'
import PageLayout from '../../../../components/layout/PageLayout'
import { useUsuariosQuery } from '../hooks/useUsuariosQuery'
import type { UsuarioResponseDto } from '../../../../service/usuario/ResponseDTOs'

const DEFAULT_PAGE_SIZE = 10

const columns: GridColDef<UsuarioResponseDto>[] = [
  { field: 'nm_email', headerName: 'E-mail', flex: 1, minWidth: 260 },
  {
    field: 'pessoa_id',
    headerName: 'Pessoa',
    flex: 1,
    minWidth: 160,
    renderCell: ({ value }) => (
      <Chip
        label={value ? 'Vinculado' : 'Sem vínculo'}
        color={value ? 'success' : 'default'}
        variant="outlined"
      />
    ),
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Ações',
    width: 100,
    getActions: () => [
      <GridActionsCellItem key="edit" icon={<EditOutlinedIcon fontSize="small" />} label="Editar" />,
      <GridActionsCellItem
        key="delete"
        icon={<DeleteOutlineIcon fontSize="small" />}
        label="Excluir"
      />,
    ],
  },
]

export default function Usuarios() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: DEFAULT_PAGE_SIZE,
  })

  const { data, isFetching } = useUsuariosQuery(paginationModel.page, paginationModel.pageSize)

  return (
    <PageLayout
      title="Usuários"
      action={
        <Button variant="contained" startIcon={<AddIcon />}>
          Novo usuário
        </Button>
      }
    >
      <DataGrid
        rows={data?.items ?? []}
        columns={columns}
        getRowId={(row) => row.id_usuario}
        loading={isFetching}
        paginationMode="server"
        rowCount={data?.total_count ?? 0}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
        density="comfortable"
        sx={{ border: 'none' }}
      />
    </PageLayout>
  )
}
