import * as React from 'react'
import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import MuiCard from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import ForgotPassword from './ForgotPassword'
import { SitemarkIcon } from './CustomIcons'
import ColorModeSelect from '../../../theme/ColorModeSelect'
import { signInSchema } from '../schemas/signInSchema'
import { useLoginMutation } from '../hooks/useLoginMutation'
import { HttpError, isApiError } from '../../../service/http'

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}))

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage: 'radial-gradient(at 50% 50%, hsla(350, 100%, 16%, 0.50), hsl(345, 31%, 5%))',
    }),
  },
}))

export default function SignIn() {
  const [open, setOpen] = React.useState(false)
  const [formError, setFormError] = React.useState<string | null>(null)
  const navigate = useNavigate()
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
    onSubmit: async ({ value }) => {
      setFormError(null)
      try {
        await loginMutation.mutateAsync({ nm_email: value.email, ds_senha: value.password })
        await navigate({ to: '/admin' })
      } catch (error) {
        const data = error instanceof HttpError ? error.data : undefined
        setFormError(
          isApiError(data) ? data.mensagem : 'Não foi possível entrar. Verifique suas credenciais.',
        )
      }
    },
  })

  return (
    <SignInContainer direction="column" sx={{ justifyContent: 'space-between' }}>
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <Card variant="outlined">
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
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" fullWidth variant="contained" disabled={!canSubmit}>
                {isSubmitting ? 'Entrando...' : 'Entrar'}
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
        </Box>
      </Card>
    </SignInContainer>
  )
}
