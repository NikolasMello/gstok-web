import { useState } from 'react'

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

import CloseRounded from '@mui/icons-material/CloseRounded'
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useNotification } from '@/context/NotificacaoProvider'
import type { ImagemProdutoResponseDto } from '@/service/imagemProduto/ResponseDTOs'

import { useExcluirImagemMutation } from '../hooks/useExcluirImagemMutation'
import { useReordenarImagensMutation } from '../hooks/useReordenarImagensMutation'

type ImagemSortableCardProps = {
  imagem: ImagemProdutoResponseDto
  principal: boolean
  onExcluir: () => void
}

function ImagemSortableCard({ imagem, principal, onExcluir }: ImagemSortableCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: imagem.id_imagem_produto,
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
          aria-label="Reordenar imagem"
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
          aria-label="Excluir imagem"
          onClick={onExcluir}
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

type ImagensProdutoTabProps = {
  produtoId: string
  imagens: ImagemProdutoResponseDto[]
}

/** Reordenação e exclusão de imagens já persistidas de um produto, com miniaturas na variant thumbnail. */
export default function ImagensProdutoTab({ produtoId, imagens }: ImagensProdutoTabProps) {
  const { notifySuccess } = useNotification()
  const reordenarImagensMutation = useReordenarImagensMutation(produtoId)
  const excluirImagemMutation = useExcluirImagemMutation(produtoId)

  const [imagensSincronizadas, setImagensSincronizadas] = useState(imagens)
  const [itens, setItens] = useState(imagens)
  const [imagemParaExcluir, setImagemParaExcluir] = useState<ImagemProdutoResponseDto | null>(null)

  /** Ressincroniza o estado local (drag/otimista) quando os dados do produto são recarregados. */
  if (imagens !== imagensSincronizadas) {
    setImagensSincronizadas(imagens)
    setItens(imagens)
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return

    const oldIndex = itens.findIndex((imagem) => imagem.id_imagem_produto === active.id)
    const newIndex = itens.findIndex((imagem) => imagem.id_imagem_produto === over.id)
    if (oldIndex === -1 || newIndex === -1) return

    const reordenados = arrayMove(itens, oldIndex, newIndex)
    setItens(reordenados)

    reordenarImagensMutation.mutate(
      {
        ordens: reordenados.map((imagem, index) => ({
          imagem_produto_id: imagem.id_imagem_produto,
          sq_ordem: index,
        })),
      },
      {
        onError: () => setItens(imagens),
      },
    )
  }

  const handleExcluir = () => {
    if (!imagemParaExcluir) return

    excluirImagemMutation.mutate(imagemParaExcluir.id_imagem_produto, {
      onSuccess: () => {
        notifySuccess('Imagem excluída com sucesso.')
        setImagemParaExcluir(null)
      },
    })
  }

  if (itens.length === 0) {
    return (
      <Typography color="text.secondary">
        Este produto ainda não tem imagens cadastradas.
      </Typography>
    )
  }

  return (
    <Stack spacing={2}>
      <Typography variant="body2" color="text.secondary">
        Arraste para reordenar. A primeira imagem é a principal do produto.
      </Typography>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={itens.map((imagem) => imagem.id_imagem_produto)}
          strategy={rectSortingStrategy}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: 2,
            }}
          >
            {itens.map((imagem, index) => (
              <ImagemSortableCard
                key={imagem.id_imagem_produto}
                imagem={imagem}
                principal={index === 0}
                onExcluir={() => setImagemParaExcluir(imagem)}
              />
            ))}
          </Box>
        </SortableContext>
      </DndContext>

      <Dialog
        open={Boolean(imagemParaExcluir)}
        onClose={() => setImagemParaExcluir(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Excluir imagem</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir esta imagem? Essa ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImagemParaExcluir(null)} disabled={excluirImagemMutation.isPending}>
            Cancelar
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleExcluir}
            loading={excluirImagemMutation.isPending}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}
