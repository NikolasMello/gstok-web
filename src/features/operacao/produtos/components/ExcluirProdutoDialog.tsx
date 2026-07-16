import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { useNotification } from '@/context/NotificacaoProvider'
import type { ProdutoResumoResponseDto } from '@/service/produto/ResponseDTOs'

import { useDeleteProdutoMutation } from '../hooks/useDeleteProdutoMutation'

type ExcluirProdutoDialogProps = {
  /** Produto a excluir; o dialog fica aberto enquanto for diferente de null. */
  produto: ProdutoResumoResponseDto | null
  onClose: () => void
}

export default function ExcluirProdutoDialog({ produto, onClose }: ExcluirProdutoDialogProps) {
  const { notifySuccess, notifyError } = useNotification()
  const deleteProdutoMutation = useDeleteProdutoMutation()

  const handleConfirm = () => {
    if (!produto) return

    deleteProdutoMutation.mutate(produto.id_produto, {
      onSuccess: () => {
        notifySuccess('Produto excluído com sucesso.')
        onClose()
      },
      onError: () => {
        notifyError('Não foi possível excluir o produto. Tente novamente.')
      },
    })
  }

  return (
    <Dialog open={Boolean(produto)} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Excluir produto</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja excluir <strong>{produto?.nm_produto}</strong>? Essa ação não pode
          ser desfeita.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={deleteProdutoMutation.isPending}>
          Cancelar
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleConfirm}
          loading={deleteProdutoMutation.isPending}
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  )
}
