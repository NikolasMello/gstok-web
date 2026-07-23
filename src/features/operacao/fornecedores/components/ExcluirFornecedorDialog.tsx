import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { useNotification } from '@/context/NotificacaoProvider'
import type { FornecedorResponseDto } from '@/service/fornecedor/ResponseDTOs'

import { useDeleteFornecedorMutation } from '../hooks/useDeleteFornecedorMutation'

type ExcluirFornecedorDialogProps = {
  /** Fornecedor a excluir; o dialog fica aberto enquanto for diferente de null. */
  fornecedor: FornecedorResponseDto | null
  onClose: () => void
}

export default function ExcluirFornecedorDialog({ fornecedor, onClose }: ExcluirFornecedorDialogProps) {
  const { notifySuccess } = useNotification()
  const deleteFornecedorMutation = useDeleteFornecedorMutation()

  const nome = fornecedor?.nm_fantasia || fornecedor?.nm_empresa

  const handleConfirm = () => {
    if (!fornecedor) return

    deleteFornecedorMutation.mutate(fornecedor.id_fornecedor, {
      onSuccess: () => {
        notifySuccess('Fornecedor excluído com sucesso.')
        onClose()
      },
    })
  }

  return (
    <Dialog open={Boolean(fornecedor)} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Excluir fornecedor</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja excluir <strong>{nome}</strong>? Essa ação não pode ser desfeita.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={deleteFornecedorMutation.isPending}>
          Cancelar
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleConfirm}
          loading={deleteFornecedorMutation.isPending}
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  )
}
