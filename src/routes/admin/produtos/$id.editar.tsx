import { createFileRoute } from '@tanstack/react-router'

import EditarProduto from '@/features/operacao/produtos/components/EditarProduto'
import { colecaoQueryOptions } from '@/features/operacao/produtos/hooks/useColecaoQuery'
import { produtoQueryOptions } from '@/features/operacao/produtos/hooks/useProdutoQuery'

export const Route = createFileRoute('/admin/produtos/$id/editar')({
  loader: async ({ context: { queryClient }, params: { id } }) => {
    const produto = await queryClient.ensureQueryData(produtoQueryOptions(id))
    await queryClient.ensureQueryData(colecaoQueryOptions(produto.colecao_id))
  },
  component: EditarProduto,
})
