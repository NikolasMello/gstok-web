import { useForm } from '@tanstack/react-form'
import { Link as RouterLink } from '@tanstack/react-router'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import FormTextField from '@/components/form/FormTextField'
import { CpfMaskedInput, TelefoneMaskedInput } from '@/components/form/masks'
import LayoutPagina from '@/components/layout/LayoutPagina'

import { useCreateUsuarioAdminMutation } from '../hooks/useCreateUsuarioAdminMutation'
import { usuarioAdminSchema } from '../schemas/usuarioAdminSchema'
import { CampoFotoComAcoes } from './CampoFotoComAcoes'

export default function NovoUsuario() {
  const createUsuarioAdminMutation = useCreateUsuarioAdminMutation()

  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      nm_pessoa: '',
      nm_sobrenome: '',
      nm_email: '',
      nm_email_contato: '',
      nm_telefone: '',
      cd_inscricao_nacional: '',
      ds_senha: '',
      foto: undefined as File | undefined,
    },
    validators: {
      onChange: usuarioAdminSchema,
    },
    onSubmit: ({ value }) => {
      createUsuarioAdminMutation.mutate({
        nm_email: value.nm_email,
        ds_senha: value.ds_senha,
        cd_inscricao_nacional: value.cd_inscricao_nacional,
        nm_pessoa: value.nm_pessoa,
        nm_sobrenome: value.nm_sobrenome,
        nm_telefone: value.nm_telefone,
        nm_email_contato: value.nm_email_contato,
        foto: value.foto,
      })
    },
  })

  return (
    <LayoutPagina title="Novo usuário">
      <Card variant="outlined" sx={{ p: 3 }}>
        <Box
          component="form"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void handleSubmit()
          }}
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
        >
          <Stack spacing={3}>
            <Typography variant="h6">Credenciais de acesso</Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name="nm_email">
                  {(field) => (
                    <FormTextField
                      field={field}
                      label="E-mail"
                      type="email"
                      required
                      fullWidth
                      autoComplete="email"
                    />
                  )}
                </Field>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name="ds_senha">
                  {(field) => (
                    <FormTextField
                      field={field}
                      label="Senha"
                      type="password"
                      required
                      fullWidth
                      autoComplete="new-password"
                    />
                  )}
                </Field>
              </Grid>
            </Grid>
          </Stack>

          <Divider />

          <Stack spacing={3}>
            <Typography variant="h6">Dados pessoais</Typography>
            <Field name="foto">{(field) => <CampoFotoComAcoes field={field} />}</Field>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name="nm_pessoa">
                  {(field) => (
                    <FormTextField
                      field={field}
                      label="Nome"
                      required
                      fullWidth
                      autoComplete="given-name"
                    />
                  )}
                </Field>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name="nm_sobrenome">
                  {(field) => (
                    <FormTextField
                      field={field}
                      label="Sobrenome"
                      required
                      fullWidth
                      autoComplete="family-name"
                    />
                  )}
                </Field>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name="cd_inscricao_nacional">
                  {(field) => (
                    <FormTextField
                      field={field}
                      label="CPF"
                      required
                      fullWidth
                      autoComplete="off"
                      slotProps={{ input: { inputComponent: CpfMaskedInput } }}
                    />
                  )}
                </Field>
              </Grid>
            </Grid>
          </Stack>

          <Divider />

          <Stack spacing={3}>
            <Typography variant="h6">Contato</Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name="nm_email_contato">
                  {(field) => (
                    <FormTextField
                      field={field}
                      label="E-mail de contato"
                      type="email"
                      required
                      fullWidth
                      autoComplete="off"
                    />
                  )}
                </Field>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name="nm_telefone">
                  {(field) => (
                    <FormTextField
                      field={field}
                      label="Telefone"
                      required
                      fullWidth
                      autoComplete="tel"
                      slotProps={{ input: { inputComponent: TelefoneMaskedInput } }}
                    />
                  )}
                </Field>
              </Grid>
            </Grid>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
            <Button component={RouterLink} to="/admin/usuarios" variant="text">
              Cancelar
            </Button>
            <Subscribe selector={(state) => state.canSubmit && !state.isPristine}>
              {(canSubmit) => (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!canSubmit}
                  loading={createUsuarioAdminMutation.isPending}
                >
                  Criar usuário
                </Button>
              )}
            </Subscribe>
          </Stack>
        </Box>
      </Card>
    </LayoutPagina>
  )
}
