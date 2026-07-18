import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { TipoProdutoResponseDto } from '@/service/tipoProduto/ResponseDTOs'
import { criarTipoProduto } from '@/service/tipoProduto/TipoProdutoService'

import { tiposProdutoQueryOptions } from './useTiposProdutoQuery'

export function useCreateTipoProdutoMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: criarTipoProduto,
    onSuccess: (novoTipo) => {
      queryClient.setQueryData(
        tiposProdutoQueryOptions().queryKey,
        (tipos: TipoProdutoResponseDto[] | undefined) => [...(tipos ?? []), novoTipo],
      )
    },
  })
}
