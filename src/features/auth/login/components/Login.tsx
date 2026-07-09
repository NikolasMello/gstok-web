import * as React from 'react'

import { useForm } from '@tanstack/react-form'
import { Link as RouterLink } from '@tanstack/react-router'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import CampoTexto from '@/components/form/CampoTexto'
import { CartaoAutenticacao, ContainerAutenticacao } from '@/components/ui/CartaoAutenticacao'
import { IconeMarca } from '@/components/ui/IconesPersonalizados'
import { HttpError, isApiError } from '@/service/http'

import { useLoginMutation } from '../hooks/useLoginMutation'
import { signInSchema } from '../schemas/signInSchema'
import EsqueciSenha from './EsqueciSenha'

export default function Login() {
  const [open, setOpen] = React.useState(false)
  const loginMutation = useLoginMutation()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: signInSchema,
    },
    onSubmit: ({ value }) => {
      loginMutation.mutate({ nm_email: value.email, ds_senha: value.password })
    },
  })

  const formError = loginMutation.error
    ? (() => {
        const data = loginMutation.error instanceof HttpError ? loginMutation.error.data : undefined
        return isApiError(data)
          ? data.mensagem
          : 'Não foi possível entrar. Verifique suas credenciais.'
      })()
    : null

  return (
    <ContainerAutenticacao direction="column" sx={{ justifyContent: 'space-between' }}>
      <CartaoAutenticacao variant="outlined">
        <IconeMarca />
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', mb: 4 }}
        >
          Entrar
        </Typography>
        <Box
          component="form"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void handleSubmit()
          }}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 3,
          }}
        >
          <Field name="email">
            {(field) => (
              <CampoTexto
                field={field}
                label="E-mail"
                type="email"
                placeholder="seuemail@exemplo.com"
                autoComplete="email"
                required
                fullWidth
                variant="outlined"
              />
            )}
          </Field>

          <Field name="password">
            {(field) => (
              <CampoTexto
                field={field}
                label="Senha"
                placeholder="••••••"
                type="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
              />
            )}
          </Field>

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar de mim"
          />
          <EsqueciSenha open={open} handleClose={handleClose} />
          {formError && <Alert severity="error">{formError}</Alert>}
          <Subscribe selector={(state) => state.canSubmit}>
            {(canSubmit) => (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!canSubmit || loginMutation.isPending}
                loading={loginMutation.isPending}
              >
                Entrar
              </Button>
            )}
          </Subscribe>
          <Link
            component="button"
            type="button"
            onClick={handleClickOpen}
            variant="body2"
            sx={{ alignSelf: 'center' }}
          >
            Esqueceu sua senha?
          </Link>
          <Link
            component={RouterLink}
            href="/cadastro"
            variant="body2"
            sx={{ alignSelf: 'center' }}
          >
            Não tem uma conta? Cadastre-se
          </Link>
        </Box>
      </CartaoAutenticacao>
    </ContainerAutenticacao>
  )
}
