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
import { arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable'

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useNotification } from '@/context/NotificacaoProvider'
import type { ImagemProdutoResponseDto } from '@/service/imagemProduto/ResponseDTOs'

import { useExcluirImagemMutation } from '../../hooks/useExcluirImagemMutation'
import { useReordenarImagensMutation } from '../../hooks/useReordenarImagensMutation'
import AdicionarImagensProduto from './AdicionarImagensProduto'
import ImagemSortableCard from './ImagemSortableCard'

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

  return (
    <Stack spacing={2}>
      <AdicionarImagensProduto />

      {itens.length === 0 ? (
        <Typography color="text.secondary">
          Este produto ainda não tem imagens cadastradas.
        </Typography>
      ) : (
        <>
          <Alert severity="info">
            Arraste para reordenar. A primeira imagem é a principal do produto.
          </Alert>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={itens.map((imagem) => imagem.id_imagem_produto)}
              strategy={rectSortingStrategy}
            >
              <Grid container spacing={3}>
                {itens.map((imagem, index) => (
                  <Grid key={imagem.id_imagem_produto} size={{ xs: 6, sm: 4, md: 3 }}>
                    <ImagemSortableCard
                      imagem={imagem}
                      principal={index === 0}
                      onExcluir={() => setImagemParaExcluir(imagem)}
                    />
                  </Grid>
                ))}
              </Grid>
            </SortableContext>
          </DndContext>
        </>
      )}

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
