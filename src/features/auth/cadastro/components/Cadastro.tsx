import { useForm } from '@tanstack/react-form'
import { Link as RouterLink } from '@tanstack/react-router'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import FormTextField from '../../../../components/form/FormTextField'
import { CartaoAutenticacao, ContainerAutenticacao } from '../../../../components/ui/CartaoAutenticacao'
import { IconeMarca } from '../../../../components/ui/IconesPersonalizados'
import { HttpError, isApiError } from '../../../../service/http'
import { useRegisterMutation } from '../hooks/useRegisterMutation'
import { signUpSchema } from '../schemas/signUpSchema'

export default function Cadastro() {
  const registerMutation = useRegisterMutation()

  const form = useForm({
    defaultValues: {
      nome: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onChange: signUpSchema,
    },
    onSubmit: ({ value }) => {
      registerMutation.mutate({
        nm_email: value.email,
        nm_pessoa: value.nome,
        ds_senha: value.password,
      })
    },
  })

  const formError = registerMutation.error
    ? (() => {
        const data = registerMutation.error instanceof HttpError ? registerMutation.error.data : undefined
        return isApiError(data) ? data.mensagem : 'Não foi possível criar sua conta. Tente novamente.'
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
          Criar conta
        </Typography>
        <Box
          component="form"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void form.handleSubmit()
          }}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 3,
          }}
        >
          <form.Field name="nome">
            {(field) => (
              <FormTextField
                field={field}
                label="Nome"
                type="text"
                placeholder="Seu nome"
                autoComplete="name"
                required
                fullWidth
                variant="outlined"
              />
            )}
          </form.Field>

          <form.Field name="email">
            {(field) => (
              <FormTextField
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
          </form.Field>

          <form.Field name="password">
            {(field) => (
              <FormTextField
                field={field}
                label="Senha"
                placeholder="••••••••"
                type="password"
                autoComplete="new-password"
                required
                fullWidth
                variant="outlined"
              />
            )}
          </form.Field>

          <form.Field name="confirmPassword">
            {(field) => (
              <FormTextField
                field={field}
                label="Confirmar senha"
                placeholder="••••••••"
                type="password"
                autoComplete="new-password"
                required
                fullWidth
                variant="outlined"
              />
            )}
          </form.Field>

          {formError && <Alert severity="error">{formError}</Alert>}
          <form.Subscribe selector={(state) => state.canSubmit && !state.isPristine}>
            {(canSubmit) => (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!canSubmit || registerMutation.isPending}
                loading={registerMutation.isPending}
              >
                Criar conta
              </Button>
            )}
          </form.Subscribe>
          <Link component={RouterLink} href="/login" variant="body2" sx={{ alignSelf: 'center' }}>
            Já tem uma conta? Entrar
          </Link>
        </Box>
      </CartaoAutenticacao>
    </ContainerAutenticacao>
  )
}
