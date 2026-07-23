import { useState } from 'react'

import type { AnyFieldApi } from '@tanstack/react-form'

import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

import type { TipoProdutoResponseDto } from '@/service/tipoProduto/ResponseDTOs'

import { useTiposProdutoQuery } from '../../hooks/useTiposProdutoQuery'
import SelecionarTipoProdutoDialog from './SelecionarTipoProdutoDialog'

type TipoProdutoAutocompleteFieldProps = {
  field: AnyFieldApi
}

function erroDoField(field: AnyFieldApi) {
  const hasError = Boolean(field.state.meta.isTouched) && !field.state.meta.isValid
  if (!hasError) return { hasError: false, helperText: '' }
  const errors = field.state.meta.errors as Array<{ message?: string } | undefined>
  return { hasError: true, helperText: errors.map((error) => error?.message).join(', ') }
}

/** Autocomplete de tipo de produto com atalho pra buscar, criar e selecionar num dialog dedicado. */
export default function TipoProdutoAutocompleteField({
  field,
}: TipoProdutoAutocompleteFieldProps) {
  const [dialogAberto, setDialogAberto] = useState(false)

  const { data: tipos, isFetching: carregandoTipos } = useTiposProdutoQuery()

  const { hasError, helperText } = erroDoField(field)
  const tipoSelecionado = tipos?.find((tipo) => tipo.id_tipo_produto === field.state.value) ?? null

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
        <Autocomplete<TipoProdutoResponseDto>
          fullWidth
          options={tipos ?? []}
          value={tipoSelecionado}
          loading={carregandoTipos}
          getOptionLabel={(tipo) => tipo.nm_tipo}
          isOptionEqualToValue={(option, value) => option.id_tipo_produto === value.id_tipo_produto}
          onChange={(_, novoValor) => field.handleChange(novoValor?.id_tipo_produto ?? '')}
          onBlur={field.handleBlur}
          noOptionsText="Nenhum tipo de produto encontrado"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tipo de produto"
              required
              error={hasError}
              helperText={helperText}
            />
          )}
        />
        <Button
          type="button"
          size="large"
          onClick={() => setDialogAberto(true)}
          aria-label="Gerenciar tipos de produto"
          sx={{ height: '56px' }}
          startIcon={<ManageSearchRoundedIcon />}
        >
          Gerenciar
        </Button>
      </Stack>

      <SelecionarTipoProdutoDialog
        open={dialogAberto}
        selecionadoId={field.state.value as string}
        onClose={() => setDialogAberto(false)}
        onSelecionar={(id) => field.handleChange(id)}
      />
    </>
  )
}
