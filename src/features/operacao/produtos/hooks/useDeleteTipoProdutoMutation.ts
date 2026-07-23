import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { TipoProdutoResponseDto } from '@/service/tipoProduto/ResponseDTOs'
import { excluirTipoProduto } from '@/service/tipoProduto/TipoProdutoService'

import { tiposProdutoQueryOptions } from './useTiposProdutoQuery'

export function useDeleteTipoProdutoMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => excluirTipoProduto(id),
    onSuccess: (_data, id) => {
      queryClient.setQueryData(
        tiposProdutoQueryOptions().queryKey,
        (tipos: TipoProdutoResponseDto[] | undefined) =>
          tipos?.filter((tipo) => tipo.id_tipo_produto !== id),
      )
    },
  })
}
