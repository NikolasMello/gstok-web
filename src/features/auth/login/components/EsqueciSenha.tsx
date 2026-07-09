import * as React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import OutlinedInput from '@mui/material/OutlinedInput'

interface EsqueciSenhaProps {
  open: boolean
  handleClose: () => void
}

export default function EsqueciSenha({ open, handleClose }: EsqueciSenhaProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => {
            event.preventDefault()
            handleClose()
          },
          sx: { backgroundImage: 'none' },
        },
      }}
    >
      <DialogTitle>Redefinir senha</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <DialogContentText>
          Informe o endereço de e-mail da sua conta e enviaremos um link para redefinir sua senha.
        </DialogContentText>
        <OutlinedInput
          required
          margin="dense"
          id="email"
          name="email"
          label="Endereço de e-mail"
          placeholder="Endereço de e-mail"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button variant="contained" type="submit">
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
