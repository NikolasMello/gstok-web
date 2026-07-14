import { useForm } from '@tanstack/react-form'
import { Link as RouterLink } from '@tanstack/react-router'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

import FormTextField from '@/components/form/FormTextField'
import { CnpjMaskedInput } from '@/components/form/masks'

import type { FornecedorFormValues } from '../schemas/fornecedorSchema'
import { fornecedorSchema } from '../schemas/fornecedorSchema'

type FornecedorFormProps = {
  mode: 'create' | 'edit'
  defaultValues: FornecedorFormValues
  isSubmitting?: boolean
  onSubmit: (value: FornecedorFormValues) => void
}

export default function FornecedorForm({ mode, defaultValues, isSubmitting = false, onSubmit }: FornecedorFormProps) {
  const isEdicao = mode === 'edit'

  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues,
    validators: {
      onChange: fornecedorSchema,
    },
    onSubmit: ({ value }) => onSubmit(value),
  })

  return (
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
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Field name="cd_cnpj">
                {(field) => (
                  <FormTextField
                    field={field}
                    label="CNPJ"
                    required
                    fullWidth
                    autoComplete="off"
                    slotProps={{ input: { inputComponent: CnpjMaskedInput } }}
                  />
                )}
              </Field>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Field name="nm_empresa">
                {(field) => (
                  <FormTextField field={field} label="Razão social" required fullWidth autoComplete="organization" />
                )}
              </Field>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Field name="nm_fantasia">
                {(field) => <FormTextField field={field} label="Nome fantasia" fullWidth autoComplete="off" />}
              </Field>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Field name="nm_marca">
                {(field) => <FormTextField field={field} label="Marca" fullWidth autoComplete="off" />}
              </Field>
            </Grid>
          </Grid>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
          <Button component={RouterLink} to="/admin/fornecedores" variant="text">
            Cancelar
          </Button>
          <Subscribe selector={(state) => state.isValid && !state.isPristine}>
            {(canSubmit) => (
              <Button type="submit" variant="contained" disabled={!canSubmit} loading={isSubmitting}>
                {isEdicao ? 'Salvar alterações' : 'Criar fornecedor'}
              </Button>
            )}
          </Subscribe>
        </Stack>
      </Box>
    </Card>
  )
}
