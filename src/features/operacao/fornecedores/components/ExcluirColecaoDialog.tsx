import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { useNotification } from '@/context/NotificacaoProvider'

import { useDeleteColecaoMutation } from '../hooks/useDeleteColecaoMutation'

type ColecaoParaExcluir = {
  id_colecao: string
  nm_colecao: string
}

type ExcluirColecaoDialogProps = {
  fornecedorId: string
  /** Coleção a excluir; o dialog fica aberto enquanto for diferente de null. */
  colecao: ColecaoParaExcluir | null
  onClose: () => void
}

export default function ExcluirColecaoDialog({
  fornecedorId,
  colecao,
  onClose,
}: ExcluirColecaoDialogProps) {
  const { notifySuccess, notifyError } = useNotification()
  const deleteColecaoMutation = useDeleteColecaoMutation(fornecedorId)

  const handleConfirm = () => {
    if (!colecao) return

    deleteColecaoMutation.mutate(colecao.id_colecao, {
      onSuccess: () => {
        notifySuccess('Coleção excluída com sucesso.')
        onClose()
      },
      onError: () => {
        notifyError('Não foi possível excluir a coleção. Tente novamente.')
      },
    })
  }

  return (
    <Dialog open={Boolean(colecao)} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Excluir coleção</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja excluir <strong>{colecao?.nm_colecao}</strong>? Essa ação não pode
          ser desfeita.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={deleteColecaoMutation.isPending} type="button">
          Cancelar
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleConfirm}
          loading={deleteColecaoMutation.isPending}
          type="button"
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  )
}
