import { useState } from 'react'

import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Radio from '@mui/material/Radio'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'

import type { TipoProdutoResponseDto } from '@/service/tipoProduto/ResponseDTOs'

import { useUpdateTipoProdutoMutation } from '../../hooks/useUpdateTipoProdutoMutation'
import ExcluirTipoProdutoDialog from './ExcluirTipoProdutoDialog'

type ItemTipoProdutoProps = {
  tipo: TipoProdutoResponseDto
  selecionado: boolean
  onSelecionar: () => void
  /** Chamado quando este tipo é excluído com sucesso, pra quem estiver com ele selecionado limpar o estado. */
  onExcluido: () => void
}

/** Uma linha da lista de tipos de produto: seleção por radio, e edição/exclusão inline. */
export default function ItemTipoProduto({
  tipo,
  selecionado,
  onSelecionar,
  onExcluido,
}: ItemTipoProdutoProps) {
  const [emEdicao, setEmEdicao] = useState(false)
  const [nomeEditado, setNomeEditado] = useState(tipo.nm_tipo)
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false)

  const updateTipoProdutoMutation = useUpdateTipoProdutoMutation(tipo.id_tipo_produto)

  const handleIniciarEdicao = () => {
    setNomeEditado(tipo.nm_tipo)
    setEmEdicao(true)
  }

  const handleCancelarEdicao = () => setEmEdicao(false)

  const handleSalvar = () => {
    const nome = nomeEditado.trim()
    if (!nome || nome === tipo.nm_tipo) {
      setEmEdicao(false)
      return
    }

    updateTipoProdutoMutation.mutate(
      { nm_tipo: nome },
      { onSuccess: () => setEmEdicao(false) },
    )
  }

  if (emEdicao) {
    return (
      <ListItem
        disablePadding
        secondaryAction={
          <Stack direction="row" spacing={0.5} sx={{ ml: 1 }}>
            <Tooltip title="Salvar">
              <IconButton
                size="small"
                onClick={handleSalvar}
                disabled={!nomeEditado.trim() || updateTipoProdutoMutation.isPending}
                aria-label={`Salvar ${tipo.nm_tipo}`}
              >
                <CheckRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancelar">
              <IconButton
                size="small"
                onClick={handleCancelarEdicao}
                disabled={updateTipoProdutoMutation.isPending}
                aria-label={`Cancelar edição de ${tipo.nm_tipo}`}
              >
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        }
      >
        <TextField
          value={nomeEditado}
          onChange={(event) => setNomeEditado(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              handleSalvar()
            }
            if (event.key === 'Escape') {
              event.preventDefault()
              handleCancelarEdicao()
            }
          }}
          fullWidth
          disabled={updateTipoProdutoMutation.isPending}
          slotProps={{ htmlInput: { maxLength: 100 } }}
        />
      </ListItem>
    )
  }

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Editar">
            <IconButton
              size="small"
              onClick={handleIniciarEdicao}
              aria-label={`Editar ${tipo.nm_tipo}`}
            >
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir">
            <IconButton
              size="small"
              onClick={() => setConfirmandoExclusao(true)}
              aria-label={`Excluir ${tipo.nm_tipo}`}
            >
              <DeleteRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      }
    >
      <ListItemButton onClick={onSelecionar} sx={{ pr: 10 }}>
        <ListItemIcon sx={{ minWidth: 36 }}>
          <Radio edge="start" checked={selecionado} tabIndex={-1} disableRipple size="small" />
        </ListItemIcon>
        <ListItemText primary={tipo.nm_tipo} />
      </ListItemButton>

      <ExcluirTipoProdutoDialog
        tipo={confirmandoExclusao ? tipo : null}
        onClose={() => setConfirmandoExclusao(false)}
        onExcluido={onExcluido}
      />
    </ListItem>
  )
}
