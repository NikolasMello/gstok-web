import { useMemo, useState } from 'react'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { CircularProgress, IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'

import { useNotification } from '@/context/NotificacaoProvider'

import { useCreateTipoProdutoMutation } from '../../hooks/useCreateTipoProdutoMutation'
import { useTiposProdutoQuery } from '../../hooks/useTiposProdutoQuery'
import ItemTipoProduto from './ItemTipoProduto'

const QUANTIDADE_SKELETON = 4

type SelecionarTipoProdutoDialogProps = {
  open: boolean
  /** Tipo atualmente selecionado no formulário de produto; semeia a seleção local ao abrir. */
  selecionadoId: string
  onClose: () => void
  onSelecionar: (id: string) => void
}

/** Busca, criação, edição, exclusão e seleção de tipo de produto num só lugar. */
export default function SelecionarTipoProdutoDialog({
  open,
  selecionadoId,
  onClose,
  onSelecionar,
}: SelecionarTipoProdutoDialogProps) {
  const [aba, setAba] = useState(0)
  const [novoNome, setNovoNome] = useState('')
  const [termoBusca, setTermoBusca] = useState('')
  const [selecaoAtual, setSelecaoAtual] = useState(selecionadoId)

  const { data: tipos, isFetching } = useTiposProdutoQuery()
  const createTipoProdutoMutation = useCreateTipoProdutoMutation()
  const { notifyWarning } = useNotification()

  const tiposFiltrados = useMemo(() => {
    const termo = termoBusca.trim().toLowerCase()
    if (!termo) return tipos
    return tipos?.filter((tipo) => tipo.nm_tipo.toLowerCase().includes(termo))
  }, [tipos, termoBusca])

  const handleAdicionar = () => {
    const nome = novoNome.trim()
    const jaExiste = tipos?.some((tipo) => tipo.nm_tipo.toLowerCase() === nome.toLowerCase())
    if (!nome || jaExiste) {
      notifyWarning(
        jaExiste ? `Já existe um tipo de produto chamado "${nome}".` : 'Informe um nome para o tipo.',
      )
      setNovoNome('')
      return
    }

    createTipoProdutoMutation.mutate(
      { nm_tipo: nome },
      {
        onSuccess: (novoTipo) => {
          setNovoNome('')
          setSelecaoAtual(novoTipo.id_tipo_produto)
        },
      },
    )
  }

  const handleConfirmar = () => {
    if (!selecaoAtual) return
    onSelecionar(selecaoAtual)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth scroll="paper">
      <DialogTitle>Tipos de produto</DialogTitle>

      <Stack sx={{ pt: 2, px: 3 }} spacing={3}>
        <ToggleButtonGroup
          value={aba}
          exclusive
          onChange={(_, novaAba: number | null) => {
            if (novaAba !== null) setAba(novaAba)
          }}
          size="small"
        >
          <ToggleButton value={0}>
            <SearchRoundedIcon fontSize="small" sx={{ mr: 1 }} />
            Filtrar
          </ToggleButton>
          <ToggleButton value={1}>
            <AddRoundedIcon fontSize="small" sx={{ mr: 1 }} />
            Adicionar
          </ToggleButton>
        </ToggleButtonGroup>

        {aba === 1 && (
          <TextField
            label="Adicionar tipo produto"
            value={novoNome}
            onChange={(event) => setNovoNome(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                handleAdicionar()
              }
            }}
            placeholder="Novo tipo"
            fullWidth
            slotProps={{
              htmlInput: { maxLength: 100 },
              input: {
                endAdornment: (
                  <IconButton onClick={handleAdicionar} disabled={!novoNome.trim()}>
                    {createTipoProdutoMutation.isPending ? (
                      <CircularProgress size="1.4rem" />
                    ) : (
                      <AddRoundedIcon />
                    )}
                  </IconButton>
                ),
              },
            }}
          />
        )}

        {aba === 0 && (
          <TextField
            label="Filtrar tipos cadastrados"
            value={termoBusca}
            onChange={(event) => setTermoBusca(event.target.value)}
            placeholder="Buscar tipo"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
        {aba === 1 && <Divider />}
      </Stack>

      <DialogContent>
        {tipos && tipos.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            Nenhum tipo de produto cadastrado.
          </Typography>
        )}

        {tiposFiltrados && tiposFiltrados.length > 0 && (
          <List sx={{ maxHeight: 320, overflowY: 'auto' }}>
            {tiposFiltrados.map((tipo) => (
              <ItemTipoProduto
                key={tipo.id_tipo_produto}
                tipo={tipo}
                selecionado={selecaoAtual === tipo.id_tipo_produto}
                onSelecionar={() => setSelecaoAtual(tipo.id_tipo_produto)}
                onExcluido={() => {
                  if (selecaoAtual === tipo.id_tipo_produto) setSelecaoAtual('')
                }}
              />
            ))}
          </List>
        )}

        {tipos && tipos.length > 0 && tiposFiltrados && tiposFiltrados.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            Nenhum tipo encontrado para &quot;{termoBusca}&quot;.
          </Typography>
        )}

        {isFetching && !tipos && (
          <List sx={{ maxHeight: 320, overflowY: 'auto' }}>
            {Array.from({ length: QUANTIDADE_SKELETON }).map((_, index) => (
              <ListItem key={index} disablePadding sx={{ py: 0.5, px: 2 }}>
                <Skeleton variant="circular" width={20} height={20} sx={{ mr: 2, flexShrink: 0 }} />
                <Skeleton variant="text" sx={{ flexGrow: 1 }} />
                <Stack direction="row" spacing={0.5} sx={{ ml: 2 }}>
                  <Skeleton variant="circular" width={28} height={28} />
                  <Skeleton variant="circular" width={28} height={28} />
                </Stack>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} type="button">
          Cancelar
        </Button>
        <Button
          onClick={handleConfirmar}
          variant="contained"
          disabled={!selecaoAtual}
          type="button"
        >
          Selecionar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
