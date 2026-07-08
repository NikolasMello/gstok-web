import { useForm } from '@tanstack/react-form'
import { Link as RouterLink } from '@tanstack/react-router'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ColorModeSelect from '../../../../theme/ColorModeSelect'
import { signUpSchema } from '../schemas/signUpSchema'
import { useRegisterMutation } from '../hooks/useRegisterMutation'
import { HttpError, isApiError } from '../../../../service/http'
import { AuthCard, AuthContainer } from '../../../../components/ui/AuthCard'
import { SitemarkIcon } from '../../../../components/ui/CustomIcons'

export default function SignUp() {
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
    <AuthContainer direction="column" sx={{ justifyContent: 'space-between' }}>
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <AuthCard variant="outlined">
        <SitemarkIcon />
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
            {(field) => {
              const hasError = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <TextField
                  label="Nome"
                  error={hasError}
                  helperText={
                    hasError
                      ? field.state.meta.errors.map((error) => error?.message).join(', ')
                      : ''
                  }
                  id={field.name}
                  name={field.name}
                  type="text"
                  placeholder="Seu nome"
                  autoComplete="name"
                  required
                  fullWidth
                  variant="outlined"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  color={hasError ? 'error' : 'primary'}
                />
              )
            }}
          </form.Field>

          <form.Field name="email">
            {(field) => {
              const hasError = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <TextField
                  label="E-mail"
                  error={hasError}
                  helperText={
                    hasError
                      ? field.state.meta.errors.map((error) => error?.message).join(', ')
                      : ''
                  }
                  id={field.name}
                  name={field.name}
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  autoComplete="email"
                  required
                  fullWidth
                  variant="outlined"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  color={hasError ? 'error' : 'primary'}
                />
              )
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const hasError = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <TextField
                  label="Senha"
                  error={hasError}
                  helperText={
                    hasError
                      ? field.state.meta.errors.map((error) => error?.message).join(', ')
                      : ''
                  }
                  name={field.name}
                  placeholder="••••••••"
                  type="password"
                  id={field.name}
                  autoComplete="new-password"
                  required
                  fullWidth
                  variant="outlined"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  color={hasError ? 'error' : 'primary'}
                />
              )
            }}
          </form.Field>

          <form.Field name="confirmPassword">
            {(field) => {
              const hasError = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <TextField
                  label="Confirmar senha"
                  error={hasError}
                  helperText={
                    hasError
                      ? field.state.meta.errors.map((error) => error?.message).join(', ')
                      : ''
                  }
                  name={field.name}
                  placeholder="••••••••"
                  type="password"
                  id={field.name}
                  autoComplete="new-password"
                  required
                  fullWidth
                  variant="outlined"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  color={hasError ? 'error' : 'primary'}
                />
              )
            }}
          </form.Field>

          {formError && <Alert severity="error">{formError}</Alert>}
          <form.Subscribe selector={(state) => state.canSubmit}>
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
      </AuthCard>
    </AuthContainer>
  )
}
