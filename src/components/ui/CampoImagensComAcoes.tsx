import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded'
import CloseRounded from '@mui/icons-material/CloseRounded'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useObjectUrls } from '@/hooks/useObjectUrls'

type CampoImagensComAcoesProps = {
  value: File[]
  onChange: (files: File[]) => void
}

/** Upload de imagens por clique ou drag and drop, com lista de miniaturas e remoção individual. */
export function CampoImagensComAcoes({ value, onChange }: CampoImagensComAcoesProps) {
  const previewUrls = useObjectUrls(value)

  const adicionarArquivos = (arquivos: FileList) => {
    const novos = Array.from(arquivos).filter((arquivo) => arquivo.type.startsWith('image/'))
    if (novos.length > 0) onChange([...value, ...novos])
  }

  return (
    <Stack spacing={2}>
      <Box
        component="label"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault()
          adicionarArquivos(event.dataTransfer.files)
        }}
        sx={(t) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.5,
          p: 4,
          borderRadius: 3,
          border: `1px dashed ${(t.vars || t).palette.divider}`,
          cursor: 'pointer',
          textAlign: 'center',
          transition: 'border-color .15s, background-color .15s',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'action.hover',
          },
        })}
      >
        <AddPhotoAlternateRoundedIcon color="action" />
        <Typography variant="body2" color="text.secondary">
          Arraste imagens aqui ou clique para selecionar
        </Typography>
        <Typography variant="caption" color="text.secondary">
          PNG ou JPG
        </Typography>
        <input
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(event) => {
            if (event.target.files) adicionarArquivos(event.target.files)
            event.target.value = ''
          }}
        />
      </Box>

      {value.length > 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
            gap: 1.5,
          }}
        >
          {value.map((arquivo, index) => (
            <Box
              key={`${arquivo.name}-${arquivo.lastModified}-${index}`}
              sx={(t) => ({
                position: 'relative',
                aspectRatio: '1 / 1',
                borderRadius: 2,
                overflow: 'hidden',
                border: `1px solid ${(t.vars || t).palette.divider}`,
                '&:hover .imagem-overlay': { opacity: 1 },
              })}
            >
              <Box
                component="img"
                src={previewUrls[index]}
                alt={arquivo.name}
                sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {index === 0 && (
                <Chip
                  label="Principal"
                  size="small"
                  color="primary"
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    height: 20,
                    fontSize: 11,
                  }}
                />
              )}
              <Box
                className="imagem-overlay"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  opacity: 0,
                  transition: 'opacity .15s',
                }}
              >
                <IconButton
                  size="small"
                  aria-label={`Remover ${arquivo.name}`}
                  onClick={() => onChange(value.filter((_, i) => i !== index))}
                  sx={{
                    color: 'common.white',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                  }}
                >
                  <CloseRounded fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Stack>
  )
}
