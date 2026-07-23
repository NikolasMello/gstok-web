import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { TipoProdutoUpdateDto } from '@/service/tipoProduto/RequestDTOs'
import type { TipoProdutoResponseDto } from '@/service/tipoProduto/ResponseDTOs'
import { atualizarTipoProduto } from '@/service/tipoProduto/TipoProdutoService'

import { tiposProdutoQueryOptions } from './useTiposProdutoQuery'

export function useUpdateTipoProdutoMutation(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: TipoProdutoUpdateDto) => atualizarTipoProduto(id, payload),
    onSuccess: (tipoAtualizado) => {
      queryClient.setQueryData(
        tiposProdutoQueryOptions().queryKey,
        (tipos: TipoProdutoResponseDto[] | undefined) =>
          tipos?.map((tipo) => (tipo.id_tipo_produto === id ? tipoAtualizado : tipo)),
      )
    },
  })
}
