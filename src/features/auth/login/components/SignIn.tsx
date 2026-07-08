import * as React from 'react'
import { useForm } from '@tanstack/react-form'
import { Link as RouterLink } from '@tanstack/react-router'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ForgotPassword from './ForgotPassword'
import ColorModeSelect from '../../../../theme/ColorModeSelect'
import { signInSchema } from '../schemas/signInSchema'
import { useLoginMutation } from '../hooks/useLoginMutation'
import { HttpError, isApiError } from '../../../../service/http'
import { AuthCard, AuthContainer } from '../../../../components/ui/AuthCard'
import { SitemarkIcon } from '../../../../components/ui/CustomIcons'

export default function SignIn() {
  const [open, setOpen] = React.useState(false)
  const loginMutation = useLoginMutation()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const form = useForm({
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
        return isApiError(data) ? data.mensagem : 'Não foi possível entrar. Verifique suas credenciais.'
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
          Entrar
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
                  placeholder="••••••"
                  type="password"
                  id={field.name}
                  autoComplete="current-password"
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

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar de mim"
          />
          <ForgotPassword open={open} handleClose={handleClose} />
          {formError && <Alert severity="error">{formError}</Alert>}
          <form.Subscribe selector={(state) => state.canSubmit}>
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
          </form.Subscribe>
          <Link
            component="button"
            type="button"
            onClick={handleClickOpen}
            variant="body2"
            sx={{ alignSelf: 'center' }}
          >
            Esqueceu sua senha?
          </Link>
          <Link component={RouterLink} href="/cadastro" variant="body2" sx={{ alignSelf: 'center' }}>
            Não tem uma conta? Cadastre-se
          </Link>
        </Box>
      </AuthCard>
    </AuthContainer>
  )
}
