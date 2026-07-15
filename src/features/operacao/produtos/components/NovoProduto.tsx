import LayoutPagina from '@/components/layout/LayoutPagina'

import { useCreateProdutoMutation } from '../hooks/useCreateProdutoMutation'
import ProdutoForm from './ProdutoForm'

export default function NovoProduto() {
  const createProdutoMutation = useCreateProdutoMutation()

  return (
    <LayoutPagina title="Novo produto" maxWidth="md">
      <ProdutoForm
        defaultValues={{
          cd_sku: '',
          nm_produto: '',
          ds_produto: '',
          vl_preco: null,
          vl_venda: null,
          tp_estacao: '',
          id_fornecedor: '',
          id_colecao: '',
          imagens: [],
        }}
        isSubmitting={createProdutoMutation.isPending}
        onSubmit={(value) => {
          if (value.tp_estacao === '' || value.vl_preco === null || value.vl_venda === null) return

          createProdutoMutation.mutate({
            cd_sku: value.cd_sku,
            nm_produto: value.nm_produto,
            ds_produto: value.ds_produto || undefined,
            vl_preco: value.vl_preco,
            vl_venda: value.vl_venda,
            tp_estacao: value.tp_estacao,
            id_colecao: value.id_colecao,
            imagens: value.imagens.length > 0 ? value.imagens : undefined,
            indice_imagem_principal: value.imagens.length > 0 ? 0 : undefined,
          })
        }}
      />
    </LayoutPagina>
  )
}
