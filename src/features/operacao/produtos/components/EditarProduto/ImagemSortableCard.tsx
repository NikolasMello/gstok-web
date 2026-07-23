import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import CloseRounded from '@mui/icons-material/CloseRounded'
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'

import type { ImagemProdutoResponseDto } from '@/service/imagemProduto/ResponseDTOs'

type ImagemSortableCardProps = {
  imagem: ImagemProdutoResponseDto
  principal: boolean
  onExcluir: () => void
}

export default function ImagemSortableCard({ imagem, principal, onExcluir }: ImagemSortableCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: imagem.id_imagem_produto,
  })

  return (
    <Box
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      sx={(t) => ({
        opacity: isDragging ? 0.5 : 1,
        border: `1px solid ${(t.vars || t).palette.divider}`,
        borderRadius: t.spacing(3),
      })}
    >
      <Stack direction="row" sx={{ justifyContent: 'space-between', p: 1 }}>
        <Tooltip title="Reordenar">
          <IconButton
            size="small"
            aria-label="Reordenar imagem"
            {...attributes}
            {...listeners}
            sx={{ touchAction: 'none', cursor: 'grab' }}
          >
            <DragIndicatorRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Excluir">
          <IconButton size="small" aria-label="Excluir imagem" onClick={onExcluir}>
            <CloseRounded fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>

      <Box
        sx={(t) => ({
          position: 'relative',
          aspectRatio: '1 / 1',
          borderRadius: t.spacing(0, 0, 3, 3),
          overflow: 'hidden',
          border: `1px solid ${(t.vars || t).palette.divider}`,
        })}
      >
        <Box
          component="img"
          src={imagem.thumbnail.url}
          alt={imagem.ds_caption ?? ''}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {principal && (
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
      </Box>
    </Box>
  )
}
