import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useObjectUrl } from '@/hooks/useObjectUrl'

type CampoFotoDropzoneProps = {
  value: File | undefined
  onChange: (file: File | undefined) => void
  /** Foto já salva; exibida enquanto nenhum arquivo novo é selecionado. */
  fotoUrlAtual?: string
}

/** Cartão inteiro clicável (dropzone), com destaque de borda ao passar o mouse. */
export function CampoFotoDropzone({ value, onChange, fotoUrlAtual }: CampoFotoDropzoneProps) {
  const previewUrl = useObjectUrl(value)
  const avatarSrc = previewUrl ?? fotoUrlAtual

  return (
    <Stack
      component="label"
      direction="row"
      spacing={2}
      sx={(t) => ({
        alignItems: 'center',
        p: 2,
        borderRadius: 3,
        border: `1.5px dashed ${(t.vars || t).palette.divider}`,
        cursor: 'pointer',
        transition: 'border-color 0.2s, background-color 0.2s',
        '&:hover': {
          borderColor: (t.vars || t).palette.primary.main,
          bgcolor: (t.vars || t).palette.action.hover,
        },
      })}
    >
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => onChange(event.target.files?.[0])}
      />
      {avatarSrc ? (
        <Avatar src={avatarSrc} sx={{ width: 56, height: 56 }} />
      ) : (
        <Stack
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            bgcolor: 'secondary.main',
            color: 'secondary.contrastText',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <AddPhotoAlternateRoundedIcon />
        </Stack>
      )}
      <Stack spacing={0.25}>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {value ? value.name : 'Clique para escolher uma foto'}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          PNG ou JPG, proporção 1:1 recomendada.
        </Typography>
      </Stack>
    </Stack>
  )
}
