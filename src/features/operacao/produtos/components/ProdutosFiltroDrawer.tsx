import { useState } from 'react'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import type { FornecedorResponseDto } from '@/service/fornecedor/ResponseDTOs'
import type { Estacao } from '@/service/shared/enums'

import { useFornecedoresQuery } from '../hooks/useFornecedoresQuery'

export type ProdutosFiltro = {
  nmProduto?: string
  nmTipo?: string
  cdEan?: string
  idFornecedor?: string
  tpEstacao?: Estacao
  flAtivo?: boolean
}

const FILTRO_VAZIO: ProdutosFiltro = {}

type ProdutosFiltroDrawerProps = {
  open: boolean
  filtro: ProdutosFiltro
  onClose: () => void
  onAplicar: (filtro: ProdutosFiltro) => void
  onLimpar: () => void
}

export default function ProdutosFiltroDrawer({
  open,
  filtro,
  onClose,
  onAplicar,
  onLimpar,
}: ProdutosFiltroDrawerProps) {
  const [rascunho, setRascunho] = useState<ProdutosFiltro>(filtro)
  const [openAnterior, setOpenAnterior] = useState(open)

  if (open !== openAnterior) {
    setOpenAnterior(open)
    if (open) setRascunho(filtro)
  }

  const { data: fornecedores, isLoading: carregandoFornecedores } = useFornecedoresQuery(open)
  const fornecedorSelecionado =
    fornecedores?.items.find((fornecedor) => fornecedor.id_fornecedor === rascunho.idFornecedor) ??
    null

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: 360 } } }}
    >
      <Stack sx={{ height: '100%' }}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', p: 3 }}>
          <Typography variant="h6">Filtros</Typography>
          <IconButton onClick={onClose} size="small" aria-label="Fechar filtros">
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>

        <Stack spacing={3} sx={{ flex: 1, px: 3, py: 2 }}>
          <TextField
            label="Produto"
            value={rascunho.nmProduto ?? ''}
            onChange={(e) =>
              setRascunho((prev) => ({ ...prev, nmProduto: e.target.value || undefined }))
            }
            size="small"
            fullWidth
          />
          <TextField
            label="Tipo"
            value={rascunho.nmTipo ?? ''}
            onChange={(e) =>
              setRascunho((prev) => ({ ...prev, nmTipo: e.target.value || undefined }))
            }
            size="small"
            fullWidth
          />
          <TextField
            label="EAN"
            value={rascunho.cdEan ?? ''}
            onChange={(e) =>
              setRascunho((prev) => ({ ...prev, cdEan: e.target.value || undefined }))
            }
            size="small"
            fullWidth
          />
          <Autocomplete<FornecedorResponseDto>
            options={fornecedores?.items ?? []}
            value={fornecedorSelecionado}
            loading={carregandoFornecedores}
            getOptionLabel={(fornecedor) => fornecedor.nm_fantasia || fornecedor.nm_empresa}
            isOptionEqualToValue={(option, value) => option.id_fornecedor === value.id_fornecedor}
            onChange={(_, novoValor) =>
              setRascunho((prev) => ({
                ...prev,
                idFornecedor: novoValor?.id_fornecedor ?? undefined,
              }))
            }
            size="small"
            noOptionsText="Nenhum fornecedor encontrado"
            renderInput={(params) => <TextField {...params} label="Fornecedor" />}
          />
          <TextField
            select
            label="Estação"
            value={rascunho.tpEstacao ?? ''}
            onChange={(e) =>
              setRascunho((prev) => ({
                ...prev,
                tpEstacao: (e.target.value || undefined) as Estacao | undefined,
              }))
            }
            size="small"
            fullWidth
          >
            <MenuItem value="">Qualquer estação</MenuItem>
            <MenuItem value="Inverno">Inverno</MenuItem>
            <MenuItem value="Verao">Verão</MenuItem>
            <MenuItem value="Todas">Todas as estações</MenuItem>
          </TextField>
          <TextField
            select
            label="Status"
            value={rascunho.flAtivo === undefined ? '' : String(rascunho.flAtivo)}
            onChange={(e) => {
              const valor = e.target.value
              setRascunho((prev) => ({
                ...prev,
                flAtivo: valor === '' ? undefined : valor === 'true',
              }))
            }}
            size="small"
            fullWidth
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="true">Ativo</MenuItem>
            <MenuItem value="false">Inativo</MenuItem>
          </TextField>
        </Stack>

        <Divider />

        <Stack direction="row" spacing={1} sx={{ px: 3, py: 2 }}>
          <Button
            fullWidth
            variant="text"
            onClick={() => {
              setRascunho(FILTRO_VAZIO)
              onLimpar()
            }}
          >
            Limpar
          </Button>
          <Button fullWidth variant="contained" onClick={() => onAplicar(rascunho)}>
            Aplicar
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  )
}
