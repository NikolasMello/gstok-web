import { useState } from 'react'

import type { AnyFieldApi } from '@tanstack/react-form'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

import { useNotification } from '@/context/NotificacaoProvider'
import type { TipoProdutoResponseDto } from '@/service/tipoProduto/ResponseDTOs'

import { useCreateTipoProdutoMutation } from '../hooks/useCreateTipoProdutoMutation'
import { useTiposProdutoQuery } from '../hooks/useTiposProdutoQuery'

type TipoProdutoAutocompleteFieldProps = {
  field: AnyFieldApi
}

function erroDoField(field: AnyFieldApi) {
  const hasError = Boolean(field.state.meta.isTouched) && !field.state.meta.isValid
  if (!hasError) return { hasError: false, helperText: '' }
  const errors = field.state.meta.errors as Array<{ message?: string } | undefined>
  return { hasError: true, helperText: errors.map((error) => error?.message).join(', ') }
}

/** Autocomplete de tipo de produto com atalho pra criar um novo tipo sem sair do formulário de produto. */
export default function TipoProdutoAutocompleteField({
  field,
}: TipoProdutoAutocompleteFieldProps) {
  const [modalAberto, setModalAberto] = useState(false)
  const [nomeNovoTipo, setNomeNovoTipo] = useState('')

  const { data: tipos, isFetching: carregandoTipos } = useTiposProdutoQuery()
  const createTipoProdutoMutation = useCreateTipoProdutoMutation()
  const { notifyError } = useNotification()

  const { hasError, helperText } = erroDoField(field)
  const tipoSelecionado = tipos?.find((tipo) => tipo.id_tipo_produto === field.state.value) ?? null

  const handleFechar = () => {
    setModalAberto(false)
    setNomeNovoTipo('')
  }

  const handleCriar = () => {
    const nome = nomeNovoTipo.trim()
    if (!nome) return

    createTipoProdutoMutation.mutate(
      { nm_tipo: nome },
      {
        onSuccess: (novoTipo) => {
          field.handleChange(novoTipo.id_tipo_produto)
          handleFechar()
        },
        onError: () => {
          notifyError('Não foi possível criar o tipo de produto. Tente novamente.')
        },
      },
    )
  }

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
          size='large'
          onClick={() => setModalAberto(true)}
          aria-label="Adicionar tipo de produto"
          sx={{ height: '56px' }}
          startIcon={<AddRoundedIcon />}
        >
          Adicionar
        </Button>
      </Stack>

      <Dialog open={modalAberto} onClose={handleFechar} maxWidth="xs" fullWidth>
        <DialogTitle>Novo tipo de produto</DialogTitle>
        <DialogContent>
          <TextField
            value={nomeNovoTipo}
            onChange={(event) => setNomeNovoTipo(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                handleCriar()
              }
            }}
            label="Nome do tipo"
            fullWidth
            margin="dense"
            slotProps={{ htmlInput: { maxLength: 100 } }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleFechar}
            type="button"
            disabled={createTipoProdutoMutation.isPending}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleCriar}
            type="button"
            variant="contained"
            disabled={!nomeNovoTipo.trim()}
            loading={createTipoProdutoMutation.isPending}
          >
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
