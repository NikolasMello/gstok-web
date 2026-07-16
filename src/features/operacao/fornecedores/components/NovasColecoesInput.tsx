import { useState } from 'react'

import type { AnyFieldApi } from '@tanstack/react-form'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import FormLabel from '@mui/material/FormLabel'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

type NovasColecoesInputProps = {
  field: AnyFieldApi
}

/** Lista de nomes de coleção mantida localmente no form; enviada junto com a criação do fornecedor. */
export default function NovasColecoesInput({ field }: NovasColecoesInputProps) {
  const [nomeColecao, setNomeColecao] = useState('')
  const colecoes = (field.state.value as string[] | undefined) ?? []

  const handleAdicionar = () => {
    const nome = nomeColecao.trim()
    const jaExiste = colecoes.some((colecao) => colecao.toLowerCase() === nome.toLowerCase())
    if (!nome || jaExiste) {
      setNomeColecao('')
      return
    }

    field.handleChange([...colecoes, nome])
    setNomeColecao('')
  }

  const handleRemover = (index: number) => {
    field.handleChange(colecoes.filter((_, i) => i !== index))
  }

  return (
    <Stack spacing={2}>
      <FormLabel>Coleções</FormLabel>
      <TextField
        value={nomeColecao}
        onChange={(event) => setNomeColecao(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            handleAdicionar()
          }
        }}
        onBlur={field.handleBlur}
        placeholder="Nome da coleção"
        fullWidth
        slotProps={{
          input: {
            endAdornment: (
              <IconButton onClick={handleAdicionar} disabled={!nomeColecao.trim()}>
                <AddRoundedIcon />
              </IconButton>
            ),
          },
        }}
      />
      {/* <Button type="button" variant="outlined" onClick={handleAdicionar} disabled={!nomeColecao.trim()}>
          Adicionar
        </Button> */}
      {colecoes.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {colecoes.map((colecao, index) => (
            <Chip
              key={`${colecao}-${index}`}
              label={colecao}
              onDelete={() => handleRemover(index)}
            />
          ))}
        </Box>
      )}
    </Stack>
  )
}
