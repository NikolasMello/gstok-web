import { useState } from 'react'

import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded'
import CloseRounded from '@mui/icons-material/CloseRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useObjectUrls } from '@/hooks/useObjectUrls'

/** Identidade estável do arquivo entre renders, usada como key da preview. */
function idDoArquivo(arquivo: File) {
  return `${arquivo.name}::${arquivo.size}::${arquivo.lastModified}`
}

/**
 * Seleção de novas imagens para o produto, com preview e remoção antes do envio.
 * TODO: falta o service/mutation de upload (ex.: POST /produto/{id}/imagens multipart) —
 * o botão "Enviar" ainda não dispara nenhuma chamada à API, só junta os arquivos localmente.
 */
export default function AdicionarImagensProduto() {
  const [arquivosPendentes, setArquivosPendentes] = useState<File[]>([])
  const previewUrls = useObjectUrls(arquivosPendentes)

  const adicionarArquivos = (arquivos: FileList) => {
    const novos = Array.from(arquivos).filter((arquivo) => arquivo.type.startsWith('image/'))
    if (novos.length > 0) setArquivosPendentes((atual) => [...atual, ...novos])
  }

  const removerArquivo = (index: number) => {
    setArquivosPendentes((atual) => atual.filter((_, i) => i !== index))
  }

  const handleEnviar = () => {
    // TODO: chamar useAdicionarImagensMutation(produtoId) com arquivosPendentes quando o service existir.
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
          p: 3,
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

      {arquivosPendentes.length > 0 && (
        <>
          <Grid container spacing={2}>
            {arquivosPendentes.map((arquivo, index) => (
              <Grid key={idDoArquivo(arquivo)} size={{ xs: 6, sm: 4, md: 3 }}>
                <Box
                  sx={(t) => ({
                    position: 'relative',
                    aspectRatio: '1 / 1',
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: `1px solid ${(t.vars || t).palette.divider}`,
                  })}
                >
                  <Box
                    component="img"
                    src={previewUrls[index]}
                    alt={arquivo.name}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <IconButton
                    size="small"
                    aria-label={`Remover ${arquivo.name}`}
                    onClick={() => removerArquivo(index)}
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      bgcolor: 'rgba(0, 0, 0, 0.5)',
                      color: 'common.white',
                      '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
                    }}
                  >
                    <CloseRounded fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleEnviar}>
              Enviar {arquivosPendentes.length}{' '}
              {arquivosPendentes.length === 1 ? 'imagem' : 'imagens'}
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  )
}
