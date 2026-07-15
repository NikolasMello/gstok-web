import type { AnyFieldApi } from '@tanstack/react-form'
import { useForm } from '@tanstack/react-form'
import { Link as RouterLink } from '@tanstack/react-router'

import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded'
import AllInclusiveRoundedIcon from '@mui/icons-material/AllInclusiveRounded'
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'

import FormNumberField from '@/components/form/FormNumberField'
import FormTextField from '@/components/form/FormTextField'
import { CampoImagensComAcoes } from '@/components/ui/CampoImagensComAcoes'
import type { ColecaoResponseDto } from '@/service/colecao/ResponseDTOs'
import type { FornecedorResponseDto } from '@/service/fornecedor/ResponseDTOs'
import type { Estacao } from '@/service/shared/enums'

import { useColecoesQuery } from '../hooks/useColecoesQuery'
import { useFornecedoresQuery } from '../hooks/useFornecedoresQuery'
import type { ProdutoFormValues } from '../schemas/produtoSchema'
import { produtoSchema } from '../schemas/produtoSchema'

type ProdutoFormProps = {
  defaultValues: ProdutoFormValues
  isSubmitting?: boolean
  onSubmit: (value: ProdutoFormValues) => void
}

function erroDoField(field: AnyFieldApi) {
  const hasError = Boolean(field.state.meta.isTouched) && !field.state.meta.isValid
  if (!hasError) return { hasError: false, helperText: '' }
  const errors = field.state.meta.errors as Array<{ message?: string } | undefined>
  return { hasError: true, helperText: errors.map((error) => error?.message).join(', ') }
}

type ColecaoAutocompleteFieldProps = {
  field: AnyFieldApi
  idFornecedorSelecionado: string
}

/**
 * Componente próprio (em vez de chamar useColecoesQuery direto dentro do children de Subscribe)
 * pra manter os hooks presos ao fiber desse componente, não ao do Subscribe.
 */
function ColecaoAutocompleteField({
  field,
  idFornecedorSelecionado,
}: ColecaoAutocompleteFieldProps) {
  const { data: colecoes, isFetching: carregandoColecoes } = useColecoesQuery(
    idFornecedorSelecionado || undefined,
  )
  const colecaoSelecionada =
    colecoes?.find((colecao) => colecao.id_colecao === field.state.value) ?? null
  const { hasError, helperText } = erroDoField(field)

  return (
    <Autocomplete<ColecaoResponseDto>
      options={colecoes ?? []}
      value={colecaoSelecionada}
      loading={carregandoColecoes}
      disabled={!idFornecedorSelecionado}
      getOptionLabel={(colecao) => colecao.nm_colecao}
      isOptionEqualToValue={(option, value) => option.id_colecao === value.id_colecao}
      onChange={(_, novoValor) => field.handleChange(novoValor?.id_colecao ?? '')}
      onBlur={field.handleBlur}
      noOptionsText="Nenhuma coleção encontrada"
      renderInput={(params) => (
        <TextField
          {...params}
          label="Coleção"
          required
          error={hasError}
          helperText={
            helperText || (!idFornecedorSelecionado ? 'Selecione um fornecedor primeiro' : '')
          }
        />
      )}
    />
  )
}

