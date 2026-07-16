import { useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import FormLabel from '@mui/material/FormLabel'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

import type { FornecedorColecaoResumoDto } from '@/service/fornecedor/ResponseDTOs'

import { useCreateColecaoMutation } from '../hooks/useCreateColecaoMutation'
import ExcluirColecaoDialog from './ExcluirColecaoDialog'

type ColecoesGerenciadorProps = {
  fornecedorId: string
  colecoes: FornecedorColecaoResumoDto[]
}

/** Gerencia as coleções de um fornecedor já existente: adicionar e excluir chamam a API imediatamente. */
export default function ColecoesGerenciador({ fornecedorId, colecoes }: ColecoesGerenciadorProps) {
  const [nomeColecao, setNomeColecao] = useState('')
  const [colecaoParaExcluir, setColecaoParaExcluir] = useState<FornecedorColecaoResumoDto | null>(
    null,
  )

  const createColecaoMutation = useCreateColecaoMutation(fornecedorId)

  const handleAdicionar = () => {
    const nome = nomeColecao.trim()
    const jaExiste = colecoes.some(
      (colecao) => colecao.nm_colecao.toLowerCase() === nome.toLowerCase(),
    )
    if (!nome || jaExiste) {
      setNomeColecao('')
      return
    }

    createColecaoMutation.mutate(nome, { onSuccess: () => setNomeColecao('') })
  }

  return (
    <Stack spacing={2}>
      <FormLabel>Coleções</FormLabel>
      <Stack direction="row" spacing={1}>
        <TextField
          value={nomeColecao}
          onChange={(event) => setNomeColecao(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              handleAdicionar()
            }
          }}
          placeholder="Nome da coleção"
          size="small"
          fullWidth
        />
        <Button
          type="button"
          variant="outlined"
          onClick={handleAdicionar}
          disabled={!nomeColecao.trim()}
          loading={createColecaoMutation.isPending}
        >
          Adicionar
        </Button>
      </Stack>
      {colecoes.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {colecoes.map((colecao) => (
            <Chip
              key={colecao.id_colecao}
              label={colecao.nm_colecao}
              onDelete={() => setColecaoParaExcluir(colecao)}
            />
          ))}
        </Box>
      )}
      <ExcluirColecaoDialog
        fornecedorId={fornecedorId}
        colecao={colecaoParaExcluir}
        onClose={() => setColecaoParaExcluir(null)}
      />
    </Stack>
  )
}
