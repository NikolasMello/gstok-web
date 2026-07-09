import type { AnyFieldApi } from '@tanstack/react-form'

import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import UploadRoundedIcon from '@mui/icons-material/UploadRounded'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useObjectUrl } from '@/hooks/useObjectUrl'

/** Cartão com avatar + ações explícitas de trocar/remover a foto. */
export function CampoFotoComAcoes({ field }: { field: AnyFieldApi }) {
  const file = field.state.value as File | undefined
  const previewUrl = useObjectUrl(file)

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={(t) => ({
        alignItems: 'center',
        p: 2,
        borderRadius: 3,
        border: `1px solid ${(t.vars || t).palette.divider}`,
      })}
    >
      <Avatar src={previewUrl} sx={{ width: 64, height: 64 }} />
      <Stack spacing={1} sx={{ flex: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Foto de perfil (opcional) · proporção 1:1 recomendada
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button component="label" size="small" variant="outlined" startIcon={<UploadRoundedIcon />}>
            {file ? 'Trocar foto' : 'Enviar foto'}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(event) => field.handleChange(event.target.files?.[0])}
            />
          </Button>
          {file && (
            <Button
              size="small"
              color="error"
              variant="text"
              startIcon={<DeleteOutlineRoundedIcon />}
              onClick={() => field.handleChange(undefined)}
            >
              Remover
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}