export default function ProdutoForm({
  defaultValues,
  isSubmitting = false,
  onSubmit,
}: ProdutoFormProps) {
  const form = useForm({
    defaultValues,
    validators: {
      onChange: produtoSchema,
    },
    onSubmit: ({ value }) => onSubmit(value),
  })
  const { Field, Subscribe, handleSubmit } = form

  const { data: fornecedores, isLoading: carregandoFornecedores } = useFornecedoresQuery(true)

  return (
    <Card
      component="form"
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        void handleSubmit()
      }}
      noValidate
      variant="outlined"
    >
      <CardHeader title="Preencha os dados do produto" />
      <CardContent>
        <Stack spacing={4}>
          <Stack spacing={3}>
            <Typography variant="h6">Identificação</Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Field name="cd_sku">
                  {(field) => (
                    <FormTextField
                      field={field}
                      label="SKU"
                      required
                      fullWidth
                      autoComplete="off"
                    />
                  )}
                </Field>
              </Grid>
              <Grid size={{ xs: 12, sm: 8 }}>
                <Field name="nm_produto">
                  {(field) => (
                    <FormTextField
                      field={field}
                      label="Nome do produto"
                      required
                      fullWidth
                      autoComplete="off"
                    />
                  )}
                </Field>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name="id_fornecedor">
                  {(field) => {
                    const fornecedorSelecionado =
                      fornecedores?.items.find(
                        (fornecedor) => fornecedor.id_fornecedor === field.state.value,
                      ) ?? null
                    const { hasError, helperText } = erroDoField(field)
                    return (
                      <Autocomplete<FornecedorResponseDto>
                        options={fornecedores?.items ?? []}
                        value={fornecedorSelecionado}
                        loading={carregandoFornecedores}
                        getOptionLabel={(fornecedor) =>
                          fornecedor.nm_fantasia || fornecedor.nm_empresa
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.id_fornecedor === value.id_fornecedor
                        }
                        onChange={(_, novoValor) => {
                          field.handleChange(novoValor?.id_fornecedor ?? '')
                          form.setFieldValue('id_colecao', '')
                        }}
                        onBlur={field.handleBlur}
                        noOptionsText="Nenhum fornecedor encontrado"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Fornecedor"
                            required
                            error={hasError}
                            helperText={helperText}
                          />
                        )}
                      />
                    )
                  }}
                </Field>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Subscribe selector={(state) => state.values.id_fornecedor}>
                  {(idFornecedorSelecionado) => (
                    <Field name="id_colecao">
                      {(field) => (
                        <ColecaoAutocompleteField
                          field={field}
                          idFornecedorSelecionado={idFornecedorSelecionado}
                        />
                      )}
                    </Field>
                  )}
                </Subscribe>
              </Grid>
              <Grid size={12}>
                <Field name="tp_estacao">
                  {(field) => {
                    const { hasError, helperText } = erroDoField(field)
                    return (
                      <FormControl error={hasError} required>
                        <FormLabel sx={{ mb: 1 }}>Estação</FormLabel>
                        <ToggleButtonGroup
                          exclusive
                          color="primary"
                          value={field.state.value || null}
                          onChange={(_, novoValor: Estacao | null) => {
                            if (novoValor !== null) field.handleChange(novoValor)
                          }}
                          onBlur={field.handleBlur}
                        >
                          <ToggleButton value="Todas">
                            <AllInclusiveRoundedIcon fontSize="small" sx={{ mr: 1 }} />
                            Todas as estações
                          </ToggleButton>
                          <ToggleButton value="Verao">
                            <WbSunnyRoundedIcon fontSize="small" sx={{ mr: 1 }} />
                            Verão
                          </ToggleButton>
                          <ToggleButton value="Inverno">
                            <AcUnitRoundedIcon fontSize="small" sx={{ mr: 1 }} />
                            Inverno
                          </ToggleButton>
                        </ToggleButtonGroup>
                        {hasError && <FormHelperText>{helperText}</FormHelperText>}
                      </FormControl>
                    )
                  }}
                </Field>
              </Grid>
            </Grid>
          </Stack>

          <Divider />

          <Stack spacing={3}>
            <Typography variant="h6">Preços</Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name="vl_preco">
                  {(field) => (
                    <FormNumberField
                      field={field}
                      label="Preço de custo"
                      required
                      fullWidth
                      min={0}
                      format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                      locale="pt-BR"
                      startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                    />
                  )}
                </Field>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name="vl_venda">
                  {(field) => (
                    <FormNumberField
                      field={field}
                      label="Preço de venda"
                      required
                      fullWidth
                      min={0}
                      format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                      locale="pt-BR"
                      startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                    />
                  )}
                </Field>
              </Grid>
            </Grid>
          </Stack>

          <Divider />

          <Stack spacing={3}>
            <Typography variant="h6">Sobre o produto</Typography>
            <Field name="ds_produto">
              {(field) => (
                <FormTextField
                  field={field}
                  label="Descrição"
                  fullWidth
                  multiline
                  minRows={3}
                  autoComplete="off"
                />
              )}
            </Field>
          </Stack>

          <Divider />

          <Stack spacing={3}>
            <Typography variant="h6">Imagens</Typography>
            <Field name="imagens">
              {(field) => (
                <CampoImagensComAcoes value={field.state.value} onChange={field.handleChange} />
              )}
            </Field>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
          <Button component={RouterLink} to="/admin/produtos" variant="text">
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
                Criar produto
              </Button>
            )}
          </Subscribe>
        </Stack>
      </CardActions>
    </Card>
  )
}
