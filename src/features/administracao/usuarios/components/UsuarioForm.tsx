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
import { CampoFotoComAcoes } from '@/components/ui/CampoFotoComAcoes'

import type { UsuarioFormValues } from '../schemas/usuarioSchema'
import { usuarioCreateSchema, usuarioEditSchema } from '../schemas/usuarioSchema'

type UsuarioFormProps = {
  mode: 'create' | 'edit'
  title: string
  defaultValues: UsuarioFormValues
  fotoUrlAtual?: string
  isSubmitting?: boolean
  onSubmit: (value: UsuarioFormValues) => void
}

export default function UsuarioForm({
  mode,
  title,
  defaultValues,
  fotoUrlAtual,
  isSubmitting = false,
  onSubmit,
}: UsuarioFormProps) {
  const isEdicao = mode === 'edit'

  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues,
    validators: {
      onChange: isEdicao ? usuarioEditSchema : usuarioCreateSchema,
    },
    onSubmit: ({ value }) => onSubmit(value),
  })

  return (
    <LayoutPagina title={title}>
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
              <Grid size={{ xs: 12, sm: isEdicao ? 12 : 6 }}>
                <Field name="nm_email">
                  {(field) => (
                    <FormTextField
                      field={field}
                      label="E-mail"
                      type="email"
                      required
                      fullWidth
                      autoComplete="email"
                      disabled={isEdicao}
                    />
                  )}
                </Field>
              </Grid>
              {!isEdicao && (
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
              )}
            </Grid>
          </Stack>

          <Divider />

          <Stack spacing={3}>
            <Typography variant="h6">Dados pessoais</Typography>
            <Field name="foto">
              {(field) => (
                <CampoFotoComAcoes
                  value={field.state.value}
                  onChange={field.handleChange}
                  fotoUrlAtual={fotoUrlAtual}
                />
              )}
            </Field>
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
            <Subscribe selector={(state) => state.isValid && !state.isPristine}>
              {(canSubmit) => (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!canSubmit}
                  loading={isSubmitting}
                >
                  {isEdicao ? 'Salvar alterações' : 'Criar usuário'}
                </Button>
              )}
            </Subscribe>
          </Stack>
        </Box>
      </Card>
    </LayoutPagina>
  )
}
