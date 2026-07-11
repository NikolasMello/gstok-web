import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

import { useNotification } from '@/context/NotificacaoProvider'

import { useAtualizarDadosPessoaisMutation } from '../hooks/useAtualizarDadosPessoaisMutation'
import { useDadosPessoaisQuery } from '../hooks/useDadosPessoaisQuery'
import PerfilForm from './PerfilForm'

type PerfilDialogProps = {
  open: boolean
  onClose: () => void
}

function PerfilFormSkeleton() {
  return (
    <Stack sx={{ gap: 3 }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Skeleton variant="circular" width={64} height={64} />
        <Stack spacing={2}>
          <Skeleton variant="rounded" width={280} height={18} />
          <Skeleton variant="rounded" width={120} height={32} />
        </Stack>
      </Stack>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Skeleton variant="rounded" height={56} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Skeleton variant="rounded" height={56} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Skeleton variant="rounded" height={56} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Skeleton variant="rounded" height={56} />
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
        <Skeleton variant="rounded" width={90} height={36} />
        <Skeleton variant="rounded" width={150} height={36} />
      </Stack>
    </Stack>
  )
}

export default function PerfilDialog({ open, onClose }: PerfilDialogProps) {
  const { data, isLoading } = useDadosPessoaisQuery(open)
  const atualizarDadosPessoaisMutation = useAtualizarDadosPessoaisMutation()
  const { notifySuccess, notifyError } = useNotification()

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Perfil</DialogTitle>
      <DialogContent>
        {isLoading || !data ? (
          <PerfilFormSkeleton />
        ) : (
          <PerfilForm
            defaultValues={{
              nm_pessoa: data.nm_pessoa ?? '',
              nm_sobrenome: data.nm_sobrenome ?? '',
              nm_telefone: data.nm_telefone ?? '',
              nm_email_contato: data.nm_email_contato ?? '',
              foto: undefined,
            }}
            fotoUrlAtual={data.foto?.ur_imagem}
            isSubmitting={atualizarDadosPessoaisMutation.isPending}
            onCancel={onClose}
            onSubmit={(value) => {
              atualizarDadosPessoaisMutation.mutate(value, {
                onSuccess: () => {
                  notifySuccess('Perfil atualizado com sucesso.')
                  onClose()
                },
                onError: () => {
                  notifyError('Não foi possível atualizar o perfil. Tente novamente.')
                },
              })
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
