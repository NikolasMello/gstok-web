import DeleteRounded from '@mui/icons-material/DeleteRounded'
import UploadRoundedIcon from '@mui/icons-material/UploadRounded'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useObjectUrl } from '@/hooks/useObjectUrl'

type CampoFotoComAcoesProps = {
  value: File | undefined
  onChange: (file: File | undefined) => void
  /** Foto já salva; exibida enquanto nenhum arquivo novo é selecionado. */
  fotoUrlAtual?: string
}

/** Cartão com avatar + ações explícitas de trocar/remover a foto. */
export function CampoFotoComAcoes({ value, onChange, fotoUrlAtual }: CampoFotoComAcoesProps) {
  const previewUrl = useObjectUrl(value)
  const avatarSrc = previewUrl ?? fotoUrlAtual

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
      <Avatar src={avatarSrc} sx={{ width: 64, height: 64 }} />
      <Stack spacing={1} sx={{ flex: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Foto de perfil (opcional) · proporção 1:1 recomendada
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            component="label"
            size="small"
            variant="outlined"
            startIcon={<UploadRoundedIcon />}
          >
            {avatarSrc ? 'Trocar foto' : 'Enviar foto'}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(event) => onChange(event.target.files?.[0])}
            />
          </Button>
          {value && (
            <Button
              size="small"
              color="error"
              variant="text"
              startIcon={<DeleteRounded />}
              onClick={() => onChange(undefined)}
            >
              Remover
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}
