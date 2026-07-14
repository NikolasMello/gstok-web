import { useState } from 'react'

import { Link as RouterLink } from '@tanstack/react-router'
import { formatToPhone } from 'brazilian-values'

import DeleteRounded from '@mui/icons-material/DeleteRounded'
import EditRounded from '@mui/icons-material/EditRounded'
import LocalPhoneRounded from '@mui/icons-material/LocalPhoneRounded'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import type { UsuarioResponseDto } from '@/service/usuario/ResponseDTOs'
import { nomeCompleto } from '@/utilities/nomeCompleto'

import ExcluirUsuarioDialog from './ExcluirUsuarioDialog'

export default function UsuarioCard({ usuario }: { usuario: UsuarioResponseDto }) {
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false)

  const nome = nomeCompleto(usuario)
  const telefone = usuario.nm_telefone ? formatToPhone(usuario.nm_telefone.replace(/\D/g, '')) : '—'

  return (
    <Card variant="outlined" sx={{ height: '100%', overflow: 'hidden' }}>
      <Box sx={{ height: 4, bgcolor: 'primary.main' }} />

      <CardContent sx={{ pb: 0 }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Avatar
              src={usuario.foto?.ur_imagem ?? undefined}
              sx={{
                width: 56,
                height: 56,
                flexShrink: 0,
                bgcolor: 'primary.main',
                outline: '2.5px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px',
              }}
            >
              {nome.charAt(0).toUpperCase()}
            </Avatar>

            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap title={nome}>
                {nome}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap title={usuario.nm_email}>
                {usuario.nm_email}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', py: 1 }}>
            <LocalPhoneRounded fontSize='small' />
            <Typography variant="body2" color="text.secondary">
              {telefone}
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
        <RouterLink to="/admin/usuarios/$id/editar" params={{ id: usuario.id_usuario }}>
          <IconButton component="span" size="small" aria-label="Editar usuário">
            <EditRounded fontSize="small" />
          </IconButton>
        </RouterLink>
        <IconButton size="small" aria-label="Excluir usuário" onClick={() => setConfirmandoExclusao(true)}>
          <DeleteRounded fontSize="small" />
        </IconButton>
      </Box>

      <ExcluirUsuarioDialog
        usuario={confirmandoExclusao ? usuario : null}
        onClose={() => setConfirmandoExclusao(false)}
      />
    </Card>
  )
}
