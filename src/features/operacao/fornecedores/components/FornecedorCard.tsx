import { useState } from 'react'

import { Link as RouterLink } from '@tanstack/react-router'
import { formatToCNPJ } from 'brazilian-values'

import DeleteRounded from '@mui/icons-material/DeleteRounded'
import EditRounded from '@mui/icons-material/EditRounded'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import type { FornecedorResponseDto } from '@/service/fornecedor/ResponseDTOs'

import ExcluirFornecedorDialog from './ExcluirFornecedorDialog'

export default function FornecedorCard({ fornecedor }: { fornecedor: FornecedorResponseDto }) {
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false)

  const nomeExibicao = fornecedor.nm_fantasia || fornecedor.nm_empresa

  return (
    <Card variant="outlined" sx={{ height: '100%', overflow: 'hidden' }}>
      <Box sx={{ height: 4, bgcolor: 'primary.main' }} />

      <CardContent sx={{ pb: 0 }}>
        <Stack spacing={2}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap title={nomeExibicao}>
              {nomeExibicao}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {formatToCNPJ(fornecedor.cd_cnpj)}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', py: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Marca: {fornecedor.nm_marca || '—'}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>

      <Box
        sx={{
          mt: 2,
          px: 2,
          py: 1,
          bgcolor: 'secondary.light',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 0.5,
        }}
      >
        <RouterLink to="/admin/fornecedores/$id/editar" params={{ id: fornecedor.id_fornecedor }}>
          <IconButton component="span" size="small" aria-label="Editar fornecedor">
            <EditRounded fontSize="small" />
          </IconButton>
        </RouterLink>
        <IconButton size="small" aria-label="Excluir fornecedor" onClick={() => setConfirmandoExclusao(true)}>
          <DeleteRounded fontSize="small" />
        </IconButton>
      </Box>

      <ExcluirFornecedorDialog
        fornecedor={confirmandoExclusao ? fornecedor : null}
        onClose={() => setConfirmandoExclusao(false)}
      />
    </Card>
  )
}
