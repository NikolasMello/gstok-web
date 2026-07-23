import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { useNotification } from '@/context/NotificacaoProvider'
import type { TipoProdutoResponseDto } from '@/service/tipoProduto/ResponseDTOs'

import { useDeleteTipoProdutoMutation } from '../../hooks/useDeleteTipoProdutoMutation'

type ExcluirTipoProdutoDialogProps = {
  /** Tipo a excluir; o dialog fica aberto enquanto for diferente de null. */
  tipo: TipoProdutoResponseDto | null
  onClose: () => void
  /** Chamado após a exclusão ser confirmada com sucesso, antes de onClose. */
  onExcluido?: () => void
}

export default function ExcluirTipoProdutoDialog({
  tipo,
  onClose,
  onExcluido,
}: ExcluirTipoProdutoDialogProps) {
  const { notifySuccess } = useNotification()
  const deleteTipoProdutoMutation = useDeleteTipoProdutoMutation()

  const handleConfirm = () => {
    if (!tipo) return

    deleteTipoProdutoMutation.mutate(tipo.id_tipo_produto, {
      onSuccess: () => {
        notifySuccess('Tipo de produto excluído com sucesso.')
        onExcluido?.()
        onClose()
      },
    })
  }

  return (
    <Dialog open={Boolean(tipo)} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Excluir tipo de produto</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja excluir <strong>{tipo?.nm_tipo}</strong>? Essa ação não pode ser
          desfeita.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={deleteTipoProdutoMutation.isPending} type="button">
          Cancelar
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleConfirm}
          loading={deleteTipoProdutoMutation.isPending}
          type="button"
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  )
}
