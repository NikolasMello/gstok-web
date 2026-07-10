import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useObjectUrl } from '@/hooks/useObjectUrl'

type CampoFotoAvatarComBadgeProps = {
  value: File | undefined
  onChange: (file: File | undefined) => void
  /** Foto já salva; exibida enquanto nenhum arquivo novo é selecionado. */
  fotoUrlAtual?: string
}

/** Avatar grande com badge de câmera sobreposto, estilo redes sociais. */
export function CampoFotoAvatarComBadge({
  value,
  onChange,
  fotoUrlAtual,
}: CampoFotoAvatarComBadgeProps) {
  const previewUrl = useObjectUrl(value)
  const avatarSrc = previewUrl ?? fotoUrlAtual

  return (
    <Stack spacing={1.5} sx={{ alignItems: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <Avatar src={avatarSrc} sx={{ width: 96, height: 96, fontSize: 32 }} />
        <IconButton
          component="label"
          size="small"
          sx={(t) => ({
            position: 'absolute',
            bottom: -4,
            right: -4,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            border: `2px solid ${(t.vars || t).palette.background.paper}`,
            '&:hover': { bgcolor: 'primary.dark' },
          })}
        >
          <CameraAltRoundedIcon fontSize="small" />
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(event) => onChange(event.target.files?.[0])}
          />
        </IconButton>
      </Box>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ textAlign: 'center', maxWidth: 240 }}
      >
        Prefira fotos quadradas (proporção 1:1) para um melhor resultado.
      </Typography>
    </Stack>
  )
}
