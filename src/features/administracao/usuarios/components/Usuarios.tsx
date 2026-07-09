import { useState } from 'react'

import { Link as RouterLink } from '@tanstack/react-router'

import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import type { GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'

import LayoutPagina from '../../../../components/layout/LayoutPagina'
import type { UsuarioResponseDto } from '../../../../service/usuario/ResponseDTOs'
import { useUsuariosQuery } from '../hooks/useUsuariosQuery'

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
    <LayoutPagina
      title="Usuários"
      action={
        <Button component={RouterLink} to="/admin/usuarios/novo" variant="contained" startIcon={<AddIcon />}>
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
    </LayoutPagina>
  )
}
