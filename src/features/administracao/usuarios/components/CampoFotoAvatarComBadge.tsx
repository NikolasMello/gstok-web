import type { AnyFieldApi } from '@tanstack/react-form'

import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useObjectUrl } from '@/hooks/useObjectUrl'

/** Avatar grande com badge de câmera sobreposto, estilo redes sociais. */
export function CampoFotoAvatarComBadge({ field }: { field: AnyFieldApi }) {
  const file = field.state.value as File | undefined
  const previewUrl = useObjectUrl(file)

  return (
    <Stack spacing={1.5} sx={{ alignItems: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <Avatar src={previewUrl} sx={{ width: 96, height: 96, fontSize: 32 }} />
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
            onChange={(event) => field.handleChange(event.target.files?.[0])}
          />
        </IconButton>
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', maxWidth: 240 }}>
        Prefira fotos quadradas (proporção 1:1) para um melhor resultado.
      </Typography>
    </Stack>
  )
}
