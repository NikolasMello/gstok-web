import { useMemo } from 'react'

import type { DragEndEvent } from '@dnd-kit/core'
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded'
import CloseRounded from '@mui/icons-material/CloseRounded'
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded'
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

/** Identidade estável do arquivo entre renders, usada pelo dnd-kit para rastrear o item durante o drag. */
function idDoArquivo(arquivo: File) {
  return `${arquivo.name}::${arquivo.size}::${arquivo.lastModified}`
}

type ImagemSortableItemProps = {
  id: string
  arquivo: File
  previewUrl: string
  principal: boolean
  onRemover: () => void
}

function ImagemSortableItem({
  id,
  arquivo,
  previewUrl,
  principal,
  onRemover,
}: ImagemSortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  return (
    <Box
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      sx={(t) => ({
        position: 'relative',
        aspectRatio: '1 / 1',
        borderRadius: 2,
        overflow: 'hidden',
        border: `1px solid ${(t.vars || t).palette.divider}`,
        opacity: isDragging ? 0.5 : 1,
        '&:hover .imagem-overlay': { opacity: 1 },
      })}
    >
      <Box
        component="img"
        src={previewUrl}
        alt={arquivo.name}
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
      <Box
        className="imagem-overlay"
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.5,
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          opacity: 0,
          transition: 'opacity .15s',
        }}
      >
        <IconButton
          size="small"
          aria-label={`Reordenar ${arquivo.name}`}
          {...attributes}
          {...listeners}
          sx={{
            color: 'common.white',
            touchAction: 'none',
            cursor: 'grab',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
          }}
        >
          <DragIndicatorRoundedIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          aria-label={`Remover ${arquivo.name}`}
          onClick={onRemover}
          sx={{
            color: 'common.white',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
          }}
        >
          <CloseRounded fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  )
}

/** Upload de imagens por clique ou drag and drop de arquivos, com miniaturas reordenáveis (drag and drop) e remoção individual. */
export function CampoImagensComAcoes({ value, onChange }: CampoImagensComAcoesProps) {
  const previewUrls = useObjectUrls(value)
  const ids = useMemo(() => value.map(idDoArquivo), [value])
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const adicionarArquivos = (arquivos: FileList) => {
    const novos = Array.from(arquivos).filter((arquivo) => arquivo.type.startsWith('image/'))
    if (novos.length > 0) onChange([...value, ...novos])
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return

    const oldIndex = ids.indexOf(String(active.id))
    const newIndex = ids.indexOf(String(over.id))
    if (oldIndex === -1 || newIndex === -1) return

    onChange(arrayMove(value, oldIndex, newIndex))
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
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={ids} strategy={rectSortingStrategy}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
                gap: 1.5,
              }}
            >
              {value.map((arquivo, index) => (
                <ImagemSortableItem
                  key={ids[index]}
                  id={ids[index]}
                  arquivo={arquivo}
                  previewUrl={previewUrls[index]}
                  principal={index === 0}
                  onRemover={() => onChange(value.filter((_, i) => i !== index))}
                />
              ))}
            </Box>
          </SortableContext>
        </DndContext>
      )}
    </Stack>
  )
}
