import { useState } from 'react'

import { getRouteApi } from '@tanstack/react-router'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import LayoutPagina from '@/components/layout/LayoutPagina'
import { useNotification } from '@/context/NotificacaoProvider'

import { useColecaoQuery } from '../hooks/useColecaoQuery'
import { useProdutoQuery } from '../hooks/useProdutoQuery'
import { useUpdateProdutoMutation } from '../hooks/useUpdateProdutoMutation'
import ImagensProdutoTab from './ImagensProdutoTab'
import ProdutoForm from './ProdutoForm'

const routeApi = getRouteApi('/admin/produtos/$id/editar')

export default function EditarProduto() {
  const { id } = routeApi.useParams()
  const { notifySuccess } = useNotification()
  const [aba, setAba] = useState(0)

  const { data: produto } = useProdutoQuery(id)
  const { data: colecao } = useColecaoQuery(produto?.colecao_id ?? '')
  const updateProdutoMutation = useUpdateProdutoMutation(id)

  if (!produto || !colecao) return null

  return (
    <LayoutPagina title="Editar produto" maxWidth="md">
      <Card variant="outlined">
        <Tabs
          value={aba}
          onChange={(_, novaAba: number) => setAba(novaAba)}
          sx={{ px: 2, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Dados do produto" />
          <Tab label="Imagens" />
        </Tabs>

        {aba === 0 && (
          <ProdutoForm
            mode="edit"
            defaultValues={{
              cd_ean: produto.cd_ean,
              nm_produto: produto.nm_produto,
              ds_produto: produto.ds_produto ?? '',
              vl_preco: produto.vl_preco,
              vl_venda: produto.vl_venda,
              tp_estacao: produto.tp_estacao,
              tipo_produto_id: produto.tipo_produto_id ?? '',
              id_fornecedor: colecao.id_fornecedor,
              colecao_id: produto.colecao_id,
              imagens: [],
            }}
            isSubmitting={updateProdutoMutation.isPending}
            onSubmit={(value) => {
              if (value.tp_estacao === '' || value.vl_preco === null || value.vl_venda === null) return

              updateProdutoMutation.mutate(
                {
                  cd_ean: value.cd_ean,
                  nm_produto: value.nm_produto,
                  ds_produto: value.ds_produto || undefined,
                  vl_preco: value.vl_preco,
                  vl_venda: value.vl_venda,
                  tp_estacao: value.tp_estacao,
                  tipo_produto_id: value.tipo_produto_id,
                  colecao_id: value.colecao_id,
                },
                {
                  onSuccess: () => notifySuccess('Produto atualizado com sucesso.'),
                },
              )
            }}
          />
        )}

        {aba === 1 && (
          <>
            <CardContent>
              <ImagensProdutoTab produtoId={id} imagens={produto.imagens} />
            </CardContent>
          </>
        )}
      </Card>
    </LayoutPagina>
  )
}
