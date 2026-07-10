import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { useNotification } from '@/context/NotificacaoProvider'
import type { UsuarioResponseDto } from '@/service/usuario/ResponseDTOs'

import { useDeleteUsuarioMutation } from '../hooks/useDeleteUsuarioMutation'

type ExcluirUsuarioDialogProps = {
  /** Usuário a excluir; o dialog fica aberto enquanto for diferente de null. */
  usuario: UsuarioResponseDto | null
  onClose: () => void
}

export default function ExcluirUsuarioDialog({ usuario, onClose }: ExcluirUsuarioDialogProps) {
  const { notifySuccess, notifyError } = useNotification()
  const deleteUsuarioMutation = useDeleteUsuarioMutation()

  const nome = usuario ? [usuario.nm_pessoa, usuario.nm_sobrenome].filter(Boolean).join(' ') : ''

  const handleConfirm = () => {
    if (!usuario) return

    deleteUsuarioMutation.mutate(usuario.id_usuario, {
      onSuccess: () => {
        notifySuccess('Usuário excluído com sucesso.')
        onClose()
      },
      onError: () => {
        notifyError('Não foi possível excluir o usuário. Tente novamente.')
      },
    })
  }

  return (
    <Dialog open={Boolean(usuario)} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Excluir usuário</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja excluir <strong>{nome || usuario?.nm_email}</strong>? Essa ação não
          pode ser desfeita.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={deleteUsuarioMutation.isPending}>
          Cancelar
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleConfirm}
          loading={deleteUsuarioMutation.isPending}
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  )
}
