import { useForm } from '@tanstack/react-form'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

import FormTextField from '@/components/form/FormTextField'
import { TelefoneMaskedInput } from '@/components/form/masks'
import { CampoFotoComAcoes } from '@/components/ui/CampoFotoComAcoes'

import type { DadosPessoaisFormValues } from '../schemas/dadosPessoaisSchema'
import { dadosPessoaisSchema } from '../schemas/dadosPessoaisSchema'

type PerfilFormProps = {
  defaultValues: DadosPessoaisFormValues
  fotoUrlAtual?: string
  isSubmitting?: boolean
  onSubmit: (value: DadosPessoaisFormValues) => void
  onCancel: () => void
}

export default function PerfilForm({
  defaultValues,
  fotoUrlAtual,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: PerfilFormProps) {
  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues,
    validators: {
      onChange: dadosPessoaisSchema,
    },
    onSubmit: ({ value }) => onSubmit(value),
  })

  return (
    <Box
      component="form"
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        void handleSubmit()
      }}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
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

      <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
        <Button onClick={onCancel} variant="text" disabled={isSubmitting}>
          Cancelar
        </Button>
        <Subscribe selector={(state) => state.isValid && !state.isPristine}>
          {(canSubmit) => (
            <Button type="submit" variant="contained" disabled={!canSubmit} loading={isSubmitting}>
              Salvar alterações
            </Button>
          )}
        </Subscribe>
      </Stack>
    </Box>
  )
}
